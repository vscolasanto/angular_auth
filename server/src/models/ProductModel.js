const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductModel = new Schema({
  name: String,
  department: String,
  price: Number,
});

module.exports = mongoose.model('Product', ProductModel);
