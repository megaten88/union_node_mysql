const express = require('express');
const router = express.Router();
const database = require('../database');
router.get('/add', (req,res)=>{
    res.render('meatController/add.hbs')
});
module.exports = router;