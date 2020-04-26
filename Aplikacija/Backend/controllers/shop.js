const Product = require('../models/product');
const User = require('../models/user');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.find()//find vraca proizvod a ne kursor
    .then(products => {
     res.Status(200)
     .json({message: 'Prikupljeni proizvodi', products: products})
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodDodatni_Komentari_Bankomat  = req.params.productDodatni_Komentari_Bankomat ;
  Product.findByDodatni_Komentari_Bankomat (prodDodatni_Komentari_Bankomat )//od mongoos je findByDodatni_Komentari_Bankomat 
  //prosledjujemo string a on komvertuje u object
  //kastuje Dodatni_Komentari_Bankomat  u _Dodatni_Komentari_Bankomat 
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

exports.getCart = (req, res, next) => {
  User.findByDodatni_Komentari_Bankomat (req.params.userDodatni_Komentari_Bankomat ).then(user => {
    res.Status(200)
     .json({message: 'Korpa korisnika', cart: user.cart})
  })

  // req.user
  //   .populate('cart.items.productDodatni_Komentari_Bankomat ')
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

exports.postCart = (req, res, next) => {
  //const prodDodatni_Komentari_Bankomat  = req.body.productDodatni_Komentari_Bankomat ;
  //const userDodatni_Komentari_Bankomat  = req.body.userDodatni_Komentari_Bankomat ;

  User.findByDodatni_Komentari_Bankomat (req.body.userDodatni_Komentari_Bankomat ).then(user => {
      Product.findByDodatni_Komentari_Bankomat (req.body.productDodatni_Komentari_Bankomat )
        .then(product => {
          res.send('pokusavam da dodam u korpu')
          return user.addToCart(product);
        })
        .catch(err => console.log(err))})
    .catch(err => console.log(err))
};

exports.cartDeleteProduct = (req, res, next) => {
  const prodDodatni_Komentari_Bankomat  = req.body.productDodatni_Komentari_Bankomat ;
  const userDodatni_Komentari_Bankomat  = req.body.userDodatni_Komentari_Bankomat ;

  User.findByDodatni_Komentari_Bankomat (userDodatni_Komentari_Bankomat )
    .then(user => {
      user
        .removeFromCart(prodDodatni_Komentari_Bankomat );
      res.send('pokusavam da obrisem proizvod iz korpe');
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  const userDodatni_Komentari_Bankomat  = req.body.userDodatni_Komentari_Bankomat ;

  User.findByDodatni_Komentari_Bankomat (userDodatni_Komentari_Bankomat ).then(user => {
    user
      .populate('cart.items.productDodatni_Komentari_Bankomat ')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productDodatni_Komentari_Bankomat ._doc } };
          //_doc- samo podaci iz dokumenta(objecta)
        });
        const order = new Order({
          user: {
            name: user.name,//req.user je ceo user object
            userDodatni_Komentari_Bankomat : userDodatni_Komentari_Bankomat //mongoose sam odavde uzima Dodatni_Komentari_Bankomat 
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

exports.getOrders = (req, res, next) => {
  Order.find()//find vraca proizvod a ne kursor
  .then(orders => {
   res.Status(200)
   .json({message: 'Prikupljene narudzbine', orders: orders})
  })
  .catch(err => {
    console.log(err);
  });
};


