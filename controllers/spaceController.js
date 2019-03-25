const Space = require('../models/gameSpaceModel');

var spaceController = {};

// Show index list of all spaces
spaceController.index = function (req, res) {
  Space.find().exec((err, spaces) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.spaces = spaces;
      res.send(spaces);
      //res.render('./space/index');
    }
  });
};

// Get a single space by id
spaceController.show = function (req, res) {
  Space.findOne({
    _id: req.params.id
  }).exec((err, space) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.space = space;
      res.send(space);
      // res.render('./space/show');
    }
  })
};

// Add a new space
spaceController.new = function (req, res) {
  // res.locals.player = {
  //   username: "",
  //   publicKey: "",
  //   balance: ""
  // };
  res.render('./board/space/new');
};

// Save a new space
spaceController.save = function (req, res) {
  let newSpace = new Space(req.body);

  newSpace.save((err) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      console.log("Successfully saved new space.");
      // res.redirect("/player/index");
      res.send("Successfully saved new space.");
    }
  });
};

// Show space info to update
spaceController.showUpdate = function (req, res) {
  Space.findOne({
    _id: req.params.id
  }).exec((err, space) => {
    if (err) {
      console.log("Error: " + err);
    }
    else {
      res.locals.space = space;
      res.render('./board/space/update');
    }
  })
};

// Update an existing space
spaceController.update = function (req, res) {
  Space.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    {
      new: true   // returns the modified data instead of original
    },
    (err, space) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Updated space: " + space._id);
        res.send("Updated space: " + space._id);
        // res.redirect("/space/index");
      }
    }
  );
};

// Delete an existing space
spaceController.delete = function (req, res) {
  Space.findByIdAndDelete(
    req.params.id,
    (err, space) => {
      if (err) {
        console.log("Error: " + err);
      }
      else {
        console.log("Space deleted: \n", space);
        // res.redirect("/player/index");
        res.send("Deleted space: \n", space);
      }
    }
  );
}

module.exports = spaceController;
