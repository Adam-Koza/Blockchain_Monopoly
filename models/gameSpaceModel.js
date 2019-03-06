// This is the model for game spaces. We can
// have several pieces here and add them to
// a new board model


const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

var gameSpaceSchema = new Schema({
  _id : {
    type : Schema.Types.ObjectId,
    auto : true
  },
  position : {
    type : Number,
    required : true
  },
  type : {
    type : Number,
    required : true
  },
        // 0 = Go
        // 1 = Property
        // 2 = Community Chest
        // 3 = Tax
        // 4 = Railroad
        // 5 = Chance
        // 6 = Jail
        // 7 = Utility
        // 8 = Free Parking
        // 9 = Go To Jail
  name : {
    type : String,
    required : true
  },
  imageURL : {
    type : String
  },
  color : {
    type : String
  },
  cost : {
    type : Number
  },
  rent : {
    type : Number
  },
  one_house : {
    type : Number
  },
  two_house : {
    type : Number
  },
  three_house : {
    type : Number
  },
  four_house : {
    type : Number
  },
  hotel : {
    type : Number
  },
  mortgage_value : {
    type : Number
  },
  building_cost : {
    type : Number
  },
  set : {
    type : Array
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
gameSpaceSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if(!this.created_at) {
        this.created_at = now
    }
    next();
});

// Exports the gameSpaceSchema for use elsewhere. Sets the MongoDB
// collection to be used as: "gameSpace"
module.exports = mongoose.model('gameSpace', gameSpaceSchema);




  //       board[0] = 0; // "Go"
  //       board[1] = 1; // "Property"
  //       propertyInfo[1] = Property({name: "Mediterranean Avenue",
  //           color: "Purple", cost: 60, rent: 2, oneHouse_rent: 10,
  //           twoHouse_rent: 30, threeHouse_rent: 90, fourHouse_rent: 160,
  //           hotel_rent: 250, mortgage_value: 30, building_cost: 50, 
  //           set: [3, 0]
  //       });
  //       board[2] = 2; // "Community Chest"
  //       board[3] = 1; // "Property"
  //       propertyInfo[3] = Property({name: "Baltic Avenue",
  //           color: "Purple", cost: 60, rent: 4, oneHouse_rent: 20,
  //           twoHouse_rent: 60, threeHouse_rent: 180, fourHouse_rent: 320,
  //           hotel_rent: 450, mortgage_value: 30, building_cost: 50,
  //           set: [1, 0]
  //       });
  //       board[4] = 3; // "Tax"
  //       taxInfo[4] = Tax({name: "Income Tax",
  //           cost: 200
  //       });
  //       board[5] = 4; // "Railroad"
  //       railroadInfo[5] = Railroad({name: "Reading Railroad",
  //           cost: 200, mortgage_value: 100, set: [15, 25, 35]
  //       });