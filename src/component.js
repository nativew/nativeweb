import { styles } from './styles';
import { pascalCase } from './utils';

export const component = (name, css) => descriptor => {
	const { kind, elements } = descriptor;

	css && elements.push(styles(css));

	return {
		kind,
		elements,
		finisher(cla) {
			cla.prototype._name = pascalCase(name);
			window.customElements.define(name, cla);
		}
	};
};
