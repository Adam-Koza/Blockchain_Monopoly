// This controller has the logic to create or update boards
// along with game pieces and game spaces

const Board = require('../models/boardModel');

var boardController = {};

// Show index list of all boards
boardController.index = function (req, res) {
  Board.find().exec((err, players) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.boards = boards;
      res.send(boards);
      //res.render('./board/index');
    }
  });
};

// Get a single board by id
boardController.show = function (req, res) {
  Board.findOne({
    _id: req.params.id
  }).exec((err, player) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.board = board;
      res.send(board);
      // res.render('./board/show');
    }
  })
};

// Save a new board
boardController.save = function (req, res) {
  let newBoard = new Board(req.body);

  newBoard.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new board.");
      // res.redirect("/player/index");
      res.send("Successfully saved new board.");
    }
  });
};

// Update an existing board
boardController.update = function (req, res) {
  Board.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true   // returns the modified data instead of original
    },
    (err, board) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Updated board: " + board._id);
        res.redirect("/board/index");
      }
    }
  );
};

// Delete an existing board
boardController.delete = function (req, res) {
  Board.findByIdAndDelete(
    req.params.id,
    (err, board) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Board deleted: \n", board);
        // res.redirect("/player/index");
        res.send("Deleted board: \n", board);
      }
    }
  );
}

module.exports = boardController;
