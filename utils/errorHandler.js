module.exports = (res, error) => {
    const internalServerStatus = 500;
    
    res.status(500).json({
        success: false,
        message: error.message ? error.message : error
    });
}