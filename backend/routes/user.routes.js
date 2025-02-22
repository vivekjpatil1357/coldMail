const express = require('express')
const { registerUser, getUserInfo, addPersonalDetails, addEducationalDetails, addProfessionalDetails, loginUser, getUser, editInfo } = require('../controllers/user.controller')
const authenticateToken = require('../middlewares/user.middleware')

const router = express.Router()


router.post('/login', loginUser)
router.get('/get_user',authenticateToken,getUser)

router.post('/register', registerUser)
router.post('/add_personal_details',addPersonalDetails)
router.post('/add_educational_details',addEducationalDetails)
router.post('/add_professional_details', addProfessionalDetails)

router.post('/edit_info',authenticateToken,editInfo)
// router.get('/user_info', authenticateToken, getUserInfo)

module.exports = router