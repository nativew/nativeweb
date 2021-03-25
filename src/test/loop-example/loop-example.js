import { component, property, Element } from '../..';

@component('loop-example')
class Component extends Element {
	@property() emojis = ['🤳', '🧨', '🧱'];

	render() {
		return `
			${this.emojis.map(item => `<span>${item}</span>`).join('')}
        `;
	}
}
