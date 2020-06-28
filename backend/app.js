const express = require('express');
const cors = require('cors');
require('./db/db-connection');
const smsRouter = require('./routers/sms.route');

// create express app
const app = express();

app.use(cors());
// middleware to parse incoming request with json payload
app.use(express.json({limit: '10mb'}));
// use smsRouter to handle routes
app.use(smsRouter);

module.exports = app;