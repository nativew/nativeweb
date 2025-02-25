import { component, query, Element } from '../..';

@component('simple-query')
class Component extends Element {
	@query() title;

	connected() {
		this.title.innerText = 'Better Title 💯';
	}

	render() {
		return `
            <h1 @title>Good Title</h1>
        `;
	}
}
