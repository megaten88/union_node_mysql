const express = require('express');
const router = express.Router();
const database = require('../database');
const helpers = require('../lib/helpers');
const jwt = require('jsonwebtoken');
require('dotenv').config()


router.get('/login',async (req,res)=>{
    res.render('auth/login.hbs');
})
router.post('/login', async(req,res,done)=>{
    let {username,user_password} = req.body;
    if(username!=null&&user_password!=null){
        let user = await database.query("SELECT * FROM users WHERE username = ? " , [username]);
        if(!user || user.length<1){
            req.flash('ERROR','No user found');
            res.redirect('/login');
        }else{
            let savedPassword = user[0].user_password;
            console.log(user_password+", hash: " + savedPassword);
            let validatePassword = await helpers.comparePassword(user_password,savedPassword);
            if(validatePassword){
                let payload = {sub: user.id, role:user.role}
                let token = jwt.sign(payload, process.env.TOKENIZER, {expiresIn:process.env.JWT_LIFETIME});
                res.json({
                    mensaje: 'Authenticated',
                    token: token
                });
                done(null,user);
            }else{
                req.flash('ERROR','Incorrect Password');
                res.redirect('/login');
            }
        }
        

    }
    
});
module.exports = router;