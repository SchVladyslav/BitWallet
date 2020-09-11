const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    wallet: {
        type: String,
        required: true,
        unique: true
    },
    balance: [
        {
            name: {
                type: String
            },
            quantity: {
                type: Number
            }                    
        }
    ]    
});

module.exports = mongoose.model('users', userSchema);
