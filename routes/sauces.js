// Importation d"express pour créer le router
const express = require('express');

// On importe le middleware d'authentification afin d"authentifier les routes
const auth = require('../middleware/auth');

// On importe le controller sauces
const saucesCtrl = require('../controllers/sauces');

// On importe multer pour les routes concernées
const multer = require('../middleware/multer-config');

// Création du router avec méthode .Router d'express
const router = express.Router();

// Création des routes pour les sauces
router.get(`/`, saucesCtrl.getAllSauces);
//router.get('/:id', auth, saucesCtrl.getOneSauce);
// router.post('/', auth, multer, saucesCtrl.createSauce);
// router.put('/:id', auth, multer, saucesCtrl.modifySauce);
// router.delete('/:id', auth, saucesCtrl.deleteSauce);

module.exports = router;