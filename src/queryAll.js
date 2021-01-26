import { kebabCase, prototypeMethod } from './utils';

export const queryAll = () => ({ key }) => {
	const descriptor = {
		get() {
			return this.shadowRoot.querySelectorAll(`[\\@${kebabCase(key)}]`);
		}
	};

	return prototypeMethod(key, descriptor);
};
