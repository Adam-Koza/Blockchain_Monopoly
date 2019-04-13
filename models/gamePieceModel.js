// This is the model for game pieces. We can
// have several pieces here and add them to
// a new board model

const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

var gamePieceSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  name : {
    type : String,
    required : true
  },
  number : {
    type : Number,
    required : true
  },
  description : {
    type : String
  },
  imageURL : {
    type : String
  },
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

// Sets the updated_at parameter equal to the current time
gamePieceSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the gamePieceSchema for use elsewhere. Sets the MongoDB
// collection to be used as: "gamePiece"
module.exports = mongoose.model('gamePiece', gamePieceSchema);
