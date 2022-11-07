// Importation de multer
const multer = require('multer');

// Pour récupérer les extensions des fichiers
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Configuration de l'enregistrement des fichiers
const storage = multer.diskStorage({ // on précise qu'on enregistre sur le disque
  destination: (req, file, callback) => {
    callback(null, 'images'); // on précise le dossier où enregistrer les images
  },
  // On definit le nom complet du fichier enregistré: nom et exstension
  filename: (req, file, callback) => { 
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');