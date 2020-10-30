const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const UserSchema = new Schema({
    register_date: {
        type: Date,
        default: Date.now
    },
    name: {
        type:String,
        require: true
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    password: {
        type:String,
        require: true,
        unique: true
    },
});


module.exports = User = mongoose.model('user', UserSchema); 