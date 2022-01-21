const sauceRoutes =require('./routes/sauce');
const express = require('express');
const User = require('./models/user.js')
const bodyParser = require("body-parser");
const bcrypt= require( 'bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
module.exports = app;
const mongoose = require('mongoose');
const multer = require('multer');
const path = require ('path');
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));

const sauce = require('./models/sauce');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/api/sauces', sauceRoutes);

app.post("/api/auth/login", async function (req, res) {
try{ 
const userFromDB = await User.findOne({ email:req.body.email});
if (
  !userFromDB
  || !bcrypt.compareSync(req.body.password, userFromDB.password)
) {
  return res.status(400).json({ error: 'Vos identifiants ne semblent pas corrects.' });

}
const token = jwt.sign({ userId: userFromDB._id }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
  return res.json({ userId:userFromDB._id,token}).status(200);
}
catch (err) {
  return res.status(500).json({ user: null, error: err });
}
});
app.post("/api/auth/signup", async function (req, res) {
  try{
  const passwordHash = bcrypt.hashSync(req.body.password, 10);
  const newUser = await User.create({email:req.body.email,password:passwordHash})
  return res.json({ message: "utilisateur à été crée avec succès" }).status(200);
  }
  catch (err) {
    return res.status(500).json({ user: null, error: err });
  }
  });
 app.get("/user", async function (req, res) {
  const users = await User.find()
  return res.json({ message: "utilisateur à été crée avec succès", users:users,status: 200}).status(200);
  });
  
 app.listen(3000, () => {
  mongoose.connect(`mongodb://localhost:27017/datadb`, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  });
  console.log(`🚀 application ready at 3000`);
});