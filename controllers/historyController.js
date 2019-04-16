// This is to add to the game history after a game has ended
const History = require('../models/historyModel');

var historyController = {};

// Show index list of all previous games
historyController.index = function (req, res) {
  History.find().exec((err, history) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.history = history;
      res.render('./history/index');
    }
  });
};

// Show leaderboard - index of top players
historyController.leaderboard = function (req, res) {
  History.find().exec((err, history) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.history = history;
      res.render('./history/leaderboard');
    }
  });
};

// Get a single history by id
historyController.show = function (req, res) {
  History.findOne({
    _id: req.params.id
  }).exec((err, history) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.history = history;
      res.render('./history/show');
    }
  })
};

// Show history info to update
historyController.showUpdate = function (req, res) {
  History.findOne({
    _id: req.params.id
  }).exec((err, player) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.history = history;
      res.render('./history/update');
    }
  })
};

// Create a new game history
// initialize empty and redirect
historyController.new = function (req, res) {
  res.locals.title = "New History";
  res.locals.history = {
    username: "",
    publicKey: "",
    balance: ""
  };
  res.render('./history/new');
};

// Save a new game
historyController.save = function (req, res) {
  let newGame = new History(req.body);
  newGame.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new game history.");
      res.redirect("/history/index");
    }
  });
};

// Update an existing game
historyController.update = function (req, res) {
  History.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true   // returns the modified data instead of original
    },
    (err, history) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Updated history: " + history._id);
        res.redirect("/history/index");
      }
    }
  );
};


// Delete an existing game
historyController.delete = function (req, res) {
  History.findByIdAndDelete(
    req.params.id,
    (err, history) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("History deleted: \n", history);
        res.redirect("/history/index");
      }
    }
  );
}

module.exports = historyController;
