const Request = require('../models/request');
const User = require('../models/user');

const { requestValidation } = require('../validation');

exports.getRequests = (req, res, next) => {
    Request.find()//find vraca proizvod a ne kursor
    .then(requests => {
     res.status(200)
     .json({message: 'Prikupljeni komentari', requests: requests})
    })
    .catch(err => {
      console.log(err);
    });
}

exports.addRequest = (req, res, next) => {
  const { error } = requestValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);
      
        const request = new Request({
            location: req.body.location,
            date: req.body.date,
            comment: req.body.comment,
            type: req.body.type,
            status: req.body.status,
            korisnikid: req.body.korisnikid
        });
        request.save().then(resut => {
            res.send('Kreirana je zahtev(za zakazivanje)')
        }).catch(err => {
            console.log(err);
        })
}

exports.deleteRequest = (req, res, next) => {
    Request.findByIdAndRemove(req.params.reqId)//fja mongoosa
    .then(() => {
      res.send('Obrisano');
    })
    .catch(err => console.log(err));
  } 