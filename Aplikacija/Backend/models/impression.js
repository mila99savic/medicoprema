const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const impressionSchema = new Schema ({
    content: {
        type:String,
        required:true
    },
    korisnikid: {
        type: String,
        required: true
    },
    zaposlenid: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Impression', impressionSchema);