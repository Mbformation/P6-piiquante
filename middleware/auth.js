// On importe json web token
const jwt = require('jsonwebtoken');

// On importe dotenv
require('dotenv').config();

// Vérifiation des tokens
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1]; // récupération du token envoyé par le front
       const decodedToken = jwt.verify(token, process.env.TOKEN); // on décodage du token
       const userId = decodedToken.userId; // on récupère le userId du token décodé
       // On ajoute la valeur du userId à l'objet req qui sera transmit aux routes
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};