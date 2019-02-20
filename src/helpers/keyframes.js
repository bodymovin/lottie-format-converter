function processKeyframes(keyframes) {
	let previousValue
	keyframes.forEach((keyframe, index) => {
		if(index === keyframes.length - 1) {
			keyframe.s = previousValue
		} else if(index === keyframes.length - 2) {
			previousValue = keyframe.e
		}
		keyframe.e = undefined
	})
}

module.exports = processKeyframes