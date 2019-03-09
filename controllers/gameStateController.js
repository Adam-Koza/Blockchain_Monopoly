const GameState = require('../models/gameStateModel');

var gameStateController = {};

// Show index list of all gameStates
gameStateController.index = function (req, res) {
  GameState.find().exec((err, gameStates) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.gameStates = gameStates;
      res.send(gameStates);
      //res.render('./gameState/index');
    }
  });
};

// Get a single gameState by id
gameStateController.show = function (req, res) {
  GameState.findOne({
    _id: req.params.id
  }).exec((err, gameState) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.gameState = gameState;
      res.send(gameState);
      // res.render('./gameState/show');
    }
  })
};

// Save a new gameState
gameStateController.save = function (req, res) {
  let newGameState = new GameState(req.body);

  newGameState.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new gameState.");
      // res.redirect("/player/index");
      res.send("Successfully saved new gameState.");
    }
  });
};

// Update an existing gameState
gameStateController.update = function (req, res) {
  GameState.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true   // returns the modified data instead of original
    },
    (err, gameState) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Updated gameState: " + gameState._id);
        res.send("Updated gameState: " + gameState._id);
        // res.redirect("/gameState/index");
      }
    }
  );
};

// Delete an existing gameState
gameStateController.delete = function (req, res) {
  GameState.findByIdAndDelete(
    req.params.id,
    (err, gameState) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("GameState deleted: \n", gameState);
        // res.redirect("/player/index");
        res.send("Deleted gameState: \n", gameState);
      }
    }
  );
}

module.exports = gameStateController;
