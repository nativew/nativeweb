export const pascalCase = name =>
	name
		.split('-')
		.map(i => i[0].toUpperCase() + i.slice(1))
		.join('');
