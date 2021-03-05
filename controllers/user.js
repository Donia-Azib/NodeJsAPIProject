const bcrypt = require('bcrypt')
const Article = require('../models/Article');
const User = require('../models/User')
const jwt = require('jsonwebtoken');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          const token = jwt.sign( { userId: user._id },'RANDOM_TOKEN_SECRET', { expiresIn: '24h' })
          console.log('token : '+token);
          console.log('userId : '+user._id);
          res.status(200).json({
            userId: user._id,
            token: token 
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.getUser=async(req,res,next)=>{
  try {
    let userD = await userDetail(req);
    let articleU = await Article.count({userId: userD._id})
    User.findOne({
     // _id: req.params.id
     _id:userD._id
    })
    .then( (thing) => { 
      thing.nbArticle = articleU ? articleU : 0
      res.status(200).json(thing);  
    })
    .catch((error) => {
        res.status(404).json({ error: error }); 
    });
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

exports.getUserInfo=async(req,res,next)=>{
  try {
    let user_id  = req.params._id
    let articleU = await Article.count({userId: user_id})
    User.findOne({
     // _id: req.params.id
     _id:user_id
    })
    .then( (thing) => { 
      thing.nbArticle = articleU ? articleU : 0
      res.status(200).json(thing);  
    })
    .catch((error) => {
        res.status(404).json({ error: error }); 
    });
  } catch (error) {
    res.status(404).json({ error: error });
  }
}

exports.modifyUser = async(req, res, next) => {
  try {
    //email inexistant
      var userD = await userDetail(req);
      var exist = await User.find({email:req.body.email})
      if(exist.length > 0 && userD.email != req.body.email) 
        {
          res.status(400).send({ message: "Email exist",update:false })
          console.log(exist.length);
        }
      else
      {
        var user = await User.updateOne({_id : userD._id},req.body)
        if(!user)
            res.status(404).send({ message: "Cannot GET user" })
         else
          res.status(200).send({ message: "User updated..!",updated : true }) 
      }
  } catch (error) {
      res.status(400).send({ message: "Cannot Update User " })
      console.log("Cannot Update User " +error);
  }
}
 


var userDetail =async(req)=>{
  const token = req.headers.authorization.split(' ')[1];
  const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  const userId = decodedToken.userId;
  let user = await User.findOne({_id:userId})
  return user;
}
