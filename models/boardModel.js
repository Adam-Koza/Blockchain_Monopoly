// This is the model for the game board. The 'game board'
// contains all the board information: names of places,
// values, rent, type, etc. We can have different boards
// for example a UK version, US, Special editions, etc...

const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

var boardSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  name : {
    type : String,
    required : true
  },
  pieces : [{
    type : Schema.Types.ObjectId,
    ref : 'gamePiece'
  }],
  // TODO: add game board properties here
  slug : {
    type : String,
    slug : 'name'
  },
  created_at : {
    type : Date,
    default : Date.now
  },
  updated_at : {
    type : Date,
    default : Date.now
  }
});

// TODO: add function to check if a new game board satisfies all reqs

// Sets the updated_at parameter equal to the current time
boardSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the boardSchema for use elsewhere. Sets the MongoDB collection to be used as: "board"
module.exports = mongoose.model('board', boardSchema);
