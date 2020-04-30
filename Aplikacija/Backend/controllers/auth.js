const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

exports.register = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) {
    return res.json({ Status: 'Korisnik sa takvim mejlom vec postoji' });
  }

  //hashing the password
  const salt = await bcryptjs.genSalt(10);
  console.log(salt);
  const hashPassword = await bcryptjs.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);

  try {
    const savedUser = await user.save();
    res.json({ Success: true, AuthToken: token, savedUser });
  } catch (err) {
    res.json({ Success: false, Message: err });
  }
}

exports.login = async (req, res, next) => {
  const { error } = loginValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const userExist = await User.findOne({ email: req.body.email });
  if (!userExist)
    return res.json({ Status: 'Wrong email' });

  const validPassword = await bcryptjs.compare(req.body.password, userExist.password);
  if (!validPassword)
    return res.json({ Status: 'Wrong Password' });

  //Create Token
  const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN);
  res.json({ AuthToken: token, userExist });
}

