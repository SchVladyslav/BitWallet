const statuses = require('../helper/statuses');

module.exports = (res, error) => {
	res.status(statuses.internalServerStatus).json({
		success: false,
		message: error.message ? error.message : error
	});
}