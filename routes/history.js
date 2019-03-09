var express = require('express');
var router = express.Router();
var historyController = require('../controllers/historyController');

// Display all game history
router.get('/index', historyController.index);

// Display game history by id
router.get('/index/:id', historyController.show);

// Create new game history page
// creating new game history should be done automatically
// no reason to call this route. testing only
router.get('/new', historyController.new);

// Saving a new game history
router.post('/save', historyController.save);

//------
// Everything below is for testing purposes,
// we shouldn't be changing any game history
// as it will be recorded on the blockchain
//-------

// Update an existing game history
router.get('/update/:id', historyController.showUpdate);
router.post('/update/:id', historyController.update);

// Delete an existing game history
router.get('/delete/:id', historyController.delete);

module.exports = router;
