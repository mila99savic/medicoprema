const Product = require('../models/product');
const { productValidation } = require('../validation');


exports.getProducts = async (req, res, next) => {
  try{
  const products = await Product.find();//find vraca proizvod a ne kursor
  res.json(products);
  }
  catch(err){
    res.json({success: false});
  }
};

exports.postAddProduct = async (req, res, next) => {
  const { error } = productValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);

  const product = new Product({//ovo je js object
    title: req.body.title, 
    price: req.body.price, 
    imageUrl: req.body.imageUrl, 
    description: req.body.description,
    //userId: req.user //nama treba samo _id, mongoose to automatksi izvlaci
    //a moze i _id
  });
  try{
    const proizvod = await product.save();
    res.json({Success: true,  proizvod});
  }
  catch(err){
    res.json({Success: false});
  }
};

exports.editProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;

  const product = await Product.findById(prodId)
  try{
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    const savedProduct = await product.save();
    res.json({Success: true,  savedProduct});
  }
  catch(err){
    res.json({success: false});
  }
};

exports.deleteProduct = async (req, res, next) => {
  const prod = await Product.findByIdAndRemove(req.body.productId)//fja mongoosa
  try{
    res.json({Success: true,  message:"Obrisano!"});
  } 
  catch(err){
    res.json({success: false});
  } 
};

