const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Schema
const CardioSchema = new Schema({
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type:String,
        require:true
    },
    type: {
        type:String,
        require: true
    },
    duration:{
        type: String,
        require: true
    },
    intensity:{
        type: String,
        require: true
    }    
});


module.exports = Cardio = mongoose.model('cardio', CardioSchema); 