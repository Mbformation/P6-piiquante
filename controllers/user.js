// On importe bcrypt
const bcrypt = require('bcrypt');

// On importe json web token
const jwt = require('jsonwebtoken');

// On récupère le modèle User 
const User = require('../models/user');

// Creation d'un utilisateur
exports.signup = (req, res, next) => {
    const strongPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#_?&])[A-Za-z\d@$!%_*#?&]{8,}$/
    if(!strongPassword.test(req.body.password)){

        return res.status(400).json({message: 'Mot de passe doit contenir au moins 1 majuscule, 1 minuscule, 1 caractère spécial, 1 chiffre et 8 caractères minimum'})
    }
    bcrypt.hash(req.body.password, 10) // on appelle la fonction de hash, on lui passe le mdp de la requête, salt de 10
        .then(hash => { // on recupere le hash pour l'ajouter a un nouveau user
            const user = new User({ // nouveau user qu'on enregistre dans la base de données
                email: req.body.email,
                password: hash
            });
            //delete user._id
            console.log(user);
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

// Connexion de l'utilisateur
exports.login = (req, res, next) => {
    // On vérifie si l'utilisateur existe dans la base de données
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) { // si l'utilisateur n"existe pqs on revoie un message
                return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
            }
            // Si l'utilisateur existe on vérifie si le mdp fournit est valide
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) { // s'il n'est pas valide on revoie un message
                        return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                    }
                    // s'il est valide on renvoie une réponse avec l'id et le token
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'jfdv5FLQ0830KLPFHEL4',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
 };
