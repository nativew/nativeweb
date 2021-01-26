import { component, Element } from '../..';

@component('slot-example')
export class SlotExample extends Element {
	render() {
		return `
			<header>
				<h1><slot name="title"></slot></h1>
				<slot></slot>
			</header>
        `;
	}
}
