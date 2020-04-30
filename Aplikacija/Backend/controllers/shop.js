const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const { orderValidation } = require('../validation');

exports.getProducts = async (req, res, next) => {
  try {
    const prod = await Product.find()//find vraca proizvod a ne kursor
    res.status(200)
      .json({ message: 'Prikupljeni proizvodi', prod: prod })
  }
  catch (err) {
    res.json({ success: false });
  }
};

exports.getProduct = async (req, res, next) => {
  try {
    const prod = await Product.findById(req.params.productId)
    res.json({ message: 'pribavljen je prizvod', prod: prod })
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
};

exports.getCart = async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId)
    res.status(200)
      .json({ message: 'Korpa korisnika', cart: user.cart })
  }
  catch(err){
    res.json({ success: false });
    console.log(err);
  }
  // req.user
  //   .populate('cart.items.productId ')
  //   .execPopulate()
  //   .then(user => {
  //     const products = user.cart.items;
  //         res.render('shop/cart', {
  //           path: '/cart',
  //           pageTitle: 'Vasa korpa',
  //           products: products,
  //           isAuthenticated: req.session.isLoggedIn
  //         });
  //   })
  //   .catch(err => console.log(err));
};

exports.postCart = async (req, res, next) => {
try{
  const user = await User.findById(req.body.userId);
    Product.findById(req.body.productId)
      .then(product => {
        res.send('pokusavam da dodam u korpu')
        return user.addToCart(product);
      })
      .catch(err => console.log(err))
}
catch(err){
  res.json({ success: false });
    console.log(err);
}
};

exports.cartDeleteProduct = async (req, res, next) => {
try{
  const user = await User.findById(req.body.userId)
    user
      .removeFromCart(req.body.productId);
    res.send('pokusavam da obrisem proizvod iz korpe');
}
catch(err){
  res.json({ success: false });
    console.log(err);
}
};

exports.postOrder = async (req, res, next) => {
  const { error } = orderValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const userId = req.body.userId;
  try{
    const user = await User.findById(userId)
      user
        .populate('cart.items.productId ')
        .execPopulate()
        .then(user => {
          const products = user.cart.items.map(i => {
            return { quantity: i.quantity, product: { ...i.productId._doc } };
            //_doc- samo podaci iz dokumenta(objecta)
          });
          const order = new Order({
            user: {
              name: user.name,//req.user je ceo user object
              userId: userId //mongoose sam odavde uzima Id 
            },
            products: products
          });
          return order.save();
        })
        .then(result => {
          return user.clearCart();
        })
        .then(() => {
          res.send('dodajem narudzbinu')
        })
        .catch(err => console.log(err));
  }
  catch(err){
    res.json({ success: false });
    console.log(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try{
    const orders = await Order.find()//find vraca proizvod a ne kursor
      res.status(200)
        .json({ message: 'Prikupljene narudzbine', orders: orders })
  }
  catch(err){
    res.json({ success: false });
    console.log(err);
  }
};


