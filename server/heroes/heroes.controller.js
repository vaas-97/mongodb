var mongoose = require('mongoose');
var Hero = require('./heroes.model');

module.exports = function() {

    //LISTA DI TUTTI GLI EROI
    var list = function(req, res) {
        Hero.find().exec()
            .then(function(data) {
                res.json(data);
            });
    };

    //DETTAGLIO DI UN SINGOLO EROE
    var detail = function(req, res) {
        var id = req.params.id;
        Hero.findById(id)
            .populate('weapons')
            .exec()
            .then(function(data) {
                res.status(200).send(data);
            },function(data) {
                res.status(404).send({'error':'Eroe non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //CREAZIONE DI UN NUOVO EROE
    var create = function(req, res) {
        var newHero = new Hero(req.body);
        newHero.save()
            .then(function(data) {
                res.status(200).send(data);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    //AGGIORNAMENTO DI UN EROE
    var update = function(req, res) {
        var id = req.params.id;
        Hero.findByIdAndUpdate(id, req.body, {new: true})
            .then(function(data) {
                res.status(200).send(data);
            },function() {
                res.status(404).send({'error':'Eroe non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    var remove = function(req, res) {
        var id = req.params.id;
        Hero.findById(id).exec()
            .then(function(hero) {
                return hero.remove();
            })
            .then(function() {
                res.status(200).send('Eroe rimosso dal database');
            }, function() {
                res.status(404).send({'error':'Eroe non trovato nel database'});
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    return {
        list: list,
        detail: detail,
        create: create,
        remove: remove,
        update: update
    }
};
