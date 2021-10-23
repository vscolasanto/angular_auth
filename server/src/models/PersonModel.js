const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: String,
  email: String,
  company: String,
  country: String,
});

module.exports = mongoose.model('Person', PersonSchema);
