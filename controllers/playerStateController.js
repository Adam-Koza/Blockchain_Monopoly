const PlayerState = require('../models/playerStateModel');

var playerStateController = {};

// Show index list of all playerStates
playerStateController.index = function (req, res) {
  PlayerState.find().exec((err, playerStates) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.playerStates = playerStates;
      res.send(playerStates);
      //res.render('./playerState/index');
    }
  });
};

// Get a single playerState by id
playerStateController.show = function (req, res) {
  PlayerState.findOne({
    _id: req.params.id
  }).exec((err, playerState) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.playerState = playerState;
      res.send(playerState);
      // res.render('./playerState/show');
    }
  })
};

// Save a new playerState
playerStateController.save = function (req, res) {
  let newPlayerState = new PlayerState(req.body);

  newPlayerState.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new playerState.");
      // res.redirect("/player/index");
      res.send("Successfully saved new playerState.");
    }
  });
};

// Update an existing playerState
playerStateController.update = function (req, res) {
  PlayerState.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true   // returns the modified data instead of original
    },
    (err, playerState) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Updated playerState: " + playerState._id);
        res.send("Updated playerState: " + playerState._id);
        // res.redirect("/playerState/index");
      }
    }
  );
};

// Delete an existing playerState
playerStateController.delete = function (req, res) {
  PlayerState.findByIdAndDelete(
    req.params.id,
    (err, playerState) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("PlayerState deleted: \n", playerState);
        // res.redirect("/player/index");
        res.send("Deleted playerState: \n", playerState);
      }
    }
  );
}

module.exports = playerStateController;
