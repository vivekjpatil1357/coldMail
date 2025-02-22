const jwt = require('jsonwebtoken')
require('dotenv').config()
const authenticateToken = (req, res, next) => {
    // console.log("startedmiddleware");

    // console.log(req.cookies);
    const token = req.cookies.token

    // console.log(token);
    if (!token) return res.status(401).json({ response: 'Access Denied' })
    try {
        const userInfo = jwt.verify(token, process.env.PRIVATE_SECRET)
        req.user = userInfo
        // console.log('parsed data form jwt',userInfo);
        console.log("verified");
        next()
    } catch (error) {
        res.status(403).json({ message: "Invalid Token" });
    }
}
module.exports = authenticateToken