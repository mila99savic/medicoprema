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
    },
    cart: {
        items: [
            {
                productId: { 
                    type: Schema.Types.ObjectId, 
                    ref: 'Product',
                    required: true},
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

module.exports = mongoose.model('Impression', impressionSchema);