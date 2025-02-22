const express = require('express')
const {fetchMail, getMails} = require('../controllers/fetchMail')
const authenticateToken = require('../middlewares/user.middleware')

const router = express.Router()
router.post('/fetchMail', authenticateToken, fetchMail)
router.get('/get_mails',authenticateToken,getMails)

module.exports =router