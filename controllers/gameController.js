const Game = require('../models/gameModel');

exports.create = function (req, res, next) {
    console.log(req);

    let name = req.body.slug;
    const newGame= new Game({
      name : name
    });

    newGame.save().then(() => {
        res.redirect('index')
    }).catch(next)
};

exports.createTest = function (req, res, next) {
    console.log(req);

    let name = 'game controller test';
    const newGame= new Game({
      name : name
    });

    newGame.save().then(() => {
        res.redirect('index')
    }).catch(next)
};
