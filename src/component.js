import { styles } from './styles';

export const component = (name, css) => descriptor => {
	const { kind, elements } = descriptor;

	css && elements.push(styles(css));

	return {
		kind,
		elements,
		finisher(cla) {
			cla.prototype._name = name;
			window.customElements.define(name, cla);
		}
	};
};
