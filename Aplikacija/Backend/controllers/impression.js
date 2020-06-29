const Impression = require('../models/impression');
const User =require('../models/user');

const { impressionValidation } = require('../validation');

exports.getImpressions = async (req, res, next) => {
  try{
    const impressions = await Impression.find();//find vraca proizvod a ne kursor
    res.json({Data: impressions});
    }
    catch(err){
      res.json({success: false});
    }
}

exports.createImpression = async (req, res, next) => {
  const { error } = impressionValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);

  const user = await User.findOne({name: req.body.nameKorisnika});
  // const user = await User.  
  // find({name: req.body.nameKorisnika})
    const impression = new Impression({
        content: req.body.content,
        // korisnikid: req.body.korisnikid,
        zaposlenid: req.body.zaposlenid,
        nameKorisnika: req.body.nameKorisnika,
        addressKorisnika: user.address 
    });
    try{
      const savedImp = await impression.save()
      User.findById(req.body.korisnikid).then(user => {
      res.json({Success: true,  savedImp});
        return user.addImpression(impression)
      })
    }
    catch(err){
      res.json({Success: false});
    }
};

exports.deleteImpression = async (req, res, next) => {
  const impr = await Impression.findByIdAndRemove(req.params.imprId)//fja mongoosa
  try{
    res.json({Success: true,  message:"Obrisano!"});
  } 
  catch(err){
    res.json({success: false});
  } 
}