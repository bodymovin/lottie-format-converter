(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var processProperty = require('./property');

function processEffect(effect) {
	effect.v = processProperty(effect.v);
}

function processEffects(effects) {
	if (effects) {
		effects.map(function (effect) {
			switch (effect.ty) {
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
		});
	}
}

module.exports = processEffects;

},{"./property":4}],2:[function(require,module,exports){
"use strict";

function processKeyframes(keyframes) {
	var previousValue = void 0;
	keyframes.forEach(function (keyframe, index) {
		if (index === keyframes.length - 1) {
			keyframe.s = previousValue;
		} else if (index === keyframes.length - 2) {
			previousValue = keyframe.e;
		}
		keyframe.e = undefined;
	});
}

module.exports = processKeyframes;

},{}],3:[function(require,module,exports){
'use strict';

var processProperty = require('./property');

function processMaks(masks) {
	if (masks && masks.length) {
		masks.forEach(function (mask) {
			mask.pt = processProperty(mask.pt);
			mask.o = processProperty(mask.o);
			mask.x = processProperty(mask.x);
		});
	}
}

module.exports = processMaks;

},{"./property":4}],4:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var processKeyframes = require('./keyframes');

function processProperty(property, defaultValue) {
	// defaultValue = null;
	if (property) {
		if ('k' in property) {
			if (typeof property.k === 'number' && defaultValue === property.k) {
				return undefined;
			} else if (_typeof(property.k) === 'object' && property.k.length) {
				if (typeof property.k[0] !== 'number') {
					processKeyframes(property.k);
					return property;
				} else if (defaultValue) {
					var areEqual = true;
					property.k.forEach(function (indexValue, index) {
						if (defaultValue[index] !== indexValue) {
							areEqual = false;
						}
					});
					if (areEqual) {
						return undefined;
					} else {
						return property;
					}
				} else {
					return property;
				}
			} else {
				return property;
			}
		}
	}
	return undefined;
}

