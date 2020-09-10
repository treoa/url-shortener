const {Router} = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const user = require('../models/user')
const config = require('config')
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

        const errors = validationResult(req)

        if (!errors.isEmpty) {
            return res.status(400)
            .json({errors: errors.array(),
                message: "Incorrect email or password"
            })
        }

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
router.post('/login', 
    [
        check('email', 'Entered incorrect email').normalizeEmail().isEmail().isEmail(),
        check('password', 'Incorrect password entered').exists()
    ],
    async (req, res) => {
        try {

            const errors = validationResult(req)
    
            if (!errors.isEmpty) {
                return res.status(400)
                .json({errors: errors.array(),
                    message: "Incorrect email or password"
                })
            }

            const {email, password} = req.body

            const user = await user.findOne({email})

            if (!user) {
                return res.status(400)
                    .json({message: 'The user not found'})
            }

            // HOW BCRYPT FINDS UNCRYPTED PASS AMONGST CRYPTED ONES?
            const temp_pass = await bcrypt.compare(password, user.password)

            if (!temp_pass) {
                return res.status(400)
                    .json({message: 'The user password is incorrect'})
            }

            const token = jwt.sign(
                { userID: user.id },
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )

            res.json({token, userID: user.id})
    
        } catch (e) {
            res.status(500).json({message: 'Something went wrong in the response'})
        }
})

module.exports = router

