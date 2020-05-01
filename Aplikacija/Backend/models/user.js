const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
        type:String,
        required:true,
        min: 6
    },
    email: {
        type: String,
        required: true,
        min: 6
    },
    password: {
        type:String,
        required: true,
        min: 6
    },
    // usertype: {
    //     type: String,
    //     required: true
    // },
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
                content:{
                    type: String,
                    required: true
                }
            }
        ]
    },
    listoftasks: {
        tasks: [ 
            {
                location:{
                    type: String,
                    required: true
                }
            }
        ]
    }
});

userSchema.methods.addToCart = function(product) {
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
            quantity: newQuantity})
        //ovde cuvamo referencu na te podatke (proizvode) koji su korpi
    }
    const updatedCart = {
        items: updatedCartItems
    };
    this.cart = updatedCart;
    return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
    const updatedCartItems = this.cart.items.filter(item => {
        return item.productId.toString() !== productId.toString();
        //vracamo tacno ako hocem oda zadrzimo element
        //ali nama ipak treba netacno (false)
        //jer ga brisemo, toString()
    });
    this.cart.items = updatedCartItems;
    return this.save();
};

userSchema.methods.clearCart = function() {
    this.cart = {items: []};
    return this.save();
}

userSchema.methods.addImpression = function(impression) {
    const updatedImprlist = [...this.listofimpressions.impressions];
    updatedImprlist.push({content: impression.content});

    updatedlist = {
        impressions: updatedImprlist
    };
    this.listofimpressions = updatedlist
    return this.save();
}

userSchema.methods.addTask = function(task) {
    const updatedTasklist = [...this.listoftasks.tasks];
    updatedTasklist.push({location: task.location});

    updatedlist = {
        tasks: updatedTasklist
    };
    this.listoftasks = updatedlist
    return this.save();
}

module.exports = mongoose.model('User', userSchema);

// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb; 

// const ObjectId = mongodb.ObjectId;

// class User {
//     constructor(username, email, cart, id) {
//         this.name = username;
//         this.email = email;
//         this.cart = cart;
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         return db.collection('korisnici').insertOne(this);
//     }

//     addToCart(product) {//nad user objectom
        // const cartProductIndex = this.cart.items.findIndex(cartprod => {
        //     return cartprod.productId.toString() === product._id.toString();
        // });
        // let newQuantity = 1;
        // const updatedCartItems = [...this.cart.items];

        // if (cartProductIndex >= 0) {
        //     newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        //     updatedCartItems[cartProductIndex].quantity = newQuantity;
        // } else {
        //     updatedCartItems.push({ productId: new ObjectId(product._id), quantity: newQuantity})
        //     //ovde cuvamo referencu na te podatke (proizvode) koji su korpi
        // }
        // const updatedCart = {
        //     items: updatedCartItems
        // };
        // const db = getDb();
        // return db
        // .collection('korisnici')
        // .updateOne(
        //     { _id: new ObjectId(this._id) },
        //     {$set: {cart: updatedCart}}
        // );
//     }

//     getCart() {//postoji samo za one korisnike koji imaju korpu
//         const db = getDb()
//         const productIds = this.cart.items.map( i => {
//             return i.productId;
//         });
//         //mapiranje niza js bjekta u niz sa samo stringovima(samo id-jevi)
//         return db
//         .collection('proizvodi')
//         .find({ _id: {$in: productIds}})
//         .toArray()
//         //dole imamo niz proizvoda koji hcoemo da transforimisemo(sa map) 
//         // gde ima sve proizvode (...p) samo im menjamo kolicinu
//         //find nalazi taj proizvod (kao objekat) i nama treba nj kolicina
//         .then(products => {
//             return products.map( p => {
//                 return {
//                     ...p, 
//                     quantity: this.cart.items.find( i => {
//                         return i.productId.toString() === p._id.toString();
//                 }).quantity
//             };//ovde spajamo podatake za bazu
//             });
//         });
//         //nalazi sve proizvode koji su korpi
//         //pomocu $in koji prima niz id-jeva i vraca kursor na te objekte
//     }

//     deleteItemFromCart(productId) {
        // const updatedCartItems = this.cart.items.filter(item => {
        //     return item.productId.toString() !== productId.toString();
        //     //vracamo tacno ako hocem oda zadrzimo element
        //     //ali nama ipak treba netacno (false)
        //     //jer ga brisemo, toString()
        // });
//         const db = getDb();
//         return db
//         .collection('korisnici')
//         .updateOne(
//             { _id: new ObjectId(this._id) },
//             {$set: {cart: {items: updatedCartItems } } }
//         );
//     }

//     addOrder() {
//         const db = getDb();
//         return this.getCart().then(products => {
//             const order = {
//                 items: products,//iako se ovde promeni cena proizvda
//                 //nas to ne zanima jer smo vec narucili hehe
//                 user: {
//                     _id: new ObjectId(this._id),
//                     name: this.name,
//                     email: this.email//ako se email menja onda on ne treba ovde da stoji
//                 }
//             };
//             return db
//             .collection('narudzbine')
//             .insertOne(order)
//         })
//         .then(result => {
//             this.cart = {items: []};//ovde praznimo cart jer smo gore sve prebacili
//             return db
//             .collection('korisnici')
//             .updateOne(
//                 { _id: new ObjectId(this._id) },
//                 {$set: {cart: {items: [] } } }
//         );
//         });
//     }

//     getOrders() {
//         const db=getDb();
//         return db
//         .collection('narudzbine')
//         .find({'user._id': new ObjectId(this._id)})
//         .toArray();
//     }

//     static findById(userId) {
//         const db = getDb();
//         return db
//         .collection('korisnici')
//         .findOne({_id: new ObjectId(userId) })
//         .then(user => {
//             console.log(user);
//             return user;
//         })
//         .catch(err => {
//             console.log(err)});
//         //moze i find + next (da anm se namesti kursor), isto je
//     }
// }


// module.exports = User;
