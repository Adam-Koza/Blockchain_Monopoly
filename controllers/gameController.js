const Game = require('../models/gameModel');

var gameController = {};

// A random test to see if the controller, routes, mongodb works
// for inserting a new record
gameController.createTest = function (req, res, next) {
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

// Creating a new game
gameController.save = function (req, res, next) {
  let newGame = new Game(req.body);

  newGame.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new player.");
      //res.redirect("/player/index");
      //res.send("Succesffully saved new player.");
    }
  });
};

module.exports = gameController;

// Adding a new player to a game

// Start a game
