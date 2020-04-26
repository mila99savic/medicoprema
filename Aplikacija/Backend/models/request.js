//REQUEST-zahtev kad se dodeli zaposlenom postaje TASK-obaveza
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const requestSchema = new Schema ({
    status: {
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Request', requestSchema);