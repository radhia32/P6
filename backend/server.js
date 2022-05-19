const sauceRoutes =require('./routes/sauce');
const userRoutes =require('./routes/user');
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
module.exports = app;
const mongoose = require('mongoose');
const path = require ('path');
app.use(bodyParser.json());
const helmet = require('helmet');
require('dotenv').config();
app.use('/images', express.static(path.join(__dirname, 'images')));
const port = process.env.PORT
const mongodb = process.env.db
app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

console.log("mongodb", mongodb)
 app.listen(port,() => {
  mongoose.connect(mongodb, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  });
  console.log(`🚀 application ready at 3000`);
});


