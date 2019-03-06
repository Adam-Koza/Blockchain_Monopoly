const Player = require('../models/playerModel');

var playerController = {};

// Show index list of all players
playerController.index = function (req, res) {
  Player.find().exec((err, players) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.players = players;
      res.render('players/index');
    }
  });
};

// Get a single player by slug
playerController.showSlug = function (req, res) {
  Player.findOne({
    slug: req.params.slug
  }).exec((err, player) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.player = player;
      res.render('players/show')
    }
  })
};

// Get a single player by id
playerController.show = function (req, res) {
  Player.findOne({
    _id: req.params.id
  }).exec((err, player) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.player = player;
      res.render('players/show')
    }
  })
};

// Create a new player
// initialize empty and redirect
playerController.new = function (req, res) {
  res.render('players/new');
};

// Save a new player
playerController.save = function (req, res) {
  let newPlayer = new Player(req.body);

  newPlayer.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new player.");
      res.redirect("/players/index");
    }
  });
};

// Update an existing player
playerController.update = function (req, res) {
  Player.findByIdAndUpdate(
    req.params.id,
    {
      $set: {req.params.body}
    },
    {
      new: true
    },
    (err, player) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        res.redirect("/players/show/" + player._id);
      }
    }
  );
};

// Delete an existing player
playerController.delete = function (req, res) {
  Player.findByIdAndDelete(
    req.params.id,
    (err, player) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Player deleted: \n", player);
        res.redirect("/players");
      }
    }
  );
}

module.exports = playerController;
