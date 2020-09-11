module.exports.login = function(req, res) {
    res.status(200).json({
        login: {
            wallet: req.body.wallet,
            password: req.body.password,            
        }
    })
}

module.exports.signup = function(req, res) {
    res.status(200).json({
        reg: true
    })
}