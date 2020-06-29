const mongoose = require('mongoose');
const { required } = require('@hapi/joi');

const Schema = mongoose.Schema;

const impressionSchema = new Schema ({
    content: {
        type:String,
        required:true
    },
    // korisnikid: {
    //     type: String
    // },
    zaposlenid: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    nameKorisnika:{
        type:String, 
        required:true
    },
    addressKorisnika:{
        type:String,
        // required:true
    }
});

module.exports = mongoose.model('Impression', impressionSchema);