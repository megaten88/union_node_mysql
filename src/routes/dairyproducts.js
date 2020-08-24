const express = require('express');
const router = express.Router();
const database = require('../database');

router.get('/add', (req,res)=>{
    res.render('dairyController/add.hbs')
});
router.post('/add', async (req,res)=>{
    let {name,price} = req.body;
    let newRegister = {
        name,
        price
    }
    await database.query('INSERT INTO dairy_products set ?',[newRegister]);
    req.flash('SUCCESS','Dairy product was saved successfully');
    res.redirect('/dairy');
});

router.get('/',async (req,res)=>{
    let dairyProducts = await database.query('SELECT * FROM dairy_products');
    res.render('dairyController/list.hbs',{dairyProducts});

});

router.get('/delete/:id', async(req,res)=>{
    let {id} = req.params
    await database.query('DELETE FROM dairy_products WHERE id = ?', [id]);
    req.flash('SUCCESS','Dairy product with ID '+id+' was deleted successfully');
    res.redirect('/dairy');
});

router.get('/edit/:id', async(req,res)=>{
    let {id} = req.params;
    let data = await database.query('SELECT * FROM dairy_products WHERE id = ?',[id]);
    res.render('dairyController/edit.hbs',{dairy:data[0]});
});
router.post('/edit/:id', async(req,res)=>{
    let {id} = req.params;
    let {name,type,price} = req.body;
    let editRegister = {
        name,
        price
    }
    database.query('UPDATE dairy_products set ? WHERE id = ?',[editRegister,id]);
    req.flash('SUCCESS','Dairy product with ID '+id+' was edited successfully');
    res.redirect('/dairy');
}); 
module.exports = router;