const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const scheduleSchema = new Schema ({
    location: {
        type:String,
        required:true
    },
    date: {
        type: Date,
        default: Date.now
    },
    comment: {
        //dodatni zahtev
        type: String
    },
    type: {
        type:String,
        required: true
    },
    korisnikid: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Schedule', scheduleSchema);