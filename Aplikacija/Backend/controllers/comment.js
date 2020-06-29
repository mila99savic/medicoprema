const Product = require('../models/product');
const Comment = require('../models/comment');
const { commentValidation } = require('../validation');

exports.getComments = async (req, res, next) => {
  try{
    const comments = await Comment.find();//find vraca proizvod a ne kursor
    Data = {content: comments.content,nameProduct:comments.nameProduct, korisnikid:comments.korisnikid, date: comments.date}
    res.json({Data:comments});
    }
    catch(err){
      res.json({Success: false});
    }
}

exports.addComment = async (req, res, next) => {
  const { error } = commentValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const product = await Product.findOne({title: req.body.nameProduct});  
  const comment = new Comment({
    content: req.body.content,
    nameProduct: req.body.nameProduct,
    // productid: req.body.productid,
    korisnikid: req.body.korisnikid
  });
  
    try{
      if(product != undefined){
          const savedComm = await comment.save()
          Product.findById(req.body.productid).then(product => {
          res.json({Success: true, savedComm});
          return product.addComment(comment)
        })
      }
        else
          res.json({Data:"Proizvod ne postoji"})
    }
  catch(err){
    res.json({Success: false});
  }
};

exports.deleteComment = async (req, res, next) => {
  const comm = await Comment.findByIdAndRemove(req.params.commId)//fja mongoosa
  try{
    res.json({Success: true,  message:"Obrisano!"});
  } 
  catch(err){
    res.json({success: false});
  } 
}

