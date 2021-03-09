const express = require('express');
const passport = require('passport');
const controller = require('../controllers/blockchain');
const router = express.Router();

router.get('/keys', passport.authenticate('jwt', {session: false}), controller.keys);
router.get('/blockchain', passport.authenticate('jwt', {session: false}), controller.blockchain);
router.post('/transaction', passport.authenticate('jwt', {session: false}), controller.transaction);
router.get('/transactions/pending', passport.authenticate('jwt', {session: false}), controller.pendingTransactions);
router.get('/transactions/mine', passport.authenticate('jwt', {session: false}), controller.mine);
router.get('/balance', passport.authenticate('jwt', {session: false}), controller.balance);

module.exports = router;