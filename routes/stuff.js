const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff')


router.post('/',auth,multer, stuffCtrl.createArticle);
router.post('/add',auth,multer, stuffCtrl.createArticleFileImage);
router.put('/:id', auth, multer, stuffCtrl.modifyArticle);// update image => multer
router.delete('/:id',auth, stuffCtrl.deleteArticle);
router.get('/:id',auth, stuffCtrl.getOneArticle);
router.get('/', auth, stuffCtrl.getAllStuff);
router.get('/user/blog', auth, stuffCtrl.getAllStuffByUser);


module.exports = router;



















/*
app.post('/api/stuff', (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({
      ...req.body
    });
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }))
});

app.get('/api/stuff', (req, res, next) => {
    Thing.find()
      .then(things => res.status(200).json(things))
      .catch(error => res.status(400).json({ error }));
});

app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
});


app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
});

app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
});

 */