const { v4: uuidv4 } = require("uuid")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function(req, res) {
	const isUserExist = await User.findOne({wallet: req.body.wallet});
	const notFoundStatus = 404;
	const notFoundMessage = "Client was not found!";
	const unauthStatus = 401;
	const unauthMessage = "Incorrect password. Try again.";
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
			res.status(unauthStatus).json({
				message: unauthMessage
			});
		}

	} else {
		res.status(notFoundStatus).json({
			message: notFoundMessage
		});
	}
}

module.exports.signup = async function(req, res) {
	const isUserExist = await User.findOne({email: req.body.email});
	const walletID = uuidv4();
	const conflictStatus = 409;
	const conflictMessage = "Email is already in use! Try another one.";
	const createdStatus = 201;
	const conflictMessage2 = "Passwords weren't matched!";

	if (isUserExist) {
		res.status(conflictStatus).json({
			message: conflictMessage
		});
	} else {
		const salt = bcrypt.genSaltSync(10);
		const password = req.body.password;
		const confirmPassword = req.body.confirmPassword;

		if (password !== confirmPassword) {
			res.status(conflictStatus).json({
				message: conflictMessage2
			})
		}

		const user = new User({
			email: req.body.email,
			password: bcrypt.hashSync(password, salt),
			wallet: walletID
		});

		try {
			await user.save();
			res.status(createdStatus).json(user);
		} catch (error) {
			errorHandler(res, e);
		}
	}
}