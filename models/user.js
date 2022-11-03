// On importe mongoose
const mongoose = require('mongoose');

// On importe le plugin mongoose-unique-validator
const uniqueValidator = require('mongoose-unique-validator');

// On crée le Schéma en utilisant la fonction .Schema de mongoose
const userSchema = mongoose.Schema({
    // On détaille les informations qu'on veut stocker
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// On applique ce validator avant d'en faire un modèle
userSchema.plugin(uniqueValidator);

// On exporte le schema sous forme de modèle
module.exports = mongoose.model('User', userSchema);