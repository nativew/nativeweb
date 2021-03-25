import { methodName, toObject } from './utils';

export const event = () => descriptor => {
	const { key, initializer } = descriptor;
	const string = initializer.toString();
	const value = string.slice(string.indexOf('return') + 6, string.lastIndexOf(';'));
	const externalEvents = [];

	let hasChild = false;
	let object;
	let self;

	const callFunction = (e, func) => {
		const name = methodName(func);

		return self[name](e);
	};

	const callValue = e => callFunction(e, value);

	const callChild = (e, name, value) => {
		const func = object[name];

		if (!func) return;

		Object.defineProperty(e, 'currentTarget', { value });
		callFunction(e, func);
	};

	const callExternal = e => {
		const event = e.type.split('.');
		const func = object[event[0]];

		callFunction(e, func);
	};

	const setNormalEvent = () => self.addEventListener(key, callValue);

	const setChildEvent = () => self.shadowRoot.addEventListener(key, checkTarget);

	const setExternalEvent = (name, remove) => {
		const eKey = `${name}.${key}`;

		remove
			? window.removeEventListener(eKey, callExternal)
			: window.addEventListener(eKey, callExternal);
	};

	const removeExternalEvents = () =>
		externalEvents.forEach(e => setExternalEvent(e, true));

	const checkTarget = e => {
		const targets = e.composedPath();

		for (const el of targets) {
			if (el == self.shadowRoot) break;

			if (el.attributes?.length) {
				const attrs = Array.from(el.attributes).filter(({ name }) =>
					name.startsWith('@')
				);

				attrs.forEach(attr => callChild(e, attr.name, el));
			}
		}
	};

	const checkType = name => {
		if (name.startsWith('@')) return (hasChild = true);

		externalEvents.push(name);
		setExternalEvent(name);
	};

	const checkChildEvents = () => {
		object = toObject(value);

		Object.keys(object).forEach(k => checkType(k));
		hasChild && setChildEvent();
	};

	return {
		...descriptor,
		initializer() {
			self = this;

			if (value.includes(':')) {
				checkChildEvents();

				return;
			}

			setNormalEvent();
		},
		finisher(cla) {
			const disconnected = cla.prototype.disconnectedCallback;

			cla.prototype.disconnectedCallback = function () {
				disconnected.call(this);
				removeExternalEvents();
			};
		}
	};
};
