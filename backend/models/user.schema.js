const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to UserModel
  recipiant:{type:String},
  subject: { type: String },
  body: { type: String },
  time: { type: Date, default: Date.now }
});
const userSchema = new mongoose.Schema({
  fullName: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, default: null },
  phone: { type: String, default: null },

  age: { type: Number, default: null },
  location: { type: String, default: null },

  college: { type: String, default: null },
  degree: { type: String, default: null },
  graduationYear: { type: Number, default: null },

  skills: { type: [String], default: [] },
  linkedin: { type: String, default: null },
  portfolio: { type: String, default: null },

  createdAt: { type: Date, default: Date.now }
});


const UserModel = mongoose.model('User', userSchema)
const MailModel=mongoose.model('mail',mailSchema)
module.exports = {UserModel,MailModel};
