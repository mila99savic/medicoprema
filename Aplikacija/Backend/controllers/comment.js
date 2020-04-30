const Product = require('../models/product');
const Comment = require('../models/comment');
const { commentValidation } = require('../validation');

exports.getComments = async (req, res, next) => {
  try{
    const comments = await Comment.find();//find vraca proizvod a ne kursor
    res.json(comments);
    }
    catch(err){
      res.json({success: false});
    }
}

exports.addComment = async (req, res, next) => {
  const { error } = commentValidation(req.body);
  if (error)
    return res.status(400).send(error.details[0].message);

  const comment = new Comment({
    content: req.body.content,
    productid: req.body.productid,
    korisnikid: req.body.korisnikid
  });
  try{
    const savedComm = await comment.save()
    res.json({Success: true,  savedComm});
    Product.findById(req.body.productid).then(product => {
      return product.addComment(comment)
    })
  }
  catch(err){
    res.json({success: false});
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

