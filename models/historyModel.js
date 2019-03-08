// This is the model for game history. It currently
// contains a list of all the past games that have ended.
// Could be improved to contain the current (last) game
// state for games that have either ended or are in progress

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let historySchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  game : {
    type : Schema.Types.ObjectId,
    ref : 'game'
  },
  lastGameState : {
    type : Schema.Types.ObjectId,
    ref : 'gameState'
  },
  winner : {
    type : Schema.Types.ObjectId,
    ref : 'player'
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

// Sets the updated_at parameter equal to the current time
historySchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the historySchema for use elsewhere. Sets the MongoDB
// collection to be used as: "history"
module.exports = mongoose.model('history', historySchema);
