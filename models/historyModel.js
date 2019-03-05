// This is the model for the history of a game.

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
  moves : [{
    type : Schema.Types.ObjectId,
    ref : 'move'
  }], // Note: array of moves
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
