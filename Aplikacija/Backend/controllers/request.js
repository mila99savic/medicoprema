const Request = require('../models/request');
const User = require('../models/user');

const { requestValidation } = require('../validation');

exports.getRequests = async (req, res, next) => {
  try{
    const req = await Request.find();//find vraca proizvod a ne kursor
    res.json(req);
    }
    catch(err){
      res.json({success: false});
    }
}

exports.addRequest = async (req, res, next) => {
  const { error } = requestValidation(req.body);
  if (error)
      return res.status(400).send(error.details[0].message);
      
        const request = new Request({
            location: req.body.location,
            date: req.body.date,
            comment: req.body.comment,
            type: req.body.type,
            vreme: req.body.vreme,
            status: req.body.status,
            korisnikid: req.body.korisnikid
        });
        // const token = jwt.sign({ _id: user._id }, process.env.TOKEN);
        try{
          const savedReq = await request.save()
          const Data = { location: savedReq.location, date: savedReq.date, comment: savedReq.comment, type:savedReq.type,vreme:savedReq.vreme, status:savedReq.status, korisnikid:savedReq.korisnikid }
          res.json({Success: true, Data});
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