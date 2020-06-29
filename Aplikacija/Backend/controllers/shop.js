const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');
const { orderValidation } = require('../validation');
const { date } = require('@hapi/joi');

exports.getProducts = async (req, res, next) => {
  try {
    const prod = await Product.find()//find vraca proizvod a ne kursor
    res.status(200)
      .json({ message: 'Prikupljeni proizvodi', Data: prod })
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
  try {
    const user = await User.findById(req.params.userId)
    res.status(200)
      .json({ message: 'Korpa korisnika', Data: user.cart, Success: true })
  }
  catch (err) {
    res.json({ Success: false });
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

//dodaj u korpu
exports.postCart = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId);
    Product.findById(req.body.productId)
      .then(product => {
        res.json({ Success: true })
        return user.addToCart(product);
      })
      .catch(err => console.log(err))
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
};
//brisanje iz korpe
exports.cartDeleteProduct = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.userId)
    user.removeFromCart(req.body.productId);
    res.status(200).json({ Success: true });
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
};

exports.postOrder = async (req, res, next) => {
  const { error } = orderValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const userId = req.body.userId;
  try {
    const user = await User.findById(userId)
    user
      .populate('cart.items.productId ')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
          //_doc- samo podaci iz dokumenta(objecta)
        });
        const products1 = user.cart.items;
        let total = 0;
        products1.forEach(p => {
          total += p.quantity * p.productPrice;
        })
        const order = new Order({
          date: Date.now(),
          address: user.address,
          price: total,
          number: user.number,
          status: "neobradjen",
          name: user.name,
          userId: user._id,
          products: products
        });
        return order.save();
      })
      .then(order => {
        res.json({ Success: true });
        return user.addOrder(order._id);
      })
      .catch(err => console.log(err));
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
};

// exports.sum = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId)
//     const products = user.cart.items;
//     let total = 0;

//     products.forEach(p => {
//       total += p.quantity * p.productPrice;
//       console.log(total)
//     });
//     res.json({ message: 'pribavljena suma', total: total })
//   }
//   catch (err) {
//     res.json({ success: false });
//     console.log(err);
//   }
// };

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()//find vraca proizvod a ne kursor
    res.status(200)
      .json({ message: 'Prikupljene narudzbine', orders: orders })
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
};
// exports.getOrdersItems= async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.userId)
//     console.log(user.listoforders.orders.orderId)
//     const items = await Order.find({"_id": user.listoforders.orders.orderId})
//     res.status(200)
//       .json({ message: 'Prikupljene narudzbine', Data: items })
//   }
//   catch (err) {
//     res.json({ success: false });
//     console.log(err);
//   }
// };
exports.getUnOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()//find vraca proizvod a ne kursor
    const unresOrders = await Order.find({ "status": "neobradjen" })
    res.status(200)
      .json({ Data: unresOrders })
  }
  catch (err) {
    res.json({ success: false });
    console.log(err);
  }
};

exports.getOrdersByUserId = async (req, res, next) => {
  try {
    // const user = await User.findById(req.params.userId)
    const orders = await Order.find({userId: req.params.userId})

    res.status(200)
      .json({ Data: orders, Success: true })
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
}

exports.updateOrderState = async (req, res, next) => {
  const o = await Order.findById(req.body.ordId)
  try {
    Order.findById(req.body.ordId)
      .then(ord => {
        const vrednost = req.body.vrednost
        if (vrednost == 1) {
          ord.status = "potvrdjen"
        }
        else if (vrednost == 2)
          ord.status = "odbijen"
        res.status(200)
          .json({ Success: true })
        return ord.save()
      })
    User.findById(o.userId)
      .then(user => {
        return user.save()
      })
      .catch(err => {
        console.log(err)
      })
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
}

exports.updateOrderNotification = async (req, res, next) => {
  try {
    const order = await Order.findById(req.body.ordId);

    const poruka = req.body.notification;
    order.notification = poruka;
    res.status(200)
      .json({ Success: true })
    return order.save()
  }
  catch (err) {
    res.json({ Success: false });
    console.log(err);
  }
}
