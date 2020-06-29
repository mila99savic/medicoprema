const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');

exports.register = async (req, res, next) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).send(res.json({Status: error.details[0].message}));

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
    lastname: req.body.lastname,
    address: req.body.address,
    number: req.body.number,
    email: req.body.email,
    username: req.body.username,
    password: hashPassword,
    usertype: 0
  });

  const token = jwt.sign({ _id: user._id }, process.env.TOKEN);

  try {
    const savedUser = await user.save();
    const Data = { id: savedUser.id, name: savedUser.name, email: savedUser.email, usertype:savedUser.usertype }
    res.json({ Success: true, AuthToken: token, Data});
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
    return res.json({ Status: 'Wrong email', Success:false });

  const validPassword = await bcryptjs.compare(req.body.password, userExist.password);
  if (!validPassword)
    return res.json({ Status: 'Wrong Password', Success:false });

  //Create Token
  Data = {id: userExist.id, usertype: userExist.usertype};
  const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN);
  res.json({ AuthToken: token, Success: true, Data });
}

exports.checkPassword = (password, hash) => {
  return bcryptjs.compareSync(password.toString(), hash)
}

