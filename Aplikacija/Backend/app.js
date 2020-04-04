const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
    User.findById('5e87654d91224f0484c3e5a6')
      .then(user => {
        req.user = user;//user je mongoose object
        //ovo nam omogucava da pozivamo metode user.js(controllers)
        next();
      })
      .catch(err => console.log(err));
  }); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
  

mongoose
.connect(
  'mongodb+srv://miljana:26012611@cluster0-zqlcv.mongodb.net/medico?retryWrites=true&w=majority'
  , {useUnifiedTopology: true,
     useNewUrlParser: true})
.then(result => {
  User.findOne().then(user => {
    if (!user) {
      const user = new User({
        name: 'Mima',
        email: '98mima@jok.com',
        cart: {
          items: []
        }
      });
      user.save();
    }
    })
  app.listen(3000);
})
.catch(err => {
  console.log(err);
});