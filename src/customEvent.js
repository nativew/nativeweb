import { prototypeMethod } from './utils';

export const customEvent = () => ({ key, initializer }) => {
	let value = null;

	const descriptor = {
		get() {
			const detail = value ? value : initializer && initializer();

			return new CustomEvent(`${this._name}.${key}`, { detail });
		},
		set(newValue) {
			value = newValue;
		}
	};

	return prototypeMethod(key, descriptor);
};
