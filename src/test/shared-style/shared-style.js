import { component, Element } from '../..';
import styles from './shared-style.css.js';

@component('shared-style', styles)
class Component extends Element {
	render() {
		return `
			<h1>Shared Style</h1>
        `;
	}
}
