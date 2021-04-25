import { convertAttribute, kebabCase, prototypeMethod } from './utils';

export const property = type => ({ key, initializer }) => {
	const descriptor = {
		get() {
			const attr = this.getAttribute(kebabCase(key));

			return attr || attr == ''
				? convertAttribute(attr, type)
				: initializer && initializer();
		},
		set(val) {
			initializer = () => val;
		}
	};

	return prototypeMethod(key, descriptor);
};
