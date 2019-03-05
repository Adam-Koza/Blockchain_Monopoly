// This is the model for the player state.

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let playerStateSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  game : {
    type : Schema.Types.ObjectId,
    ref : 'game'
  },
  player : {
    type : Schema.Types.ObjectId,
    ref : 'player'
  },
  piece : {
    type : Schema.Types.ObjectId,
    ref : 'gamePiece'
  },
  balance : {
    type : Number
  },
  position : {
    type : Number
  },
  doublesRolled : {
    type : Number
  },
  assetValue : {
    type : Number
  },
  totalValue : {
    type : Number
  },
  getOutOfJailFree : {
    type : Number
  },
  solvent : {
    type : Boolean
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

// TODO: functions to check that the state meets all the reqs

// Sets the updated_at parameter equal to the current time
playerStateSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the playerStateSchema for use elsewhere. Sets the MongoDB
// collection to be used as: "playerState"
module.exports = mongoose.model('playerState', playerStateSchema);
