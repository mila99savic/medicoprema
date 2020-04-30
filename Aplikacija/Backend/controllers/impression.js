const Impression = require('../models/impression');
const User =require('../models/user');

const { impressionValidation } = require('../validation');

exports.getImpressions = (req, res, next) => {
    Impression.find()//find vraca proizvod a ne kursor
    .then(impressions => {
     res.status(200)
     .json({message: 'Prikupljeni utisci', impressions: impressions})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.createImpression = (req, res, next) => {
  const { error } = impressionValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);

    const impression = new Impression({
        content: req.body.content,
        korisnikid: req.body.korisnikid,
        zaposlenid: req.body.zaposlenid
    });
    impression.save().then(
        impression => {
            res.status(201).json({
              message: 'Uspesno kreiran utisak',
              impression: impression
            });
            User.findById(req.body.korisnikid).then(user => {
                return user.addImpression(impression)
            })
          }).catch(err => {
            if (!err.statusCode) {
              err.statusCode = 500;
            }
            next(err);
          });
};

exports.deleteImpression = (req, res, next) => {
    Impression.findByIdAndRemove(req.params.imprId)//fja mongoosa
    .then(() => {
      res.send('Obrisano');
    })
    .catch(err => console.log(err));
}