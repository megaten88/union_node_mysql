const express = require('express');
const router = express.Router();
const database = require('../database');
router.get('/add', (req,res)=>{
    res.render('meatController/add.hbs')
});
router.post('/add', async (req,res)=>{
    let {name,type,price} = req.body;
    let newRegister = {
        name,
        type,
        price
    }
    await database.query('INSERT INTO meats set ?',[newRegister]);
    req.flash('SUCCESS','Meat product was saved successfully');
    res.redirect('/meat');
});

router.get('/',async (req,res)=>{
    let meats = await database.query('SELECT * FROM meats');
    res.render('meatController/list.hbs',{meats});

});

router.get('/delete/:id', async(req,res)=>{
    let {id} = req.params
    await database.query('DELETE FROM meats WHERE id = ?', [id]);
    req.flash('SUCCESS','Meat product with ID'+id+' was deleted successfully');
    res.redirect('/meat');
});

router.get('/edit/:id', async(req,res)=>{
    let {id} = req.params;
    let data = await database.query('SELECT * FROM meats WHERE id = ?',[id]);
    res.render('meatController/edit.hbs',{meat:data[0]});
});
router.post('/edit/:id', async(req,res)=>{
    let {id} = req.params;
    let {name,type,price} = req.body;
    let editRegister = {
        name,
        type,
        price
    }
    database.query('UPDATE meats set ? WHERE id = ?',[editRegister,id]);
    req.flash('SUCCESS','Meat product with ID'+id+' was edited successfully');
    res.redirect('/meat');
}); 
module.exports = router;