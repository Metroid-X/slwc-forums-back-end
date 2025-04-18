const { Router } = require("express");
const router = Router();
const { setRoute } = require('../homebrew-funcs.js');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const saltRounds = 12;


router.get('/', async (req,res) => {
    const backendInterface = `
        <style> ul {list-style: '  -  ';} li { margin: 8px 0; } </style>
        <h2>Everything is operational</h2>
        <ul>
            ${setRoute('', 2)}
            ${setRoute('auth/sign-in', 2)}
            ${setRoute('auth/sign-up', 2)}
        </ul>
    `
    
    res.send(backendInterface);
});


router.post('/sign-up', async (req, res) => {
    try {
        const userInDatabase = await User.findOne({ username: req.body.username });
        
        if (userInDatabase) {
            return res.status(409).json({err: 'Username already taken.'});
        }
        
        const user = await User.create({
            username: req.body.username,
            hashedPassword: bcrypt.hashSync(req.body.password, saltRounds)
        });
    
        const payload = { username: user.username, _id: user._id };
    
        const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    
        res.status(201).json({ token });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});
  
router.post('/sign-in', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(401).json({ err: 'Invalid credentials.' });
        }
    
        const isPasswordCorrect = bcrypt.compareSync(
            req.body.password, user.hashedPassword
        );
        if (!isPasswordCorrect) {
            return res.status(401).json({ err: 'Invalid credentials.' });
        }
    
        const payload = { username: user.username, _id: user._id };
    
        const token = jwt.sign({ payload }, process.env.JWT_SECRET);
    
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

module.exports = router;