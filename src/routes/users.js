const express = require('express');
const router = express.Router();
const helpers = require('../lib/helpers');
const database = require('../database');
const passport = require('passport');
router.get('/createUser',(req,res)=>{
    res.render('auth/createUser');
});
router.post('/createUser',passport.authenticate('login', { session: false }) ,async (req,res)=>{
    let {username,user_password,firstname,lastname,role} = req.body;
    let newRegister = {
        username,
        user_password,
        firstname,
        lastname,
        role
    }
    newRegister.user_password = await helpers.encryptPassword(user_password);
    await database.query('INSERT INTO users set ?',[newRegister]);
    req.flash('SUCCESS','User was saved successfully');
    res.redirect('/users');
});

router.get('/',async (req,res)=>{
    let users = await database.query('SELECT * FROM users');
    res.render('auth/list.hbs',{users});

});

module.exports = router;