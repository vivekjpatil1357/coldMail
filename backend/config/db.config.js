
const mongoose = require('mongoose');
require('dotenv').config()
const uri = `mongodb+srv://vivekjpatil1357:${process.env.DB_PASS}@userinfo.uxh0b.mongodb.net/?retryWrites=true&w=majority&appName=userInfo`;


async function connectDb() {
  try {
    await mongoose.connect(uri);

    console.log("You successfully connected to MongoDB!");
  } finally {
    
  }
}
module.exports=connectDb

