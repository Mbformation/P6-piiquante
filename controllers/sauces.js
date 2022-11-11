// On importe le modèle Sauce
const Sauce = require('../models/sauce');

// On importe json web token
const jwt = require('jsonwebtoken');

// On importe fs qu'on utilise pour supprimer des fichiers
const fs = require('fs');

exports.getAllSauces = (req, res, next) => {
    Sauce.find().then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    delete sauceObject._userId;
    const sauce = new Sauce({
        ...sauceObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce créée'})})
    .catch(error => { res.status(400).json( { error })})
 };


 exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Not authorized'});
                return;
            } 
            if (req.file) {
              const filename = sauce.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, (error) => {
                if(error){ throw error }
              })
            }
            Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({message : 'Sauce modifiée'}))
            .catch(error => res.status(401).json({ error }));
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };


  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };
 
 exports.likeSauce = async (req, res, next) => {
  const sauce = await Sauce.findOne({_id: req.params.id});
  const userCanLike = !sauce.usersLiked.includes(req.auth.userId);
  const userWantsToLike = req.body.like === 1;
  const userCanDislike = !sauce.usersDisliked.includes(req.auth.userId)
  const userWantsToDislike = req.body.like === -1;
  const userCanCancel = sauce.usersLiked.includes(req.auth.userId) || sauce.usersDisliked.includes(req.auth.userId)
  const userWantsToCancel = req.body.like === 0;
  if(userCanLike && userWantsToLike){
    sauce.usersLiked.push(req.auth.userId)
  }
  if(userCanDislike && userWantsToDislike){
    sauce.usersDisliked.push(req.auth.userId)
  }
  if(userCanCancel && userWantsToCancel){
    if(sauce.usersLiked.includes(req.auth.userId)){
      const index = sauce.usersLiked.findIndex(a => a == req.auth.userId)
      sauce.usersLiked.splice(index, 1)
    } else
    {
      const index = sauce.usersDisliked.findIndex(a => a == req.auth.userId)
      sauce.usersDisliked.splice(index, 1)
    }
  }
  sauce.likes = sauce.usersLiked.length
  sauce.dislikes = sauce.usersDisliked.length
  sauce.save()
  .then(() => { res.status(201).json({message: 'Sauce créée'})})
    .catch(error => { res.status(400).json( { error })})
};
 