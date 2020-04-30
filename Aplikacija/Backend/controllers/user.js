const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.find()
    res.status(200)
      .json({ message: 'Prikupljeni korisnici', users: users })
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
};

exports.findByEmail = async (req, res, next) => {
  const userEmail = req.params.userEmail;

  try {
    const user = await User.findOne({ email: userEmail })
    res.json({ message: 'pribavljen je korisnik', user: user.name })
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
}

exports.updateUser =  (req, res, next) => {
  const userId = req.params.userId;
  //const updatedName = req.body.name;
  //const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;


  bcryptjs.hash(updatedPassword, 12).then(hashedPw => {
    User.findById(userId).then(user => {
      user.name = user.name;
      user.email = user.email;
      user.password = hashedPw;
      return user//ovo je mongoose object
        .save()//radi i apdejt
    })
      .then(result => {
        res.send('Apdejtovano')
      })
      .catch(err => console.log(err));
  })
    .catch(err => console.log(err));
};

exports.deleteUser = async (req, res, next) => {
  const user = await User.findByIdAndRemove(req.params.userId)
  try {
    res.json({ Success: true, message: "Obrisano!" });
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
}