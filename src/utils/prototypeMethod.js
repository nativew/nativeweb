export const prototypeMethod = (key, descriptor) => ({
	kind: 'method',
	placement: 'prototype',
	key,
	descriptor: {
		enumerable: true,
		configurable: true,
		...descriptor
	}
});
