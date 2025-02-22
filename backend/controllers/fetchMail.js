const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();
const { UserModel, MailModel } = require('../models/user.schema');

const fetchMail = async (req, res) => {
    try {
        const { to, tone, description, designation } = req.body;
        // console.log(to, tone, description);
        const { _id } = req.user; // Corrected user assignment
        const user = await UserModel.findById(_id)

        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

        const prompt = `
        Generate a personalized cold email using the details below. Keep it engaging, concise, and tailored to the recipient.

        **User Details:**
        Full Name: ${user.fullName}, Email: ${user.email}, Phone: ${user.phone}, 
        Location: ${user.location}, College: ${user.college}, Degree: ${user.degree}, 
        Graduation Year: ${user.graduationYear}, Skills: ${user.skills}, 
        LinkedIn: ${user.linkedin}, Portfolio: ${user.portfolio}.

        **Email Context:**
        Recipient: ${to} (${designation}), 
        Tone: ${tone}, 
        Purpose: ${description}.

        **Email Structure:**
        - **Subject:** Compelling & relevant.
        - **Opening:** Personalized greeting.
        - **Body:** Brief intro, purpose, key value points.
        - **Closing:** Strong CTA, contact details.

        Make it human-like, engaging, and optimized for a high response rate. 
        **Return the response in plain text. Do not include placeholders in the final email.**
        `;

        const result = await model.generateContent([prompt]);
        const emailText = result.response.text(); // Extracting proper response
        // console.log('this is subject',);
        const mail = { recipiant: to, subject: emailText.split('\n')[0].split(':')[1], body: emailText.split('\n').slice(1).join('\n'), user: _id }
        const newMail = new MailModel(mail)
        await newMail.save()
        res.status(200).json({ response: emailText });
    } catch (error) {
        console.error('Error in fetching email from Google AI:', error);
        res.status(500).json({ message: 'Error generating email', error });
    }
};

const getMails = async (req, res) => {
    const { _id } = req.user
    try {
        const mails = await MailModel.find({ user: _id })
        if (!mails)
            return res.json({ success: false, message: 'No mails found' })
        return res.status(200).json({ success: true, message: 'successfully fetched', mails:mails.reverse() })
    } catch (error) {
        return res.json({ success: false, error })
    }
}
module.exports = { fetchMail, getMails };
