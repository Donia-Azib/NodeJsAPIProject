const Article = require('../models/Article');
const User = require('../models/User');
const fs = require('fs'); // for files
const jwt = require('jsonwebtoken');


exports.createArticle = (req, res, next) => {
// userId: req.body.userId
    const article = new Article({
       title: req.body.title, description: req.body.description, 
       imageUrl: req.body.imageUrl,
       publish:req.body.publish
    });
    article.save()
    .then(() => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      })
    .catch((error) => {
      console.log(error);
        res.status(400).json({
          error: error
        });
      });
  };
  
  exports.createArticleFileImage = (req, res, next) => {
      const article = !req.file ? new Article({ 
        title: req.body.title, 
        description: req.body.description, 
        imageUrl: req.body.imageUrl, 
        publish: req.body.publish,
        // userId: req.body.userId
      }): new Article({ 
        title: req.body.title, 
        description: req.body.description,  
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
        publish: req.body.publish,
        // userId: req.body.userId
     });
      article.save()
      .then(() => {
          res.status(201).json({
          message: 'Post saved successfully!'
          });
        })
      .catch((error) => {
          res.status(400).json({
            error: error
          });
        });
    };
    


  exports.getOneArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
    .then((article) => {
        res.status(200).json(article);
    })
    .catch((error) => {
        res.status(404).json({
          error: error
        });
      });
  };
  
  exports.modifyArticle = (req, res, next) => {
  //   const article = !req.file ? new Article({ 
  //     title: req.body.title, 
  //     description: req.body.description, 
  //     imageUrl: req.body.imageUrl, 
  //     publish: req.body.publish,
  //     userId: req.body.userId
  //   }): new Article({ 
  //     title: req.body.title, 
  //     description: req.body.description,  
  //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, 
  //     publish: req.body.publish,
  //     userId: req.body.userId
  //  });
    const ArticleObject = req.file ?
    {
      ...JSON.parse(req.body.Article),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Article.updateOne({ _id: req.params.id }, { ...ArticleObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };
  
  exports.deleteArticle = (req, res, next) => {
    Article.findOne({ _id: req.params.id })
    .then(Article => {
      const filename = Article.imageUrl.split('/images/')[1];//get file name
      // unlink => delete file
      fs.unlink(`images/${filename}`, () => {
        Article.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
  };
  
  exports.getAllStuff = (req, res, next) => {
    Article.find()
    .then((article) => {
        res.status(200).json(article);
    })
    .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.getAllStuffByUser = async(req, res, next) => {
    let user = await userDetail(req)
    Article.find({userId: user._id})
    .then((article) => {
        res.status(200).json(article);
      })
    .catch((error) => {
        res.status(404).json({ error: error  });
      }
    );
  };


  var userDetail =async(req)=>{
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    let user = await User.findOne({_id:userId})
    return user;
  }