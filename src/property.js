import { convertAttribute, kebabCase, prototypeMethod } from './utils';

export const property = type => ({ key, initializer }) => {
	const descriptor = {
		get() {
			const attr = this.getAttribute(kebabCase(key));

			return attr || attr == ''
				? convertAttribute(attr, type)
				: initializer && initializer();
		}
	};

	return prototypeMethod(key, descriptor);
};
