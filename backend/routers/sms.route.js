const express = require('express');
const Sms = require('../models/sms.model');
const defaultSmsData = require('../db/default_data');
const router = new express.Router();

// route to save default data to db
router.post('/sms_all', async (req, res) => {
    try {
        let sms = await Sms.deleteMany();
        
        sms = await Sms.insertMany(defaultSmsData);
        res.status(201).send(sms);
    } catch (err) {
        res.status(400).send(err);
    }
});

// route to save data to db
router.post('/sms', async (req, res) => {
    const sms = new Sms(req.body);
    
    try {
        // save the data to db
        await sms.save();
        res.status(201).json({
            message: "Data pushed Successfully!",
            data: sms
        });
    } catch (err) {
        res.status(400).json({
            message: "error"
        });
    }
});

// route to read data from db
router.get('/sms', async (req, res) => {
    try {
        // get all the data
        const sms = await Sms.find();
        res.json({
            message: "Data fetched Successfully!",
            data: sms
        });
    } catch(err) {
        res.status(500).json({
            message: "error"
        });
    }
});

// route to get data using id
router.get('/sms/:id', async (req, res) => {
    const id = req.params.id;
    
    try {        
        // get single data
        const sms = await Sms.findOne({id});
        if (!sms) {
            return res.status(404).send();
        }
        res.send(sms);
    } catch (err) {
        res.status(500).send();
    }
});

// route to update data
router.patch('/sms/:id', async (req, res) => {
    const id = req.params.id;
    
    try {
       const sms = await Sms.findOneAndUpdate({id}, req.body, { new: true, runValidators: true });

       if (!sms) {
         return res.status(404).send();
       }
       res.send(sms);
    } catch (err) {
        return res.status(400).send();
    }
});

// route to delete the data
router.delete('/sms/:id', async (req, res) => {
    const id = req.params.id;
    
    try {        
        // delete single data
        const sms = await Sms.findOneAndDelete({id});
        if (!sms) {
            return res.status(404).send();
        }
        res.send(sms);
    } catch (err) {
        res.status(500).send();
    }
});

module.exports = router;