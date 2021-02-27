const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser'); // for expres to proper parse json data
const cors = require('cors');   // to process client with diff domain address
const morgan = require('morgan'); // logging
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const blockchain = require('./routes/blockchain');
const keys = require('./helper/keys');
const app = express();

mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('MongoDB is connected');
})
.catch(error => console.log(error));

app.use(passport.initialize());
require('./middleware/passport')(passport);

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/blockchain', blockchain);

module.exports = app;