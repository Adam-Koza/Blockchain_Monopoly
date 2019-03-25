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

// Add a new piece
pieceController.new = function (req, res) {
  res.locals.piece = {
    name: "",
    description: "",
    imageURL: ""
  };
  res.render('./board/piece/new');
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
      res.redirect("/board/piece/index");
      //res.send("Successfully saved new piece.");
    }
  });
};

// Show piece info to update
pieceController.showUpdate = function (req, res) {
  Piece.findOne({
    _id: req.params.id
  }).exec((err, piece) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.piece = piece;
      res.render('./board/piece/update');
    }
  })
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
        //res.send("Updated piece: " + piece._id);
        res.redirect("/board/piece/index");
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
        res.redirect("/board/piece/index");
        //res.send("Deleted piece: \n", piece);
      }
    }
  );
}

module.exports = pieceController;
