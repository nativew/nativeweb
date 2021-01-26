import { component, property, Element } from '../..';

@component('cool-property')
export class CoolProperty extends Element {
	@property() cool = 'Cool Prop';
	@property(String) title = 'Default Title';
	@property(Number) multiplier;

	render() {
		return `
			<h1>${this.title}</h1>
			<h2>${this.cool} ➡️ ${2 * this.multiplier}</h2>
        `;
	}
}
