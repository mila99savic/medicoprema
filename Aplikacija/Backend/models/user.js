const mongoose = require('mongoose');

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
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
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
    listoforders: {
        orders: [
            {
                orderId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Order',
                    required: true
                },
                date: {
                    type: Date,
                    required: true
                },
                address: {
                    type: String,
                    required: true
                },
                price: {
                    type: String,
                    //required: true
                },
                number: {
                    type: String,
                    required: true
                }
                //,
                // items: [
                //     {
                //         // product: { 
                //         //     type: Object, 
                //         //     //ref: 'Product',
                //         //     required: true
                //         // }
                //         productTitle: {
                //             type: String
                //         },
                //         productPrice: {
                //             type: Number
                //         },
                //         quantity: {
                //             type: Number,
                //             required: true
                //         }
                //     }
                // ]
            }
        ]
    },
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
                location: {
                    type: String
                },
                date: {
                    type: String
                },
                comment: {
                    //dodatni zahtev
                    type: String
                },
                type: {
                    type: String
                },
                time: {
                    type: String
                },
                status: {
                    type: String
                }
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

userSchema.methods.clearCart = function () {
    this.cart = { items: [] };
    return this.save();
}

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
userSchema.methods.addReq = function (task) {
    const updatedTasklist = [...this.listofrequests.requests];
    updatedTasklist.push({
        location: task.location,
        date: task.location,
        comment: task.comment,
        type: task.type,
        status: "obradjuje se"
    });

    updatedlist = {
        requests: updatedTasklist
    };
    this.listofrequests = updatedlist
    return this.save();
}

userSchema.methods.addOrder = function (order) {
    const updatedImprlist = [...this.listoforders.orders];
    //console.log(order._id)
    updatedImprlist.push({
        orderId: order._id,
        date: order.date,
        address: order.address,
        price: order.price,
        number: order.number,
        status: "obradjuje se"
        //   items: [{
        //       productTitle: order.products.product.title,
        //       productPrice: order.products.product.price,
        //       quantity: order.products.product.quantity
        //   }
        //]
    });

    updatedlist = {
        orders: updatedImprlist
    };
    this.listoforders = updatedlist
    return this.save();
}

module.exports = mongoose.model('User', userSchema);


