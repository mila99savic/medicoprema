const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://miljana:26012611@cluster0-zqlcv.mongodb.net/medico?retryWrites=true&w=majority ')
    //ukoliko baza medico ne postoji, mongodb ce automatski da je kreira kad krenemo da ubacujemo podatke u nju
    .then(client => {
        console.log('Konektovana je baza!'); //ako je konektovano sa bazom
        _db = client.db();//ovde cuvamo u _db konekciju
        callback(client);
    })
    .catch(err => {
        console.log(err); //ako nije konektovano sa bazom
        throw err;
    });
}

const getDb = () => {
    if(_db) {
        return _db;
    } 
    throw 'Nema baze!';
}; 

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;

