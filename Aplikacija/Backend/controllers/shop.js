const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()//find vraca proizvod a ne kursor
    .then(products => {
     res.status(200)
     .json({message: 'Prikupljeni proizvodi', products: products})
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)//od mongoos je findById
  //prosledjujemo string a on komvertuje u object
  //kastuje id u _id
    .then(product => {
      res.json({message: 'pribavljen je prizvod', product: product})
    })
    .catch(err => console.log(err));
};

// exports.getIndex = (req, res, next) => {
//   Product.find()
//     .then(products => {
//       res.render('shop/index', {
//         prods: products,
//         pageTitle: 'Prodavnica',
//         path: '/',
//         //isAuthenticated: req.session.isLoggedIn
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// exports.getCart = (req, res, next) => {
//   req.user
//     .populate('cart.items.productId')
//     .execPopulate()
//     .then(user => {
//       const products = user.cart.items;
//           res.render('shop/cart', {
//             path: '/cart',
//             pageTitle: 'Vasa korpa',
//             products: products,
//             isAuthenticated: req.session.isLoggedIn
//           });
//     })
//     .catch(err => console.log(err));
// };

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  const userid = req.body.userId;

  User.findById(userid).then(user => {
      Product.findById(prodId)
        .then(product => {
          res.send('pokusavam da dodam u korpu')
          return user.addToCart(product);
        })
        .catch(err => console.log(err))})
    .catch(err => console.log(err))
};

exports.cartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const userid = req.body.userId;

  User.findById(userid)
    .then(user => {
      user
        .removeFromCart(prodId);
      res.send('pokusavam da obrisem proizvod iz korpe');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userid = req.body.userId;

  User.findById(userid).then(user => {
    user
      .populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
          //_doc- samo podaci iz dokumenta(objecta)
        });
        const order = new Order({
          user: {
            name: user.name,//req.user je ceo user object
            userId: userid//mongoose sam odavde uzima Id
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
  })
    .catch(err => console.log(err));

};

// exports.getOrders = (req, res, next) => {
//   Order.find({'user.userId': req.user._id})
//     .then(orders => {
//       res.render('shop/orders', {
//         path: '/orders',
//         pageTitle: 'Vase narudzbine',
//         orders: orders,
//         isAuthenticated: req.session.isLoggedIn
//       });
//     })
//     .catch(err => console.log(err));
// };
