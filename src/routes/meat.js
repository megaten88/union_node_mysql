const express = require('express');
const router = express.Router();
const database = require('../database');
router.get('/add', (req,res)=>{
    res.render('meatController/add.hbs')
});
router.post('/add', async (req,res)=>{
    const {name,type,price} = req.body;
    let newRegister = {
        name,
        type,
        price
    }
    await database.query('INSERT INTO meats set ?',[newRegister]);
    res.send('received');
});

router.get('/',async (req,res)=>{
    let meats = await database.query('SELECT * FROM meats');
    res.render('meatController/list.hbs',{meats});

});
module.exports = router;