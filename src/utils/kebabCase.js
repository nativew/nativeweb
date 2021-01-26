export const kebabCase = name =>
	name
		.split(/(?=[A-Z])/)
		.join('-')
		.toLowerCase();
