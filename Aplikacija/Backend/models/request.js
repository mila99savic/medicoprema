//REQUEST-zahtev kad se dodeli zaposlenom postaje TASK-obaveza
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema ({
    location: {
        type:String,
        required:true
    },
    date: {
        type: Date
        //default: Date.now
    },
    comment: {
        //dodatni zahtev
        type: String
    },
    type: {
        type:String,
        required: true
    },
    // vreme: {
    //     type:String,
    //     required: true
    // },
    status: {
        type: String
    },
    korisnikid: {
        type: String, 
        required: true
    }
});

module.exports = mongoose.model('Request', requestSchema);