const Piece = require('../models/gamePieceModel');

var pieceController = {};

// Show index list of all pieces
pieceController.index = function (req, res) {
  Piece.find().exec((err, pieces) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.pieces = pieces;
      //res.send(pieces);
      res.render('./board/piece/index');
    }
  });
};

// Get a single board by id
pieceController.show = function (req, res) {
  Piece.findOne({
    _id: req.params.id
  }).exec((err, piece) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.piece = piece;
      res.send(piece);
      // res.render('./board/show');
    }
  })
};

// Save a new piece
pieceController.save = function (req, res) {
  let newPiece = new Piece(req.body);

  newPiece.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new piece.");
      // res.redirect("/player/index");
      res.send("Successfully saved new piece.");
    }
  });
};

// Update an existing piece
pieceController.update = function (req, res) {
  Piece.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true   // returns the modified data instead of original
    },
    (err, piece) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Updated piece: " + piece._id);
        res.send("Updated piece: " + piece._id);
        // res.redirect("/piece/index");
      }
    }
  );
};

// Delete an existing piece
pieceController.delete = function (req, res) {
  Piece.findByIdAndDelete(
    req.params.id,
    (err, piece) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Piece deleted: \n", piece);
        // res.redirect("/player/index");
        res.send("Deleted piece: \n", piece);
      }
    }
  );
}

module.exports = pieceController;
