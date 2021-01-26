import { component, Element } from '../..';
import { HeyInternet } from '../hey-internet';
import { SomeStyles } from '../some-styles';
import { CoolProperty } from '../cool-property';
import { EasyEvent } from '../easy-event';
import { OtherComponent } from '../other-component';
import { SimpleQuery } from '../simple-query';
import { AllQuery } from '../all-query';
import { SlotExample } from '../slot-example';
import { ConditionExample } from '../condition-example';
import { LoopExample } from '../loop-example';

import styles from './app-main.css.js';

@component('app-main', styles)
export class AppMain extends Element {
	render() {
		return `
			<hey-internet emoji="👋"></hey-internet>
			<some-styles></some-styles>
			<cool-property title="Cool Title 🤙" multiplier="3"></cool-property>
			<easy-event></easy-event>
			<other-component></other-component>
			<simple-query></simple-query>
			<all-query></all-query>
			<slot-example>
				<span slot="title">Named slot</span>
				<p>Default slot</p>
			</slot-example>
			<condition-example></condition-example>
			<loop-example></loop-example>
        `;
	}
}
