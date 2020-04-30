const Product = require('../models/product');

const { productValidation } = require('../validation');

// exports.getAddProduct = (req, res, next) => {
//   res.render('admin/edit-product', {
//     pageTitle: 'Add Product',
//     path: '/admin/add-product',
//     editing: false,
//     isAuthenticated: req.session.isLoggedIn
//   });
// };

exports.getProducts = (req, res, next) => {
  Product.find()//find vraca proizvod a ne kursor
    .then(products => {
     res.json({message: 'Prikupljeni proizvodi', products: products})
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { error } = productValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);

  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({//ovo je js object
    title: title, 
    price: price, 
    imageUrl: imageUrl, 
    description: description,
    //userId: req.user //nama treba samo _id, mongoose to automatksi izvlaci
    //a moze i _id
  });
  //ovde red nije bitan
  //levo je iz scheme, a desno su podavi koje dobijamo iz fje
  product
    .save()//metod od mongoos-a
    .then(result => {
      // console.log(result);
      res.send('Kreiran proizvod')
    })
    .catch(err => {
      console.log(err);
    });
};

// exports.getEditProduct = (req, res, next) => {
//   const editMode = req.query.edit;
//   if (!editMode) {
//     return res.redirect('/');
//   }
//   const prodId = req.params.productId;
//   Product.findById(prodId)
//     // Product.findById(prodId)
//     .then(product => {
//       if (!product) {
//         return res.redirect('/');
//       }
//       res.render('admin/edit-product', {
//         pageTitle: 'Edit Product',
//         path: '/admin/edit-product',
//         editing: editMode,
//         product: product,
//         isAuthenticated: req.session.isLoggedIn
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.editProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  Product.findById(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product//ovo je mongoose object
      .save()//radi i apdejt
  })
    .then(result => {
      res.send('Apdejtovano')
    })
    .catch(err => console.log(err));
};

// exports.getProducts = (req, res, next) => {
//   Product.find()
//   //select('title price -_id) to se na stranici prikazuje
//   //.populate('userId', 'name') - izvlaci ne samo id vec sve informacije
//   //svi podaci u jednom koraku a ne preko querija
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         pageTitle: 'Admin Products',
//         path: '/admin/products',
//         //isAuthenticated: req.session.isLoggedIn
//       });
//     })
//     .catch(err => console.log(err));
// };

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)//fja mongoosa
    .then(() => {
      res.send('Obrisano');
    })
    .catch(err => console.log(err));
};

