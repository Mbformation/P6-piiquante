// On importe express
const express = require('express');

// Importation de mongoose
const mongoose = require('mongoose');

// On importe le router relatif aux users
const userRoutes = require('./routes/user');

// On importe le router relatif aux sauces
const saucesRoutes = require('./routes/sauces');

// On importe path pour l'enregistrement des images
const path = require('path');

const cors = require('cors');

const router = express.Router();


// On crée l'application express
const app = express();

// Connexion au server mongoDB
//mongoose.connect('mongodb+srv://admin:openclassrooms@hottakes.kkbduam.mongodb.net/?retryWrites=true&w=majority',
mongoose.connect('mongodb+srv://Admin:openclassrooms@cluster0.r0n31lw.mongodb.net/HotTakes?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

// Middleware permettant à l'application express d'accéder au corps des requêtes contenant du json et de le mettre à disposition sur l'objet req via req.body
app.use(express.json());

// On met en place un middleware pour configurer la sécurité CORS
/*app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
*/
app.use(cors());

// On enregistre le router relatif aux users dans l'application express
/*router.get('/abc', function(
){
    console.log('bonjour')
});
*/

app.use('/api/auth', userRoutes); // avec en premier argument la 'racine /api/auth' telle que définie par le front
console.log(userRoutes, saucesRoutes)
// On enregistre le router relatif aux sauces dans l'application express
app.use('api/sauces', saucesRoutes);

// Faire le lien entre le dossier images du back avec le front
app.use('/images', express.static(path.join(__dirname, 'images')))

// Message que le server s'est bien lancé

// On exporte l'application notamment pour server.js
module.exports = app;