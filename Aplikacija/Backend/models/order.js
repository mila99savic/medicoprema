const mongoose = require('mongoose');
const { number } = require('@hapi/joi');
const User = require('../models/user');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    name: {
        tpe: String
    },
    price: {
        type: Number
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        // required: true
    },
    notification:{
        type: String
    },
    products: [
        {
          product: { type: Object, required: true },
          quantity: { type: Number, required: true }
        }
      ],
});
module.exports = mongoose.model('Order', orderSchema);