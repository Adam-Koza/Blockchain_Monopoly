var express = require('express');
var router = express.Router();
var gameStateController = require('../controllers/gameStateController');
var playerStateController = require('../controllers/playerStateController');


//--------------
// Game State
//--------------

// Display all gameStates
router.get('/gameState/index', gameStateController.index);

// Display gameState by id
router.get('/gameState/index/:id', gameStateController.show);

// Saving a new gameState
router.post('/gameState/save', gameStateController.save);

// Update an existing gameState
router.post('/gameState/update/:id', gameStateController.update);

// Delete an existing gameState
router.get('/gameState/delete/:id', gameStateController.delete);


//--------------
// Player State
//--------------

// Display all playerStates
router.get('/playerState/index', playerStateController.index);

// Display playerState by id
router.get('/playerState/index/:id', playerStateController.show);

// Saving a new playerState
router.post('/playerState/save', playerStateController.save);

// Update an existing playerState
router.post('/playerState/update/:id', playerStateController.update);

// Delete an existing playerState
router.get('/playerState/delete/:id', playerStateController.delete);


module.exports = router;
