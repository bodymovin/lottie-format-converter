const processProperty = require('../helpers/property');

function processAnimators(animators) {
	if(animators) {
		animators.forEach((animator) => {
			if(animator.s && animator.s.t === 0) {
				animator.s.xe = processProperty(animator.s.xe);
				animator.s.ne = processProperty(animator.s.ne);
				animator.s.a = processProperty(animator.s.a);
				animator.s.s = processProperty(animator.s.s);
				animator.s.e = processProperty(animator.s.e);
				animator.s.o = processProperty(animator.s.o);
			}
			if(animator.a) {
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
		})
	}
}

function processMoreOptions(options) {
	if(options) {
		options.a = processProperty(options.a);
	}
}

function processText(text) {
	processAnimators(text.a);
	processMoreOptions(text.m);
}

module.exports = processText;