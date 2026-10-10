const express = require('express')
const router = express.Router()
const upload = require('../utils/multer')

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updateProfile,
    updatePassword
} = require('../controllers/auth')
const { isAuthenticatedUser } = require('../middleware/auth')

router.post('/register', upload.single('avatar'), registerUser)
router.post('/login', loginUser)
router.get('/logout', logout)
router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token', resetPassword)

router.get('/me', isAuthenticatedUser, getUserProfile)
router.put('/me/update', isAuthenticatedUser, upload.single('avatar'), updateProfile)
router.put('/password/update', isAuthenticatedUser, updatePassword)

module.exports = router