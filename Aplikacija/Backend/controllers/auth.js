const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

exports.register = (req, res, next) => {
    const { error } = registerValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    User.findOne({ email: req.body.email }).then(userDoc => {
        if (userDoc) {
            return res.json({ Status: 'Korisnik sa takvim mejlom vec postoji' });
        }
    })
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    bcryptjs
        .hash(password, 12)
        .then(hashedPw => {
            const user = new User({
                name: name,
                email: email,
                password: hashedPw,
            });
            return user.save();
        })
        .then(result => {
            res.status(201).json({ message: 'Korisnik kreiran', userId: result._id });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}

exports.login = (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);

  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then(user => {
      if (!user) 
        return res.json({ Status: error.details[0].message });
      loadedUser = user;
      return bcryptjs.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual)
        return res.json('Poresan password')
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.TOKEN,
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
}

