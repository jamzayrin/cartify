const jwt = require('jsonwebtoken')
const User = require('../models/user')

// protects a route: requires the "token" cookie set at login
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const token = req.cookies.token

        if (!token) {
            return res.status(401).json({ success: false, message: 'Please log in first' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.id)

        if (!user) {
            return res.status(401).json({ success: false, message: 'This account no longer exists' })
        }

        req.user = user
        next()
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' })
    }
}