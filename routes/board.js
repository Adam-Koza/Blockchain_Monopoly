var express = require('express');
var router = express.Router();
var boardController = require('../controllers/boardController');
var pieceController = require('../controllers/pieceController');
var spaceController = require('../controllers/spaceController');

//--------------
// Game Pieces
//--------------

// Display all pieces
router.get('/piece/index', pieceController.index);

// Display piece by id
router.get('/piece/index/:id', pieceController.show);

// Saving a new piece
router.post('/piece/save', pieceController.save);

// Update an existing piece
router.post('/piece/update/:id', pieceController.update);

// Delete an existing piece
router.get('/piece/delete/:id', pieceController.delete);


//--------------
// Game Spaces
//--------------

// Display all spaces
router.get('/space/index', spaceController.index);

// Display space by id
router.get('/space/index/:id', spaceController.show);

// Saving a new space
router.post('/space/save', spaceController.save);

// Update an existing space
router.post('/space/update/:id', spaceController.update);

// Delete an existing space
router.get('/space/delete/:id', spaceController.delete);


//--------------
// Game Boards
//--------------

// Display all boards
router.get('/index', boardController.index);

// Display board by id
router.get('/index/:id', boardController.show);

// Saving a new board
router.post('/save', boardController.save);

// Update an existing board
router.post('/update/:id', boardController.update);

// Delete an existing board
router.get('/delete/:id', boardController.delete);

module.exports = router;
