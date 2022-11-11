// On a besoin d'express pour créer le router
const express = require('express');

// Il faut importer le controller pour associer les fonctions (logique métier) aux différentes routes
const userCtrl = require('../controllers/user');

const limiter = require('../middleware/rate-limit');

// Création du router avec la fonction .Router d'express
const router = express.Router();

// La création de deux routes post, une pour le signup, l'autre pour le login
router.post('/signup', limiter, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

// On exporte le router comme ça dans app.js on peut l'importer
module.exports = router;