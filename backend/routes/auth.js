require('../dataBase');
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const express = require('express');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const getUserDetails = require('../middleware/getuserdetails')

let jwt_secret = "vikasishere";

// const fs = require('fs')
// const path = require('path')
// const dirpath = path.join(__dirname,'dataBase.js')
// const f = `${dirpath}`

const router = express.Router();


router.post('/createUser', [
    body('name', 'enter valid name').isLength({ min: 5 }),
    body('email', 'enter valid email').isEmail(),
    body('password', 'atleast 5 character allowed').isLength({ min: 4 }),

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    // const user = User(req.body);
    // const data = user.save();
    //  console.log(data)
    // res.send(req.body)
    try {
        const salt = await bycrypt.genSalt(10);
        const secPass = await bycrypt.hash(req.body.password, salt);

        let user = await User.create({
            name: await req.body.name,
            email: req.body.email,
            password: secPass
        });
        let data = { user: { id: user.id } }
        let jwtData = jwt.sign(data, jwt_secret)

        console.log(jwtData)
        res.json(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

// this router is made for login User 
router.post('/loginUser', [
    body('email', 'enter valid email').isEmail(),
    body('password', 'password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (!user) {
            res.json({ err: "invalid email" })
        }

        let compareUser = await bycrypt.compare(password, user.password);
        if (!compareUser) {
            res.json({ err: "invalid password" })
        }

        let data = { user: { id: user.id } }
        let jwtData = jwt.sign(data, jwt_secret)

        console.log(jwtData)
        res.json(user);

    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})


// this router is made for Get User Details
router.post('/fetchUserDetails',getUserDetails, async (req, res) => {
    // const token = req.header('auth-token')
    // if (!token) {
    //     res.status(401).send({ error: "enter valid toke" })
    // }
    // let data = jwt.verify(token, jwt_secret)
    // req.user = data.user;
   
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send(error.message)
    }
})

module.exports = router;