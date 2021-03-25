import { component, Element } from '../..';
import '../hey-internet';
import '../some-styles';
import '../cool-property';
import '../easy-event';
import '../other-component';
import '../simple-query';
import '../all-query';
import '../shared-style';
import '../slot-example';
import '../condition-example';
import '../loop-example';
import '../element-example';
import styles from '.';

@component('app-main', styles)
class Component extends Element {
	render() {
		return `
			<hey-internet emoji="👋"></hey-internet>
			<some-styles></some-styles>
			<cool-property title="Cool Title 🤙" multiplier="3"></cool-property>
			<easy-event></easy-event>
			<other-component></other-component>
			<simple-query></simple-query>
			<all-query></all-query>
			<shared-style></shared-style>
			<slot-example>
				<span slot="title">Named slot</span>
				<p>Default slot</p>
			</slot-example>
			<condition-example></condition-example>
			<loop-example></loop-example>
			<element-example as="h1"></element-example>
        `;
	}
}
