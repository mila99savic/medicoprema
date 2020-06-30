const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    location: {
        type:String,
        required:true
    },
    date: {
        type: String
        //default: Date.now
    },
    comment: {
        //dodatni zahtev
        type: String
    },
    requestId: {
        type: Schema.Types.ObjectId,
        ref: 'Request',
        // required: true
    },
    type: {
        type:String,
        required: true
    },
    time:{
        type:String,
    },
    korisnikid: {
        type: String, 
        // required: true
    },
    zaposleniId: {
        type: String
    },
    numberKorisnika:{
        type: String
    }
});

module.exports = mongoose.model('Task', taskSchema);