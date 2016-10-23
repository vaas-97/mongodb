var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//SCHEMA
var weaponSchema = new Schema({
	name: String,
	description: String,
	image: String,
	price: Number,
	availability: Number,
	damage: Number,
});


//METODI
weaponSchema.methods.increseDamage = function(){
	this.damage = this.damage + 10;
};

//MIDDLEWARE
weaponSchema.post('remove',function(weapon){
	console.log("Hai rimosso l'arma : %s", weapon.name);
});

weaponSchema.pre('save',function(next){
	this.damage = this.damage + 10;
	this.price = this.price + 1;
	next();
});


var Weapon = mongoose.model('Weapon',weaponSchema);
module.exports = Weapon;