const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageSrc: {
        type: String,
        required: true // default: ''
    }
});

module.exports = mongoose.model('currencies', currencySchema);