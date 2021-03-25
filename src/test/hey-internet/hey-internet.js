import { component, property, Element } from '../..';

@component('hey-internet')
class Component extends Element {
	@property() emoji;

	render() {
		return `
            <h1>Hey Internet ${this.emoji}</h1>
        `;
	}
}
