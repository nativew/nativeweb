import { component, Element } from '../..';
import { styles } from './some-styles.css.js';

@component('some-styles', styles)
export class SomeStyles extends Element {
	render() {
		return `
			<h1>Some Styles</h1>
        `;
	}
}
