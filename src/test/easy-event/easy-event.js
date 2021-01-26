import { component, event, Element } from '../..';

@component('easy-event')
export class EasyEvent extends Element {
	@event() mouseenter = this.onHover();
	@event() click = {
		title: this.onClick(),
		button: this.onClick()
	};
	@event() ready = {
		OtherComponent: this.onReady()
	};

	onHover() {
		console.log('Hover Component');
	}
	onClick(e) {
		console.log(e.currentTarget);
	}
	onReady({ detail }) {
		console.log(detail);
	}

	render() {
		return `
			<h1 @title>Easy Event</h1>
			<button @button>Click Me</button>
        `;
	}
}