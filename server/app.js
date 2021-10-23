const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 3333;

const app = express();

//routes
const api = require('./src/routes/api');
const auth = require('./src/routes/auth');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

mongoose.connect('mongodb://localhost:27017/angular-auth', {
  useNewUrlParser: true
});

app.use('/api', api);
app.use('/auth', auth);
app.use((req, res, next) => {
  return res.status(404).json({
    error: 404,
    message: 'Url not found!'
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
