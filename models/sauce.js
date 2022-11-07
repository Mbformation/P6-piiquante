// Importation de mongoose
const mongoose = require('mongoose');

// On crée le Schéma en utilisant la fonction .Schema de mongoose
const sauceSchema = mongoose.Schema({
  // On détaille les informations qu'on veut stocker
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number, required: false, default: 0 },
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

// On exporte le schema sous forme de modèle
module.exports = mongoose.model('Sauce', sauceSchema);