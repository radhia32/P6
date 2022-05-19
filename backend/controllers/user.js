const User = require("../models/user");
const bcrypt= require( 'bcryptjs');
const jwt = require('jsonwebtoken');


exports.signup = async(req, res, next) => {
    try{
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const newUser = await User.create({email:req.body.email,password:passwordHash})
        return res.json({ message: "utilisateur à été crée avec succès" }).status(200);
        }
        catch (err) {
          return res.status(400).json({ user: null, error: err });
        }
};
exports.login = async(req, res, next) => {
     try{ 
        const userFromDB = await User.findOne({ email:req.body.email});
        if (
          !userFromDB
          || !bcrypt.compareSync(req.body.password, userFromDB.password)
        ) {
          return res.status(400).json({ error: 'Vos identifiants ne semblent pas corrects.' });
        }
        const token = jwt.sign({ userId: userFromDB._id }, process.env.SECRET_KEY, { expiresIn: '24h' });
          return res.json({ userId:userFromDB._id,token}).status(200);
        }
        catch (err) {
          return res.status(500).json({ user: null, error: err });
        }
                   
};

