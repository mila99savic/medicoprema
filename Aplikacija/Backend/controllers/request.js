const Request = require('../models/request');
const User = require('../models/user');

const { requestValidation } = require('../validation');

exports.getRequests = async (req, res, next) => {
  try{
    const req = await Request.find();//find vraca proizvod a ne kursor
    res.json({Data:req});
    }
    catch(err){
      res.json({success: false});
    }
}

exports.getByUserId = async (req, res) => {
  try{
    const user = await User.findById(req.params.userId)
    //Request.findById(req.params.reqId)
    //Data = {name: user.name, lastname: user.lastname, address: user.address, email: user.email, password: user.password, number: user.number}
    res.json({ Data:user.listofrequests, Success: true })
  }
  catch(err){
    res.json({ Success: false });
    console.log(err);
  }
}

exports.addRequest = async (req, res, next) => {
  const { error } = requestValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);
      const user = await User.findById(req.body.korisnikid);
      const ime = user.name;
        const request = new Request({
            location: req.body.location,
            date: req.body.date,
            comment: req.body.comment,
            time: req.body.time,
            type: req.body.type,
            status: req.body.status,
            korisnikid: req.body.korisnikid,
            korIme: ime
        });
        try{
          
          const savedReq = await request.save();
          // const user = await User.findById(req.body.korisnikid)
          user.addReq(request)
          
          res.json({Success: true,  savedReq});
        }
        catch(err){
          res.json({Success: false, message: err});
        }
}

exports.deleteRequest = async (req, res, next) => {
  const request = await Request.findByIdAndRemove(req.params.reqId)//fja mongoosa
  try{
    res.json({Success: true,  message:"Obrisano!"});
  } 
  catch(err){
    res.json({success: false});
  }
  } 