const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const LiftSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type:String,
        require: true
    },
    lift: {
        type:String,
        require: true
    },
    weight:{
        type: String,
        require: true
    },
    rep: {
        type: String,
        require: true
    }    
});


module.exports = Lift = mongoose.model('lift', LiftSchema); 