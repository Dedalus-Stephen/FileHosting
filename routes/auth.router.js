const { Router } = require('express');
const bc = require('bcryptjs');
const config = require('config')
const tokenizer = require('jsonwebtoken');
const User = require('../models/User');
const { checkPassword, checkEmail } = require('../util/logindata/logdata');

const router = Router();

router.post('/register',
    async (req, res) => {
        try {
            let { email, password } = req.body;

            if (!checkPassword(password)) return res.status(400).json({ message: "Password should be at least 6 characters long" });
            if (!checkEmail(email)) return res.status(400).json({ message: "Are you sure you are typing your email correct?" });

            const doesExist = await User.findOne({ email });
            let token = null;
            if (doesExist){
                if(!bc.compare(password, doesExist.password)) return res.status(400).json({message: "Incorrect password"});
                    token = tokenizer.sign(
                    {id: doesExist.id},
                    config.get('jwtKey') //, expires
                )
                res.status(200).json({token, id: doesExist.id, message: "Welcome back!" });
            }

            password = await bc.hash(password, 10);

            const {id} = await new User({
                email,
                password
            }).save();

            token = tokenizer.sign(
                {id},
                config.get('jwtKey') //, expires
            );

            res.status(200).json({id, token, message: "Welcome back!" });
        } catch (e) {
            console.log(e.message, "e.message");
            res.status(500).json({ message: "Couldn't register new user. There is probably a problem with mongo1" });
        }
    })

    module.exports = router;