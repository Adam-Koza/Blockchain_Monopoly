const Game = require('../models/gameModel');

exports.create = function (req, res, next) {
    console.log(req);

    let name = req.body.slug;
    const newGame= new Game({
      name : name
    });

    newGame.save().then(() => {
        res.redirect('')
    }).catch(next)
};

exports.createTest = function (req, res, next) {
    console.log(req);

    let name = 'game controller test';
    const newGame= new Game({
      name : name
    });

    newGame.save().then(() => {
        console.log('created new test game in db');
        res.redirect('')
    }).catch(next)
};
