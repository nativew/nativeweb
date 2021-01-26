import { prototypeMethod } from './utils';

export const customEvent = () => ({ key, initializer }) => {
	const descriptor = {
		get() {
			return new CustomEvent(`${this._name}.${key}`, {
				detail: initializer && initializer()
			});
		}
	};

	return prototypeMethod(key, descriptor);
};
