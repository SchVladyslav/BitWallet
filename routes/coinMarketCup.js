const express = require('express');
const passport = require('passport');
const controller = require('../controllers/coinMarketCup');
const router = express.Router();

router.get('/coin_cup', controller.coin_cup);
router.get('/coin_history', controller.coin_history);

module.exports = router;
