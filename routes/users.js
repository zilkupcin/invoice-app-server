const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(e) {
        res.status(400).json(`Error : ${e}`);
    }
})

router.route('/add').get(async (req, res) => {
    try {
        const newUser = User({username: 'testUser'});

        await newUser.save();
        res.json('User added')
    } catch(e) {
        res.status(400).json(`Error : ${e}`);
    }
})

module.exports = router;