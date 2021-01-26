import { component, property, Element } from '../..';

@component('condition-example')
export class ConditionExample extends Element {
	@property() isGood = false;

	render() {
		return `
			${this.isGood ? `<h1>Good</h1>` : ``}
        `;
	}
}
