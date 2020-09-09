const {Router} = require('express')
const bcrypt = require('bcryptjs')
const user = require('../models/user')
const {check, validationResult} = require('express-validator')
const router = Router()

// api/auth/register
router.post(
    '/register', 
    [
        check('email', 'The wrong email address').isEmail,
        check('password', 'The wrong password. At least 6 characters').isLength({min:6})
    ],
    async (req, res) => {
    try {
        const {email, password} = req.body
        const candidate = await user.findOne({email})
        if (candidate) {
            return res.status(400).json({message: "Such user already exists"})
        }

        // asynchronously hash the password
        const hashedPass = await bcrypt.hash(password, 12)

        const user = new User({email, password: hashedPass})

        await user.save()

        res.status(201).json({message: "The user has successfully registered"})

    } catch (e) {
        res.status(500).json({message: 'Something went wrong in the response'})
    }
})

// api/auth/login
router.post('/login', async (req, res) => {
    
})

module.exports = router

