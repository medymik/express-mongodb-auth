const router = require('express').Router();
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @Route /api/users
 * @method POST
 * @desc User Registration
 */
router.post('/', [
    // You can add a custom message
    // e.g. check('name', 'Please enter a valid name')
    check('name').trim().not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({ min: 6 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Bad Request
        return res.status(400).json(errors);
    }
    const { name, email, password } = req.body;

    try {
        // check if the email exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                errors: [
                    {
                        msg: 'The email already exists'
                    }
                ]
            });
        }

        // Generate a password hash
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Save the user
        user = new User();
        user.name = name;
        user.email = email;
        user.password = hash;
        await user.save();

        // Generate JWT token with sign for 1h
        const payload = {
            user: {
                name: name,
                email: email
            }
        };
        const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
        return res.status(201).json({
            token: token
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;