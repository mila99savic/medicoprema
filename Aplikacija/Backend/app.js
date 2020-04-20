const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const auth = require('./routes/auth');
const commRoutes = require('./routes/comment');
//const cors = require('cors');
const mongoose = require('mongoose');

const User = require('./models/user');

dotenv.config();

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

//const authRoutes = require('./routes/auth');

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
//app.use(cors());

app.use('/admin', adminRoutes);
app.use('/shop', shopRoutes);//req koji se ne nadje u shop ide u auth
app.use('/auth', auth);
app.use('/comment', commRoutes);

mongoose
  .connect(process.env.DB_CONNECT, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
  .then(result => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });