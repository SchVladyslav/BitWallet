const axios = require('axios');
const keys = require('../helper/keys');
const statuses = require('../helper/statuses');
const errorHandler = require('../utils/errorHandler');

module.exports.coin_cup = async function (req, res) {
	axios.get(`${keys.COIN_CUP_URI}?symbol=BTC,ETH,XRP`, {
		headers: {
			'X-CMC_PRO_API_KEY': keys.COIN_CUP_API_KEY
		}
	})
		.then(response => {
			try {
				res.status(statuses.createdStatus).json(response.data);
			} catch (error) {
				errorHandler(res, error);
			}
		})
		.catch(error => {
			console.log(error);
		});

}