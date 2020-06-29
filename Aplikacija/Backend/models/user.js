const mongoose = require('mongoose');
const request = require('./request');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    address: {
        type:String,
        // required: true
    },
    number: {
        type:String,
        // required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    usertype: {
        type: Number,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                productTitle: {
                    type: String
                },
                productPrice: {
                    type: Number
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    },
    listofimpressions: {
        impressions: [
            {
                content: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    listoforders:{
        orders:[{
            orderId: mongoose.Schema.Types.ObjectId
    }]},
    listoftasks: {
        tasks: [
            {
                location: {
                    type: String,
                    required: true
                },
                date: {
                    type: String
                },
                comment: {
                    //dodatni zahtev
                    type: String
                },
                type: {
                    type: String,
                    required: true
                },
                korisnikid: {
                    type: String
                },
                numberKorisnika: {
                    type: String,
                    required: true
                }
            }
        ]
    },
    listofrequests: {
        requests: [
            {
                requestId: mongoose.Schema.Types.ObjectId
            }
        ]
    }
});

userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cartprod => {
        return cartprod.productId.toString() === product._id.toString();
    });
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id, //imena levo mora da se poklapaju sa schemom
            productTitle: product.title,
            productPrice: product.price,
            quantity: newQuantity
        })
        //ovde cuvamo referencu na te podatke (proizvode) koji su korpi
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function (productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
        //vracamo tacno ako hocem oda zadrzimo element
        //ali nama ipak treba netacno (false)
        //jer ga brisemo, toString()
    });
    this.cart.items = updatedCartItems;
    return this.save();
};
userSchema.methods.removeReq = function (requestId) {
    console.log(requestId)
    const updated = this.listofrequests.requests.filter(item => {
        return item.requestId.toString() !== requestId.toString();
        //vracamo tacno ako hocem oda zadrzimo element
        //ali nama ipak treba netacno (false)
        //jer ga brisemo, toString()
    });
    this.listofrequests.requests = updated;
    return this.save();
};
// userSchema.methods.clearCart = function () {
//     this.cart = { items: [] };
//     return this.save();
// }

userSchema.methods.addImpression = function (impression) {
    const updatedImprlist = [...this.listofimpressions.impressions];
    updatedImprlist.push({ content: impression.content });

    updatedlist = {
        impressions: updatedImprlist
    };
    this.listofimpressions = updatedlist
    return this.save();
}

userSchema.methods.addTask = function (task) {
    const updatedTasklist = [...this.listoftasks.tasks];
    updatedTasklist.push({
        location: task.location,
        date: task.date,
        comment: task.comment,
        type: task.type,
        korisnikid: task.korisnikid,
        numberKorisnika: task.numberKorisnika
    });

    updatedlist = {
        tasks: updatedTasklist
    };
    this.listoftasks = updatedlist
    return this.save();
}
userSchema.methods.addReq = function (r) {
    const updatedRlist = [...this.listofrequests.requests];
    updatedRlist.push({
        requestId: r._id
    });
    updatedlist = {
        requests: updatedRlist
    };
    this.listofrequests = updatedlist
    return this.save();
}

userSchema.methods.addOrder = function (orderId) {
    const updatedOrderList = [...this.listoforders.orders];
    updatedOrderList.push({
        orderId: orderId
    });

    updatedlist = {
        orders: updatedOrderList
    };
    this.listoforders = updatedlist
    this.cart = { items: [] };
    return this.save();
}



module.exports = mongoose.model('User', userSchema);


