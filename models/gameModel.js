const slug = require('mongoose-slug-generator');
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.plugin(slug);

let gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    slug: 'name'
  }
});

let gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;
