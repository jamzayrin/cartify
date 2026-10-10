const jwt = require('jsonwebtoken')
const User = require('../models/user')

// protects a route: requires "Authorization: Bearer <token>"
exports.isAuthenticatedUser = async (req, res, next) => {
    try {
        const header = req.headers.authorization || ''
        const token = header.startsWith('Bearer ') ? header.split(' ')[1] : null

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

// usage: authorizeRoles('admin')
exports.authorizeRoles = (...roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({
            success: false,
            message: `Role "${req.user.role}" is not allowed to access this resource`
        })
    }
    next()
}