const Task = require('../models/task');
const User = require('../models/user');

const { taskValidation } = require('../validation');

exports.getTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find()//find vraca proizvod a ne kursor
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
        const user = await User.findById(req.params.zaposleniId)
        //const kor = await User.findById(user.listoftasks.korisnikid)
        console.log(user.listoftasks.tasks)
        res.status(200)
            .json({ 
                Data: user.listoftasks,
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
    const task = new Task({
        location: req.body.location,
        date: req.body.date,
        comment: req.body.comment,
        type: req.body.type,
        korisnikid: req.body.korisnikid,
        numberKorisnika: req.body.num,
        zaposleniId: req.params.zaposleniId
    });
    try {
        User.findById(req.params.zaposleniId).then(zaposlen => {
            return zaposlen.addTask(task)
        })
        
        res.status(201).json({
            message: 'Dodeljena je obaveza(zakazivanje) i dodeljena zaposlenom',
            task: task
        });
    }
    catch (err) {
        res.json({ success: false });
        console.log(err);
    }
}