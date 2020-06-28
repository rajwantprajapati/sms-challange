const mongoose = require('mongoose');

// connection to sms_data database
let url = 'mongodb://127.0.0.1:27017/sms_data';

mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).then(
    () => console.log("connected to db.."),
    (err) => console.log("error in connecting to db..", err.reason)
);

mongoose.connection.on('error', err => {
    console.log("error occurred");
});