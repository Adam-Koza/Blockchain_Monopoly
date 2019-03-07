// This is the model for the game state.

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

let gameStateSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  game : {
    type : Schema.Types.ObjectId,
    ref : 'game'
  },
  started : {
    type : Boolean,
    required : true
  },
  ended : {
    type : Boolean,
    required : true
  },
  numPlayers : {  // TODO: this info is in the 'game' schema
    type : Number,
    required : false
  },
  dice1 : {
    type : Number,
    required : true
  },
  dice2 : {
    type : Number,
    required : true
  },
  turn : {  // TODO: this info is in the 'move' schema
    type : Number,
    required : true
  },
  middlePot : {
    type : Number,
    required : true // Can be zero but required
  },
  chanceJailFreeHeld : {
    type : Boolean,
    required : true // Can be zero but required
  },
  communityChestJailFreeHeld : {
    type : Boolean,
    required : true // Can be zero but required
  },
  chanceDeck : {
    type : Array,
    required : true // Can be zero but required
  },
  communityChestDeck : {
    type : Array,
    required : true // Can be zero but required
  },
  chanceDrawCount : {
    type : Number,
    required : true // Can be zero but required
  },
  communityChestDrawCount : {
    type : Number,
    required : true // Can be zero but required
  },
  stateHistory : [{
    type : Schema.Types.ObjectId,
    ref : 'gameState'
  }],
  playerStates : [{
    type : Schema.Types.ObjectId,
    ref : 'playerState'
  }],
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
gameStateSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the gameStateSchema for use elsewhere. Sets the MongoDB
// collection to be used as: "gameState"
module.exports = mongoose.model('gameState', gameStateSchema);
