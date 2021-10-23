const mongoose = require('mongoose');
const faker = require('faker');
const ProductModel = require('../models/ProductModel');

mongoose.connect('mongodb://localhost:27017/angular-auth', {
  useNewUrlParser: true
});

async function add(quantity) {
  try {
    for (let i = 0; i < quantity; i++) {
      const p = new ProductModel();
      p.name = faker.commerce.productName();
      p.department = faker.commerce.department();
      p.price = faker.commerce.price();
      await p.save();
    } 
  } catch (error) {
    console.error(error);
  }
}

add(100).then(() => {
  console.log('products generated successfully');
  mongoose.disconnect();
});
