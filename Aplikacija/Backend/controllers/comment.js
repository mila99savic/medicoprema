const Product = require('../models/product');
const Comment = require('../models/comment');
const {commentValidation} = require('../validation');

exports.getComments = (req, res, next) => {
  Comment.find()//find vraca proizvod a ne kursor
    .then(comments => {
     res.status(200)
     .json({message: 'Prikupljeni komentari', comments: comments})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.addComment = (req, res, next) => {
    // const {error} = commentValidation(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    const comment = new Comment({
        content: req.body.content,
        productid: req.body.productid,
        korisnikid: req.body.korisnikid
    });
    comment.save().then(
        comment => {
            res.status(201).json({
              message: 'Uspesno kreiran komentar',
              comment: comment
            });
            Product.findById(req.body.productid).then(product => {
                return product.addComment(comment)
            })
          }).catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};

exports.deleteComment = (req, res, next) => {
  Comment.findByIdAndRemove(req.params.commId)//fja mongoosa
  .then(() => {
    res.send('Obrisano');
  })
  .catch(err => console.log(err));
} 

