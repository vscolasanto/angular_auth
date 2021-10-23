const ProductModel = require('../models/ProductModel');
const ProducModel = require('../models/ProductModel');

module.exports = {
  all: function(req, res) {
    ProductModel.find({}).lean().exec(function(err, products) {
      if (err) {
        return res.json(err);
      }
      return res.json(products);
    });
  }
}
