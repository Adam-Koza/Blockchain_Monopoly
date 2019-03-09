const Piece = require('../models/gamePieceModel');

var pieceController = {};

// Show index list of all boards
pieceController.index = function (req, res) {
  Piece.find().exec((err, players) => {
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

module.exports = pieceController;
