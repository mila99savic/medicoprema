const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    nameProduct:{
        type:String,
        required:true
    },
    productid: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
        // ,
        // required: true
    },
    korisnikid: {
        type: Schema.Types.ObjectId,
        ref: 'User'
        // ,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Comment', commentSchema);