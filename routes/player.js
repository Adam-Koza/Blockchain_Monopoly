var express = require('express');
var router = express.Router();
var playerController = require('../controllers/playerController');

// router.get('/', function(req, res, next) {
//   res.render('./player/index', { title: 'Display all players:' });
// });

// Display all players
router.get('/index', playerController.index);

// Display player by id
router.get('/index/:id', playerController.show);

// Create new player page
// creating new player should be done automatically
// no reason to call this route. testing only
router.get('/new', playerController.new);

// Saving a new player
router.post('/save', playerController.save);

// Update an existing player
router.get('/update/:id', playerController.showUpdate);
router.post('/update/:id', playerController.update);

// Delete an existing player
router.get('/delete/:id', playerController.delete);

module.exports = router;
