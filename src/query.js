import { kebabCase, prototypeMethod } from './utils';

export const query = () => ({ key }) => {
	const descriptor = {
		get() {
			return this.shadowRoot.querySelector(`[\\@${kebabCase(key)}]`);
		}
	};

	return prototypeMethod(key, descriptor);
};
