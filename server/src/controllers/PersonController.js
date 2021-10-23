const PersonModel = require('../models/PersonModel');

module.exports = {
  all: function(req, res) {
    PersonModel.find({}).lean().exec(function(err, people) {
      if (err) {
        return res.json(err);
      }
      return res.json(people);
    });
  }
}
