export const convertAttribute = (attr, type) => {
	switch (type) {
		case Boolean:
			return attr == 'true' || attr == '' ? true : false;
		case Number:
			return Number(attr);
		case Array:
		case Object:
			return JSON.parse(attr);
		default:
			return attr;
	}
};
