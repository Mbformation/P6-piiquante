/* const bcrypt = require('bcrypt'); */

// On récupère le modèle User 
const User = require('./models/user');

/*
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};
*/


exports.signup = (req, res, next) => {
    const user = new User({
        ...req.body
    });
};

exports.login = (req, res, next) => {

};