const mongoose = require('mongoose');
const faker = require('faker');
const PersonModel = require('../models/PersonModel');

mongoose.connect('mongodb://localhost:27017/angular-auth', {
  useNewUrlParser: true
});

async function add(quantity) {
  try {
    for (let i = 0; i < quantity; i++) {
      const p = new PersonModel();
      p.name = faker.name.firstName();
      p.email = faker.internet.email();
      p.company = faker.company.companyName();
      p.country = faker.address.country();
      await p.save();
    }
  } catch (error) {
    console.error(error);
  }
}

add(100).then(() => {
  console.log('people generated successfully');
  mongoose.disconnect();
});
