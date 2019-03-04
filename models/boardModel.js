// This is the model for the game board. The 'game board'
// contains all the board information: names of places,
// values, rent, type, etc. We can have different boards
// for example a UK version, US, Special editions, etc...

const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

var gameBoardSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  // TODO: add game board properties here
  slug : {
    type : String,
    slug : 'username'
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
gameBoardSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the gameBoardSchema for use elsewhere. Sets the MongoDB collection to be used as: "gameBoard"
module.exports = mongoose.model('gameBoard', gameBoardSchema);
