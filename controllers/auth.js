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
})
  
  


module.exports = router;