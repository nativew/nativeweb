import { component, queryAll, Element } from '../..';

@component('all-query')
export class AllQuery extends Element {
	@queryAll() title;

	connected() {
		this.title.forEach(el => (el.style.color = 'lightgreen'));
	}

	render() {
		return `
            <h1 @title>One Title</h1>
            <h2 @title>Other Title</h2>
        `;
	}
}
