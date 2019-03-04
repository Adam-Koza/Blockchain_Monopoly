// Not used atm, replaced by the player model.
// Keeping this here in case we want to separate
// players from users (did that even make sense?)

// Pulls Mongoose dependency for creating schemas
const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

// User Schema
var userSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  username : {
    type : String,
    required : true
  },
  public_key : {
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
  }
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
userSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the userSchema for use elsewhere. Sets the MongoDB collection to be used as: "users"
module.exports = mongoose.model('user', userSchema);
