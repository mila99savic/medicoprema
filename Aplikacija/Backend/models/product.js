const mongodb = require('mongodb');//da bismo mogli da pristupamo objektima tipa mongodb (id..)
const getDb = require('../util/database').getDb; 

class Product {
    constructor (title, price, description, imageURL, id) {
        this.title=title;
        this.price=price;
        this.description=description;
        this.imageURL=imageURL;
        this._id-id;
    }

    save() { //da bismo cuvali u bazi
        const db = getDb();
        let dbOp;
        if(this._id) {
            //apdejtuj proizvod gde je _id jednak onome sto posle sledi (this za sve ili samo ime onda this.title)
            dbOp = db
            .collection('proizvodi')
            .updateOne({_id: new mongodb.ObjectID(this._id)}, {$set: this});
        } else {
        dbOp = db
        .collection('proizvodi')//ako ne postoji kreira se
        .insertOne(this)
        }
        
        return dbOp
        .then(result => {
            console.log(result);
        })
        .catch(err => {
            console.log(err);
        }); 
    }

    static fetchAll() {
        const db = getDb(); 
        return db
        .collection('proizvodi')
        .find()
        .toArray()
        .then(products => {
            console.log(products);
            return products;
        })
        .catch(err => {
            console.log(err);
        });//nalazi sve
        //preko cursora mozemo da se setamo po svim tim elementima
    }

    static findById(prodId) {
        const db=getDb();
        return db
        .collection('proizvodi')
        .find({_id: new mongodb.ObjectID(prodId) })
        //u mongo se id pamti kao bson(binarni json zato je id takav)
        .next()
        .then(product => {
            console.log(product);
            return product;
        })
        .catch(err => {
            console.log(err)
        });
    }
}

module.exports = Product;