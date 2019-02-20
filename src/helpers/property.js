const processKeyframes = require('./keyframes');

function processProperty(property, defaultValue) {
	// defaultValue = null;
	if(property) {
		if('k' in property) {
			if(typeof property.k === 'number' && defaultValue === property.k) {
				return undefined 
			} else if(typeof property.k === 'object' && property.k.length) {
				if(typeof property.k[0] !== 'number') {
					processKeyframes(property.k);
					return property;
				} else if(defaultValue) {
					let areEqual = true;
					property.k.forEach((indexValue, index) => {
						if(defaultValue[index] !== indexValue) {
							areEqual = false
						}
					})
					if(areEqual) {
						return undefined
					} else {
						return property;
					}
				} else {
					return property
				}
			} else {
				return property
			}
		}
	}
	return undefined
}

module.exports = processProperty