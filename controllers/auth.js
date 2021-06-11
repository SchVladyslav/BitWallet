const { v4: uuidv4 } = require("uuid")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../helper/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');
const statuses = require('../helper/statuses');
const messages = require('../helper/messages');

module.exports.login = async function(req, res) {
	const isUserExist = await User.findOne({wallet: req.body.wallet});
	const expiresInNumber = 60 * 60;

	if (isUserExist) {
		const passwordResult = bcrypt.compareSync(req.body.password, isUserExist.password);
		
		if (passwordResult) {
			const token = jwt.sign({
				email: isUserExist.email,
				userId: isUserExist._id
			}, keys.jwt, {expiresIn: expiresInNumber});

			res.status(200).json({
				token: `Bearer ${token}`
			});
		} else {
			res.status(statuses.unauthStatus).json({
				message: messages.unauthMessage
			});
		}

	} else {
		res.status(statuses.notFoundStatus).json({
			message: messages.clientNotFoundMessage
		});
	}
}

module.exports.signup = async function(req, res) {
	const isUserExist = await User.findOne({email: req.body.email});
	const walletID = uuidv4();
	
	if (isUserExist) {
		res.status(statuses.conflictStatus).json({
			message: messages.emailConflictMessage
		});
	} else {
		const salt = bcrypt.genSaltSync(10);
		const password = req.body.password;
		const confirmPassword = req.body.confirmPassword;

		if (password !== confirmPassword) {
			res.status(statuses.conflictStatus).json({
				message: messages.passwordConflictMessage
			})
		}

		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
			wallet: walletID
		});

		try {
			await user.save();
			res.status(statuses.createdStatus).json(user);
		} catch (error) {
			errorHandler(res, e);
		}
	}
}