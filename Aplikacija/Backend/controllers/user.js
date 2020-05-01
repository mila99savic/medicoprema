const User = require('../models/user');
const bcryptjs = require('bcryptjs');
const { updateUserValidation } = require('../validation')

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

exports.updateUser = async (req, res, next) => {
  const { error } = updateUserValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);
  const salt = await bcryptjs.genSalt(10);
  const hashedPw = await bcryptjs.hash(req.body.password, salt);

  const user = await User.findById(req.params.userId)
  user.name = user.name;
  user.email = user.email;
  user.password = hashedPw;
  try {
    const savedUser = await user.save()
    res.json({ Success: true, savedUser });
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
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