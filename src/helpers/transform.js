const processProperty = require('./property');

function processTransform(transform) {
	if(transform) {
		// Anchor point
		transform.a = processProperty(transform.a, [0,0,0]);
		// Position
		if(transform.p) {
			if(transform.p.s) {
				transform.p.x = processProperty(transform.p.x, 0);
				transform.p.y = processProperty(transform.p.y, 0);
				transform.p.z = processProperty(transform.p.z, 0);
			} else {
				transform.p = processProperty(transform.p, [0,0,0]);
			}
		}
		// Scale
		transform.s = processProperty(transform.s, [100,100,100]);
		// Rotation
		transform.r = processProperty(transform.r, 0);
		// Opacity
		transform.o = processProperty(transform.o, 100);
		// Shape skew
		transform.sk = processProperty(transform.sk, 0);
		// Shape skew axis
		transform.sa = processProperty(transform.sa, 0);
		// Repeater start opacity
		transform.so = processProperty(transform.so, 100);
		// Repeater end opacity
		transform.eo = processProperty(transform.eo, 100);
	}
}

module.exports = processTransform