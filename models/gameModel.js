// This is the model for games.
// A 'game' represents an instance of
// a monopoly game.


const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

let gameSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  name : {
    type: String,
    required: true
  },
  owner : {
    type : Schema.Types.ObjectId,
    ref : 'player'
  },
  players : [{
    type : Schema.Types.ObjectId,
    ref : 'player'
  }], // Note: array of players
  slug: {
    type: String,
    slug: 'name'
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
gameSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the gameSchema for use elsewhere. Sets the MongoDB collection to be used as: "games"
module.exports = mongoose.model('game', gameSchema);
