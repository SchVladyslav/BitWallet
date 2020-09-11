const express = require('express');
const bodyParser = require('body-parser'); // for expres to proper parse json data
const cors = require('cors');   // to process client with diff domain address
const morgan = require('morgan'); // logging
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);

module.exports = app;