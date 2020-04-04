const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }, 
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Korisnik', 
        required: true
        //ide ime modela (exports..)
        //ovo je relacija 
    }
});

module.exports = mongoose.model('Proizvod', productSchema);
//model je fja koju mongoose izvrsava da konektuje schemu sa modelom
//zadajemo ime modela
//'Proizvod' => mongoose je od ovog napravio kolekciju => proizvods


// const mongodb = require('mongodb');//da bismo mogli da pristupamo objektima tipa mongodb (id..)
// const getDb = require('../util/database').getDb; 

// class Product {
//     constructor (title, price, description, imageURL, id, userid) {
//         this.title=title;
//         this.price=price;
//         this.description=description;
//         this.imageURL=imageURL;
//         this._id = id ? new mongodb.ObjectId(id) : null;
//         this.userid = userid;
//     }

//     save() { //da bismo cuvali u bazi
//         const db = getDb();
//         let dbOp;
//         if(this._id) {
//             //apdejtuj proizvod gde je _id jednak onome sto posle sledi (this za sve ili samo ime onda this.title)
//             dbOp = db
//             .collection('proizvodi')
//             .updateOne({_id: this._id}, {$set: this});
//         } else {
//         dbOp = db
//         .collection('proizvodi')//ako ne postoji kreira se
//         .insertOne(this)
//         }
        
//         return dbOp
//         .then(result => {
//             console.log(result);
//         })
//         .catch(err => {
//             console.log(err);
//         }); 
//     }

//     static fetchAll() {
//         const db = getDb(); 
//         return db
//         .collection('proizvodi')
//         .find()
//         .toArray()
//         .then(products => {
//             console.log(products);
//             return products;
//         })
//         .catch(err => {
//             console.log(err);
//         });//nalazi sve
//         //preko cursora mozemo da se setamo po svim tim elementima
//     }

//     static findById(prodId) {
//         const db=getDb();
//         return db
//         .collection('proizvodi')
//         .find({_id: new mongodb.ObjectId(prodId) })
//         //u mongo se id pamti kao bson(binarni json zato je id takav)
//         .next()
//         .then(product => {
//             console.log(product);
//             return product;
//         })
//         .catch(err => {
//             console.log(err)
//         });
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//         .collection('proizvodi')
//         .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//         .then(result => {
//             console.log('Obrisano');
//         })
//         .catch(err => {
//             console.log(err)
//         })
//     }
// }

// module.exports = Product;