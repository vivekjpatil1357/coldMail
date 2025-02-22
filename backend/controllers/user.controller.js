const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {UserModel} = require('../models/user.schema');

// Function to generate JWT token with all user details
const generateToken = async (user) => {
    // console.log('i go t this ', user);
    return jwt.sign(
        { ...user }, // Include full user data
        process.env.PRIVATE_SECRET,
        { expiresIn: "24h" }
    );
};

// Get user details from token
const getUser = async (req, res) => {
    const { _id } = req.user
    try {
        const user = await UserModel.findById(_id)
        if (!user) {
            return res.status(404).json({success:true,message:'not found user'})
        }
        return res.status(200).json({ success:true,user})
    } catch (error) {
        return res.status(405).json({success:false,error})
    }
    return res.json({ success: true, user })
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
// console.log('logni is',email,password);
    try {
        const user = await UserModel.findOne({ email });
        if (!user)
            return res.status(404).json({ success: false, message: 'Email not found!' });
        // console.log('i send this ', user);
        if (password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid)
                return res.status(401).json({ success: false, message: 'Invalid password' });
        }
        const token = await generateToken(user.toObject());
        res.clearCookie('token')
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            secure: false,
        })
        // console.log(token);
        return res.json({ success: true, message: 'Login successful', token });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Register user
const registerUser = async (req, res) => {
    const { email, displayName, creationTime, password } = req.body;

    try {
        let user = { fullName: displayName, email, creationTime };

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        const newUser = new UserModel(user);
        await newUser.save();

        return res.json({ success: true, message: 'User registered' });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update personal details
const addPersonalDetails = async (req, res) => {
    const { fullName, phone, age, location, email } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { $set: { fullName, phone, age, location } },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        return res.json({ success: true, message: 'Personal details updated', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update educational details
const addEducationalDetails = async (req, res) => {
    const { college, degree, graduationYear, email } = req.body;

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { $set: { college, degree, graduationYear } },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        return res.json({ success: true, message: 'Educational details updated', user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

// Update professional details
const addProfessionalDetails = async (req, res) => {
    const { email, skills, linkedin, portfolio } = req.body;

    try {
        const updateData = {};
        if (skills) updateData.skills = skills;
        if (linkedin) updateData.linkedin = linkedin;
        if (portfolio) updateData.portfolio = portfolio;

        const updatedUser = await UserModel.findOneAndUpdate(
            { email },
            { $set: updateData },
            { new: true }
        );

        if (!updatedUser) return res.status(404).json({ success: false, message: "User not found" });

        return res.json({ success: true, message: "Professional details updated", user: updatedUser });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

const editInfo = async (req, res) => {
    const { _id} = req.user
    const user=req.body
    // console.log(user);
    try {
        const editUser = await UserModel.findByIdAndUpdate(_id,{...user},{new:true})
        if (!editUser) {
            return res.status(405).json({success:false,message:'user not found'})
        }
        // console.log(editUser);
        return res.status(200).json({success:true})
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:false,error})
    }
}

module.exports = { registerUser, addPersonalDetails, getUser, addEducationalDetails,editInfo, loginUser, addProfessionalDetails };
