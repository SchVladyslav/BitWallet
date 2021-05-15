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

module.exports.coin_history = async function(req, res) {
	// axios.get(`${keys.COIN_API_URI}/BITSTAMP_SPOT_BTC_USD/history?time_start=2021-01-01T00:00:00&limit=100000`, {
	// 	headers: {
	// 		'X-CoinAPI-Key': keys.COIN_HISTORY_API_KEY
	// 	}
	// })
	axios.get(`https://api.tiingo.com/tiingo/crypto/prices?tickers=btcusd&startDate=2019-01-02&resampleFreq=1day&token=29ca28e789aa36e2ebc5f256fafe26c334c4bfa1`)
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