import { component, property, Element } from '../..';

@component('loop-example')
export class LoopExample extends Element {
	@property() emojis = ['🤳', '🧨', '🧱'];

	render() {
		return `
			${this.emojis.map(item => `<span>${item}</span>`).join('')}
        `;
	}
}
