export const methodName = method => {
	const index = method.indexOf('.');
	const start = index > -1 ? index + 1 : 0;

	return method.slice(start, method.indexOf('('));
};
