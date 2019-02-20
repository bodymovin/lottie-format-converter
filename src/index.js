// const fs = require('fs');
const processKeyframes = require('./helpers/keyframes');
const processProperty = require('./helpers/property');
const processTransform = require('./helpers/transform');
const processEffects = require('./helpers/effects');
const processMasks = require('./helpers/mask');
const processShapes = require('./layers/shapeLayer');
const processTextData = require('./layers/textLayer');

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
	processShapes(layer.shapes)
}

function processText(layer) {
	processEffects(layer.ef);
	processTransform(layer.ks);
	processMasks(layer.masksProperties);
	processTextData(layer.t);
}

function iterateLayers(layers) {
	return layers.forEach((layer) => {
		switch(layer.ty) {
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
			console.log(layer.ty)
		}
	})
}

function iterateAssets(assets) {
	if(assets) {
		assets.forEach(asset => {
			if(asset.layers) {
				iterateLayers(asset.layers)
			}
		})
	}
}


function traverseAnimation(animationData) {
	return new Promise((resolve, reject) => {
		try {
			let animationString = typeof animationData === 'string' ? animationData : JSON.stringify(animationData);
			let animationClone = JSON.parse(animationString)
			iterateLayers(animationClone.layers);
			iterateAssets(animationClone.assets);
			resolve(animationClone);
		}catch(err) {
			throw new Error('Animation could not be parsed');
		}
	})
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

module.exports = traverseAnimation