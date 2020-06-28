const mongoose = require('mongoose');

// sms schema to create model
const smsSchema = new mongoose.Schema({
    id:         { type: Number, required: true, unique: true },
    city:       { type: String, required: true },
    start_date: { type: Date, required: true },
    end_date:   { type: Date, required: true },
    price:      { type: Number, required: true },
    status:     { type: String, required: true },
    color:      { type: String, required: true }
});

const Sms = mongoose.model('Sms', smsSchema);

module.exports = Sms;