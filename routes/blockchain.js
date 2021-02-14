const express = require('express');
const passport = require('passport');
const controller = require('../controllers/blockchain');
const router = express.Router();

router.get('/keys', passport.authenticate('jwt', {session: false}), controller.keys);

module.exports = router;