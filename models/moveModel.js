// This is the model for a game move. We can store
// the hash here and use it for the game history

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let moveSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  game_id : {
    type : Schema.Types.ObjectId,
    ref : 'game'
  },
  turn : {
    type: Number,
    required: true
  },
  player : {
    type : Schema.Types.ObjectId,
    ref : 'player'
  },
  move_hash : {
    type : String,
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

// TODO: add function to hash move and save move_hash

// Sets the updated_at parameter equal to the current time
moveSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the moveSchema for use elsewhere. Sets the MongoDB collection
// to be used as: "move"
module.exports = mongoose.model('move', moveSchema);
