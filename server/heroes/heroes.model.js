var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var heroSchema = new Schema({
	name: String,
	avatar: String,
	health: Number,
	mana: Number,
	weapons: [{ type: Schema.Types.ObjectId, ref: 'Weapon' }],
	hasPowers: Boolean
});

heroSchema.methods.getName = function(){
	return name;
};

var Hero = mongoose.model('Hero',heroSchema);
module.exports = Hero;