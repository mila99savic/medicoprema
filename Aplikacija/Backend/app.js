const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const auth = require('./routes/auth');
//const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
//const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//app.use(cors());

app.use('/admin', adminRoutes);
app.use(shopRoutes);//req koji se ne nadje u shop ide u auth
//app.use(authRoutes);


app.use('/auth', auth);
mongoose
  .connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true})
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });