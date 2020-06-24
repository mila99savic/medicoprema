const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type:Date,
        required:true
    },
    address:{
        type:String,
        required: true
    },
    price: {
        type:String,
        //required: true
    },
    number: {
        type:String,
        required: true
    },
    status:{
        type: String
    }
});

module.exports = mongoose.model('Order', orderSchema);