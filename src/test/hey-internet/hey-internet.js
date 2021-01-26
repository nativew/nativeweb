import { component, property, Element } from '../..';

@component('hey-internet')
export class HeyInternet extends Element {
	@property() emoji;

	render() {
		return `
            <h1>Hey Internet ${this.emoji}</h1>
        `;
	}
}
