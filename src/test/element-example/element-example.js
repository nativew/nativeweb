import { component, property, Element } from '../..';

@component('element-example')
class Component extends Element {
	@property() as = 'p';

	render() {
		return `
            <${this.as}>Heading 1</${this.as}>
        `;
	}
}
