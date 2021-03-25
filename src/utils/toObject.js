export const toObject = string => {
	const arr = string.split('\n').join('').split(' ').join('').slice(1, -1).split(',');
	const obj = {};

	for (let k of arr) {
		k = k.split(':');

		if (k[0].startsWith('"')) k[0] = k[0].slice(1, -1);

		obj[k[0]] = k[1];
	}

	return obj;
};
