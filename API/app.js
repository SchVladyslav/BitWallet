const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // for expres to proper parse json data
const cors = require('cors');   // to process client with diff domain address
const morgan = require('morgan'); // logging
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.MONGO_URI)
.then(() => {
    console.log('MongoDB is connected');
})
.catch(error => console.log(error));

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;