const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoConnect = require('./util/database').mongoConnect;
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
    User.findById('5e80e9b9faae031178087396')
      .then(user => {
        req.user = new User(user.name, user.email, user.cart, user._id);
        //ovo nam omogucava da pozivamo metode user.js(controllers)
        next();
      })
      .catch(err => console.log(err));
  }); 

app.use('/admin', adminRoutes);
app.use(shopRoutes);
  
app.use('/admin', adminRoutes);
app.use(shopRoutes);

//callback ove fje je fja koja se izvrsava kad se konektujemo na vazu
mongoConnect(() => {
    app.listen(3000);
});