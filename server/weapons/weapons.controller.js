var mongoose = require('mongoose');
var Weapon = require('./weapons.model');

module.exports = function() {

    var list = function(req, res) {
        Weapon.find().exec()
            .then(function(weapons) {
                res.json(weapons);
            });
    };


    var detail = function(req, res) {
        Weapon.findById(req.params.id).exec()
            .then(function(weapon) {
                if (!weapon) {
                    return res.status(404).send('Weapon not found');
                }
                res.json(weapon);
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };

    var save = function(req, res) {
    	
    	if(req.body._id){

    	//SE ESISTE l'ID FA L' UPDATE
        Weapon.findByIdAndUpdate(req.body._id, req.body)
            .then(function() {
                res.status(200).send();
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    	} else {
    		//NON ESISTE l'ID QUINDI FA IL CREATE
    		req.body.id = mongoose.Types.ObjectId();
    		var newWeapon = new Weapon(req.body);
    		newWeapon.increseDamage();
    		newWeapon.save()
            .then(function() {
                res.status(200).send();
            })
            .catch(function(err) {
                res.status(500).send(err);
            });

    	}
    };

    var remove = function(req, res){
    	Weapon.findById(req.params.id).exec()
    		 .then(function(weap) {
    		 	return weap.remove();
            }).then(function(){
                res.status(200).send();
            })
            .catch(function(err) {
                res.status(500).send(err);
            });
    };


    return {
        list: list,
        detail: detail,
        save: save,
        remove: remove,
    }
};
