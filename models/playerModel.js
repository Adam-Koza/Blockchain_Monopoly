// This is the model for players. Players are
// users that are using the dapp and playing the games.
// To be listed as a player the user has to buy
// Monopoly Tokens. The first time a user buys Tokens
// they should become listed as a player (essentially
// acts like a sign-up)


// Pulls Mongoose dependency for creating schemas
const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

// Player Schema
var playerSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  username : {
    type : String,
    required : true
  },
  publicKey : {
    type : String,
    required : true
  },
  balance : {
    type : Number,
    required : true
  },
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

// Sets the updated_at parameter equal to the current time
playerSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the playerSchema for use elsewhere. Sets the MongoDB collection to be used as: "players"
module.exports = mongoose.model('player', playerSchema);
