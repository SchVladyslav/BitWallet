const express = require('express');
const controller = require('../controllers/coinMarketCup');
const router = express.Router();

router.get('/coin_cup', controller.coin_cup);
router.get('/coin_history_btc', controller.coin_history_btc);
router.get('/coin_history_eth', controller.coin_history_eth);
router.get('/coin_history_xrp', controller.coin_history_xrp);

module.exports = router;
