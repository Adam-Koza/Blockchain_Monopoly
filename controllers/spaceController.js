const Space = require('../models/gameSpaceModel');

var spaceController = {};

// Show index list of all boards
spaceController.index = function (req, res) {
  Space.find().exec((err, players) => {
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

module.exports = spaceController;
