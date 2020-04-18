const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    //checking if the user is in database
    const emailExist = await User.findOne({ email: req.body.email });
    const nameDuplicate = await User.findOne({ name: req.body.name });
    if (emailExist || nameDuplicate) return res.json({ Status: 'User already exist with that name and password' });

    //hasing the password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const saveduser = await user.save();
        res.send(saveduser);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {

    const { error } = loginValidation(req.body);
    if (error) return res.json({ Status: error.details[0].message });

    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) return res.json({ Status: 'Wrong email' });

    const validPassword = await bcryptjs.compare(req.body.password, userExist.password);
    if (!validPassword) return res.json({ Status: 'Wrong Password' });

    //Create and assign Token
    const token = jwt.sign({_id: userExist._id}, process.env.TOKEN);
    res.json({AuthToken: token, userExist});

    //res.send('Logged in')
});

// const path = require('path');
// const express = require('express');
// const authController = require('../controllers/auth');
// const router = express.Router();

// router.post('/register', authController.postRegister);


module.exports = router;