module.exports = processProperty;

},{"./keyframes":2}],5:[function(require,module,exports){
'use strict';

var processProperty = require('./property');

function processTransform(transform) {
	if (transform) {
		// Anchor point
		transform.a = processProperty(transform.a, [0, 0, 0]);
		// Position
		if (transform.p) {
			if (transform.p.s) {
				transform.p.x = processProperty(transform.p.x, 0);
				transform.p.y = processProperty(transform.p.y, 0);
				transform.p.z = processProperty(transform.p.z, 0);
			} else {
				transform.p = processProperty(transform.p, [0, 0, 0]);
			}
		}
		// Scale
		transform.s = processProperty(transform.s, [100, 100, 100]);
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

module.exports = processTransform;

},{"./property":4}],6:[function(require,module,exports){
'use strict';

// const fs = require('fs');
var processKeyframes = require('./helpers/keyframes');
var processProperty = require('./helpers/property');
var processTransform = require('./helpers/transform');
var processEffects = require('./helpers/effects');
var processMasks = require('./helpers/mask');
var processShapes = require('./layers/shapeLayer');
var processTextData = require('./layers/textLayer');

function processPrecomp(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
	processMasks(layer.masksProperties);

	// Time remap
	layer.tm = processProperty(layer.tm);
}

function processSolid(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
	processMasks(layer.masksProperties);
}

function processImage(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
	processMasks(layer.masksProperties);
}

function processNull(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
}

function processShape(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
	processMasks(layer.masksProperties);
	processShapes(layer.shapes);
}

function processText(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
	processMasks(layer.masksProperties);
	processTextData(layer.t);
}

function iterateLayers(layers) {
	return layers.forEach(function (layer) {
		switch (layer.ty) {
			case 0:
				processPrecomp(layer);
				break;
			case 1:
				processSolid(layer);
				break;
			case 2:
				processImage(layer);
				break;
			case 3:
				processNull(layer);
				break;
			case 4:
				processShape(layer);
				break;
			case 5:
				processText(layer);
				break;
			default:
				console.log(layer.ty);
		}
	});
}

function iterateAssets(assets) {
	assets.forEach(function (asset) {
		if (asset.layers) {
			iterateLayers(asset.layers);
		}
	});
}

function traverseAnimation(animationData) {
	return new Promise(function (resolve, reject) {
		try {
			var animationString = typeof animationData === 'string' ? animationData : JSON.stringify(animationData);
			var animationClone = JSON.parse(animationString);
			iterateLayers(animationClone.layers);
			iterateAssets(animationClone.assets);
			resolve(animationClone);
		} catch (err) {
			throw new Error('Animation could not be parsed');
		}
	});
}

/*function onLoad(err, data) {
	if(data) {
		const animationData = JSON.parse(data)
		traverseAnimation(animationData)
		fs.writeFile(`../../player/exports/render/export.json`, JSON.stringify(animationData), (err) => {
			if (err) {
				reject(err)
			} else {
				console.log('File Saved: export.json')
			}
		});
	}
}

fs.readFile(`bm.json`, 'utf8', onLoad);*/

module.exports = traverseAnimation;

},{"./helpers/effects":1,"./helpers/keyframes":2,"./helpers/mask":3,"./helpers/property":4,"./helpers/transform":5,"./layers/shapeLayer":7,"./layers/textLayer":8}],7:[function(require,module,exports){
'use strict';

var processTransform = require('../helpers/transform');
var processProperty = require('../helpers/property');

function processShapeGroup(group) {
	processShapes(group.it);
}

function processShapeShape(shape) {
	shape.ks = processProperty(shape.ks);
}

function processShapeFill(fill) {
	fill.c = processProperty(fill.c);
	fill.o = processProperty(fill.o);
}

function processShapeRepeater(repeater) {
	repeater.c = processProperty(repeater.c);
	repeater.o = processProperty(repeater.o);
	processTransform(repeater.tr);
}

function processShapeRoundCorners(roundCorners) {
	roundCorners.r = processProperty(roundCorners.r);
}

function processShapeTrimPath(trimPath) {
	trimPath.s = processProperty(trimPath.s);
	trimPath.e = processProperty(trimPath.e);
	trimPath.o = processProperty(trimPath.o);
}

function processShapeStroke(stroke) {
	stroke.c = processProperty(stroke.c);
	stroke.o = processProperty(stroke.o);
	stroke.w = processProperty(stroke.w);
}

function processShapeGradientFill(gradientFill) {
	gradientFill.g.k = processProperty(gradientFill.g.k);
	gradientFill.s = processProperty(gradientFill.s);
	gradientFill.e = processProperty(gradientFill.e);
	gradientFill.o = processProperty(gradientFill.o);
}

function processShapeGradientStroke(gradientStroke) {
	gradientStroke.g.k = processProperty(gradientStroke.g.k);
	gradientStroke.w = processProperty(gradientStroke.w);
	gradientStroke.s = processProperty(gradientStroke.s);
	gradientStroke.e = processProperty(gradientStroke.e);
	gradientStroke.o = processProperty(gradientStroke.o);
	gradientStroke.ml2 = processProperty(gradientStroke.ml2);
}

function processShapeRectangle(rectangle) {
	rectangle.s = processProperty(rectangle.s);
	rectangle.p = processProperty(rectangle.p);
	rectangle.r = processProperty(rectangle.r);
}

function processShapeEllipse(ellipse) {
	ellipse.s = processProperty(ellipse.s);
	ellipse.p = processProperty(ellipse.p);
}

function processShapeStar(star) {
	star.pt = processProperty(star.pt);
	star.p = processProperty(star.p);
	star.r = processProperty(star.r);
	star.ir = processProperty(star.ir);
	star.is = processProperty(star.is);
	star.or = processProperty(star.or);
	star.os = processProperty(star.os);
}

function processShapes(shapes) {
	shapes.forEach(function (shape) {
		switch (shape.ty) {
			case 'gr':
				processShapeGroup(shape);
				break;
			case 'sh':
				processShapeShape(shape);
				break;
			case 'fl':
				processShapeFill(shape);
				break;
			case 'tr':
				processTransform(shape);
				break;
			case 'rp':
				processShapeRepeater(shape);
				break;
			case 'rd':
				processShapeRoundCorners(shape);
				break;
			case 'tm':
				processShapeTrimPath(shape);
				break;
			case 'st':
				processShapeStroke(shape);
				break;
			case 'gf':
				processShapeGradientFill(shape);
				break;
			case 'gs':
				processShapeGradientStroke(shape);
				break;
			case 'rc':
				processShapeRectangle(shape);
				break;
			case 'el':
				processShapeEllipse(shape);
				break;
			case 'sr':
				processShapeStar(shape);
				break;
			case 'mm':
				// Nothing to do with merge paths properties
				break;
			default:
				console.log(shape.ty);
		}
	});
}

module.exports = processShapes;

},{"../helpers/property":4,"../helpers/transform":5}],8:[function(require,module,exports){
'use strict';

var processProperty = require('../helpers/property');

function processAnimators(animators) {
	if (animators) {
		animators.forEach(function (animator) {
			if (animator.s && animator.s.t === 0) {
				animator.s.xe = processProperty(animator.s.xe);
				animator.s.ne = processProperty(animator.s.ne);
				animator.s.a = processProperty(animator.s.a);
				animator.s.s = processProperty(animator.s.s);
				animator.s.e = processProperty(animator.s.e);
				animator.s.o = processProperty(animator.s.o);
			}
			if (animator.a) {
				animator.a.a = processProperty(animator.a.a);
				animator.a.p = processProperty(animator.a.p);
				animator.a.s = processProperty(animator.a.s);
				animator.a.r = processProperty(animator.a.r);
				animator.a.rx = processProperty(animator.a.rx);
				animator.a.ry = processProperty(animator.a.ry);
				animator.a.o = processProperty(animator.a.o);
				animator.a.fc = processProperty(animator.a.fc);
				animator.a.fh = processProperty(animator.a.fh);
				animator.a.fs = processProperty(animator.a.fs);
				animator.a.fb = processProperty(animator.a.fb);
				animator.a.sc = processProperty(animator.a.sc);
				animator.a.sh = processProperty(animator.a.sh);
				animator.a.ss = processProperty(animator.a.ss);
				animator.a.sb = processProperty(animator.a.sb);
				animator.a.sw = processProperty(animator.a.sw);
				animator.a.fo = processProperty(animator.a.fo);
				animator.a.so = processProperty(animator.a.so);
				animator.a.t = processProperty(animator.a.t);
				animator.a.sk = processProperty(animator.a.sk);
				animator.a.sa = processProperty(animator.a.sa);
			}
		});
	}
}

function processMoreOptions(options) {
	if (options) {
		options.a = processProperty(options.a);
	}
}

function processText(text) {
	processAnimators(text.a);
	processMoreOptions(text.m);
}

module.exports = processText;

},{"../helpers/property":4}]},{},[6]);
