import { component, customEvent, Element } from '../..';

@component('other-component')
class Component extends Element {
	@customEvent() ready = 'Ready 🚀';

	connected() {
		dispatchEvent(this.ready);
	}

	render() {
		return `
			<h1>Other Component</h1>
        `;
	}
}
