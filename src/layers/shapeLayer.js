const processTransform = require('../helpers/transform');
const processProperty = require('../helpers/property');

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
	processTransform(repeater.tr)
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
	shapes.forEach(shape => {
		switch(shape.ty) {
			case 'gr':
			processShapeGroup(shape)
			break
			case 'sh':
			processShapeShape(shape)
			break
			case 'fl':
			processShapeFill(shape)
			break
			case 'tr':
			processTransform(shape)
			break
			case 'rp':
			processShapeRepeater(shape)
			break
			case 'rd':
			processShapeRoundCorners(shape)
			break
			case 'tm':
			processShapeTrimPath(shape)
			break
			case 'st':
			processShapeStroke(shape)
			break
			case 'gf':
			processShapeGradientFill(shape)
			break
			case 'gs':
			processShapeGradientStroke(shape)
			break
			case 'rc':
			processShapeRectangle(shape)
			break
			case 'el':
			processShapeEllipse(shape)
			break
			case 'sr':
			processShapeStar(shape)
			break
			case 'mm':
			// Nothing to do with merge paths properties
			break
		default:
			console.log(shape.ty);
		}
	})
}

module.exports = processShapes