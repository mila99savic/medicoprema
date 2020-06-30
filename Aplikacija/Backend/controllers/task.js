const Task = require('../models/task');
const User = require('../models/user');
const Request = require('../models/request')

const { taskValidation } = require('../validation');
const task = require('../models/task');

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()//find vraca proizvod a ne kursor
        console.log(tasks);
        res.status(200)
            .json({ message: 'Prikupljene obaveze', tasks: tasks })
    }
    catch (err) {
        res.json({ success: false });
        console.log(err);
    }
}

exports.getTasksByUserId = async (req, res, next) => {
    try {
        const tasks = await Task.find({zaposleniId: req.params.zaposleniId})

        res.status(200)
            .json({ 
                Data: tasks,
                Success: true
            })
    }
    catch (err) {
        res.json({ Success: false });
        console.log(err);
    }
}

exports.addTask = async (req, res, next) => {
    const { error } = taskValidation(req.body);
    if (error)
        return res.status(400).send(error.details[0].message);

    const task = new Task({
        location: req.body.location,
        date: req.body.date,
        comment: req.body.comm,
        type: req.body.type,
        korisnikid: req.body.korisnikid,
        numberKorisnika: req.body.num
    });
    try {
        const savedTask = await task.save();
        res.json({ Success: true, savedTask });
    }
    catch (err) {
        res.json({ success: false });
        console.log(err);
    }
}

exports.assignTask = async (req, res, next) => {
    // const kor = await User.findById(req.body.korisnikid);
    const task = new Task({
        location: req.body.location,
        date: req.body.date,
        comment: req.body.comment,
        type: req.body.type,
        time: req.body.time,
        // korisnikid: req.body.korisnikid,
        numberKorisnika: req.body.numberKorisnika,
        zaposleniId: req.body.zaposleniId,
        requestId: req.body.requestId
    });
    try {
        const savedTask = await task.save()
        Request.findById(req.body.requestId)
        .then(requ => {
            requ.status = "potvrdjen";
            // console.log(requ)
            return requ.save()
        })
        User.findById(req.body.zaposleniId)
        .then(zaposlen => {
            return zaposlen.addTask(task)
        })
        
        res.status(201).json({
            Success: true
        });
    }
    catch (err) {
        res.json({ success: false });
        console.log(err);
    }
}


exports.deleteTask = async (req, res, next) => {
    const task = await Task.findByIdAndRemove(req.params.taskId)
    try {
      res.json({ Success: true, message: "Obrisano!" });
    }
    catch (err) {
      res.json({ Success: false });
      console.log(err);
    }
  }