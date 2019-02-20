const processProperty = require('./property');

function processMaks(masks) {
	if(masks && masks.length) {
		masks.forEach((mask) => {
			mask.pt = processProperty(mask.pt);
			mask.o = processProperty(mask.o);
			mask.x = processProperty(mask.x);
		})
	}
}

module.exports = processMaks