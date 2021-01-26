<div align="center">
    <br>
    <p>
        <a href="https://github.com/nativew/nativeweb">
            <img src="https://raw.githubusercontent.com/nativew/nativeweb/1e9405c629e3a6491bb59df726044eb3823967bb/logo-rectangle_nativeweb.svg" alt="Native Web">
        </a>
    </p>
    <p>
        Tiny library for simple web components. <br>
        <sub><code>1kB</code></sub>
    </p>
    <br>
</div>

<br>

```js
import { component, property, Element } from 'nativeweb';

@component('hey-internet')
export class HeyInternet extends Element {
    @property() emoji;

    render() {
        return `
            <h1>Hey Internet ${this.emoji}</h1>
        `;
    }
}
```

```html
<hey-internet emoji="👋"></hey-internet>
```

<br>

### Native web components

### Encapsulated styles and scripts

### Simplified with decorators

### Tiny footprint

<br>

### One command to [start](https://github.com/nativew/start)

```zsh
npm init nativeweb
```

<br>

### Or add to your existing project

```zsh
npm install nativeweb
```

<br>

### Decorators

[`@component`](#component)

[`@property`](#property)

[`@event`](#event)

[`@customEvent`](#customevent)

[`@query`](#query)

[`@queryAll`](#queryall)

<br>

### `@component`

Define a custom element and add styles. From an external file or the same file. `styles` can be an `array` of styles.

```js
import { component, Element } from 'nativeweb';
import { styles } from './hey-styles.css.js';

@component('some-styles', styles)
export class SomeStyles extends Element {
    render() {
        return `
            <h1>Some Styles</h1>
        `;
    }
}
```

```js
import { css } from 'nativeweb';

export const styles = css`
    h1 {
        color: orange;
    }
`;
```

```html
<hey-styles></hey-styles>
```

<br>

### `@property`

Get an attribute converted to the specified type or define a property with an optional default value.  
`String`, `Boolean`, `Number`, `Array` or `Object`.

```js
import { component, property, Element } from 'nativeweb';

@component('cool-property')
export class CoolProperty extends Element {
    @property() cool = 'Cool Prop';
    @property(String) title = 'Default Title';
    @property(Number) multiplier;

    render() {
        return `
            <h1>${this.title}</h1>
            <h2>${this.cool} ➡️ ${2 * this.multiplier}</h2>
        `;
    }
}
```

```html
<cool-property title="Cool Title 🤙" multiplier="3"></cool-property>
```

<br>

### `@event`

Add an event listener to a component, a child element named `@name` or an external component event.

```js
import { component, event, Element } from 'nativeweb';

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
```

```html
<easy-event></easy-event>
```

<br>

### `@customEvent`

Create a custom global event, namespaced with the component name. Ready to be dispatched. The listener is in the [component above](#event).

```js
import { component, customEvent, Element } from 'nativeweb';

@component('other-component')
export class OtherComponent extends Element {
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
```

```html
<other-component></other-component>
```

<br>

### `@query`

Query selector an `@name` child element.

```js
import { component, query, Element } from 'nativeweb';

@component('simple-query')
export class SimpleQuery extends Element {
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
```

```html
<simple-query></simple-query>
```

<br>

### `@queryAll`

Query selector all `@name` child elements.

```js
import { component, queryAll, Element } from 'nativeweb';

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
```

```html
<all-query></all-query>
```

<br>

### Lifecycle

`render()` &nbsp; → &nbsp; Renders the component.

`connected()` &nbsp; → &nbsp; Called when the component is inserted in the DOM.

`disconnected()` &nbsp; → &nbsp; Called when the component is removed from the DOM.

`adopted()` &nbsp; → &nbsp; Called when the component is moved to a new document.

`attributeChanged()` &nbsp; → &nbsp; Called when an observed attribute changes.

<br>

### Methods

`this.update()` &nbsp; → &nbsp; Rerenders the component.

<br>

### Tips

[Composition](#composition)

[Conditional](#conditional)

[Loop](#loop)

<br>

### Composition

Component composition with default slot and named slot.

```js
import { component, Element } from 'nativeweb';

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
```

```html
<slot-example>
    <span slot="title">Named slot</span>
    <p>Default slot</p>
</slot-example>
```

<br>

### Conditional

Conditional rendering in vanilla JS.

```js
import { component, property, Element } from 'nativeweb';

@component('condition-example')
export class ConditionExample extends Element {
    @property() isGood = false;

    render() {
        return `
            ${this.isGood ? `<h1>Good</h1>` : ``}
        `;
    }
}
```

```html
<condition-example></condition-example>
```

<br>

### Loop

Render loop in vanilla JS.

```js
import { component, property, Element } from 'nativeweb';

@component('loop-example')
export class LoopExample extends Element {
    @property() emojis = ['🤳', '🧨', '🧱'];

    render() {
        return `
            ${this.emojis.map(item => `<span>${item}</span>`).join('')}
        `;
    }
}
```

```html
<loop-example></loop-example>
```

<br>

<div align="center">
    <br>
    <p>
        <a href="https://github.com/nativew/nativeweb">
            <img src="https://raw.githubusercontent.com/nativew/nativeweb/1e9405c629e3a6491bb59df726044eb3823967bb/logo-square_nativeweb.svg" alt="Native Web">
        </a>
    </p>
</div>

<br>
