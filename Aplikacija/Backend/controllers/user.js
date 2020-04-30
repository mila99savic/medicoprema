const User = require('../models/user');
const bcryptjs = require('bcryptjs');

exports.getUsers = (req, res, next) => {
    User.find()
    .then(users => {
     res.status(200)
     .json({message: 'Prikupljeni korisnici', users: users})
    })
    .catch(err => {
      console.log(err);
    });
};

exports.findByEmail = (req, res, next) => {
    const userEmail = req.params.userEmail;

    User.findOne({email: userEmail
    })
      .then(user => {
        res.json({message: 'pribavljen je korisnik', user: user.name})
      })
      .catch(err => console.log(err));
}

exports.updateUser = (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedPassword = req.body.password;

  bcryptjs.hash(updatedPassword, 12).then(hashedPw => {
    User.findById(userId).then(user => {
        user.name = updatedName;
        user.email = updatedEmail;
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

exports.deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    User.findByIdAndRemove(userId)//fja mongoosa
    .then(() => {
      res.send('Obrisano');
    })
    .catch(err => console.log(err));
}