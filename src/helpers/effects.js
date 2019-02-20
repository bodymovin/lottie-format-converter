const processProperty = require('./property');

function processEffect(effect) {
	effect.v = processProperty(effect.v);
}

function processEffects(effects) {
	if(effects) {
		effects.map((effect)=>{
			switch(effect.ty) {
				case 0:
				case 1:
				case 2:
				case 3:
				case 4:
				case 7:
				processEffect(effect);
				break;
				case 5:
				case 20:
				case 21:
				case 22:
				case 23:
				case 24:
				case 25:
				case 26:
				case 27:
				case 28:
				case 29:
				case 30:
				case 31:
				case 32:
				case 33:
				case 34:
				processEffects(effect.ef);
				break;
				default:
				//console.log('EFFECT NOT PROCESSED:' , effect.ty);
				break;
			}
		})
	}
}

module.exports = processEffects;