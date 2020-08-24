const express = require('express');
const router = express.Router();
const database = require('../database');
const moment = require('moment');

router.get('/add', (req,res)=>{
    res.render('maintenanceController/add.hbs')
});
router.post('/add', async (req,res)=>{
    let {arranged_for,dated,indoors} = req.body;
    let newRegister = {
        arranged_for,
        dated,
        indoors
    }
    console.log(newRegister.dated);
    console.log(typeof newRegister.indoors);
    console.log(typeof newRegister.dated);
    await database.query('INSERT INTO maintenance set ?',[newRegister]);
    req.flash('SUCCESS','Maintenance appointment was saved successfully');
    res.redirect('/maintenance');
});

router.get('/',async (req,res)=>{
    let maintenances = await database.query('SELECT * FROM maintenance');
    res.render('maintenanceController/list.hbs',{maintenances});

});

router.get('/delete/:id', async(req,res)=>{
    let {id} = req.params
    await database.query('DELETE FROM maintenance WHERE id = ?', [id]);
    req.flash('SUCCESS','Maintenance appointment with ID '+id+' was deleted successfully');
    res.redirect('/maintenance');
});

router.get('/edit/:id', async(req,res)=>{
    let {id} = req.params;
    let data = await database.query('SELECT * FROM maintenance WHERE id = ?',[id]);
    let appointment = data[0];
    appointment.dated =  moment(appointment.dated).format('YYYY-MM-DDTHH:MM');
    res.render('maintenanceController/edit.hbs',{maintenance:appointment});
});
router.post('/edit/:id', async(req,res)=>{
    let {id} = req.params;
    let {arranged_for,dated,indoors} = req.body;
    let editRegister = {
        arranged_for,
        dated,
        indoors
    }
    database.query('UPDATE maintenance set ? WHERE id = ?',[editRegister,id]);
    req.flash('SUCCESS','Maintenance appointment with ID '+id+' was edited successfully');
    res.redirect('/maintenance');
}); 
module.exports = router;