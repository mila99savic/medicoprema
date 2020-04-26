const Task = require('../models/task');
const User = require('../models/user')

exports.getTasks = (req, res, next) => {
    Task.find()//find vraca proizvod a ne kursor
        .then(tasks => {
            res.status(200)
                .json({ message: 'Prikupljene obaveze', tasks: tasks })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.getTasksByUserId = (req, res, next) => {
    User.findById(req.params.zaposleniId).then(user => {
        res.status(200)
            .json({ 
                message: 'Prikupljene obaveze za korisnika', 
                tasks: user.listoftasks })
    }).catch(err => {
        console.log(err);
    })
}

exports.addTask = (req, res, next) => {
    const task = new Task({
        location: req.body.location,
        date: req.body.date,
        task: req.body.task,
        type: req.body.type,
        korisnikid: req.body.korisnikid
    });
    task.save().then(resut => {
        res.send('Kreirana je obaveza(zakazivanje)')
    }).catch(err => {
        console.log(err);
    });
}

exports.assignTask = (req, res, next) => {
    const task = new Task({
        location: req.body.location,
        date: req.body.date,
        comment: req.body.comment,
        type: req.body.type,
        korisnikid: req.body.korisnikid,
        zaposleniId: req.params.zaposleniId
    });
    task.save().then(
        task => {
            res.status(201).json({
                message: 'Kreirana je obaveza(zakazivanje) i dodeljena zaposlenom',
                task: task
            });
            User.findById(req.params.zaposleniId).then(zaposlen => {
                return zaposlen.addTask(task)
            })
        }).catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}