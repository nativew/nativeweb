<div align="center">
    <br>
    <p>
        <a href="https://github.com/nativew/nativeweb">
            <img src="https://raw.githubusercontent.com/nativew/nativeweb/53f89acb2c33dfe5909c80770f61bc26e6090a5d/logo.svg?sanitize=true" alt="Native Web" width="300px">
        </a>
    </p>
    <br>
    <p>Simple & tiny web components library for building fast websites.</p>
    <p>🚧 <strong>Work in progress</strong></p>
</div>

## 📚 Contents
- 🧠 [Goal](#-goal)
- ✨ [How](#-how)
- 🚀 [Start](#-start)
- 🏄‍♂️ [Use](#%EF%B8%8F-use)
- 🧐 [Concepts](#-concepts)
- 🍱 [API](#-api)
- 🏋️‍♂️ [Examples](#%EF%B8%8F%EF%B8%8F-examples)
- 🤝 [License](#-license)

## 🧠 Goal
Make the web simple and fast again while being maintainable and accessible.

## ✨ How
- 💀 **Dead simple**. Web components simplified. JavaScript like you are used to, encapsulated and enhanced with the simplest API, no complicated new paradigms to learn. Get started instantly with the [starter](https://github.com/nativew/starter).
- 🤪 **Stupid fast**. A thin layer above the native web components already included in your browser. No heavy framework required. _Native Web (**1kB**) vs LitElement (7kB) vs React (39kB) gzipped._
- 👽 **Extra maintainable**. Modules are easy to maintain and reuse. Shadow DOM and custom elements are the native way of creating encapsulated components.
- 😈 **Mad accessible**. The pre-built base components are already accessible. Nothing to do here.

## 🚀 Start
### New project
```zsh
# Create a new project
npm init nativeweb

# And run it 👟
npm start
```
### Existing project
```zsh
# Add to an existing project
npm install nativeweb

# And import it in your JS files ⬇️
```

## 🏄‍♂️ Use
### Simple component
```js
import { Element, css } from 'nativeweb';

const styles = css`
    .hey {
        font-size: 4rem;
    }
`;

export class HeyExample extends Element {
    constructor() {
        super(styles);
    }

    render() {
        return `
            <h1 class="hey">Hey✌️</h1>
        `;
    }
}

customElements.define('hey-example', HeyExample);
```

```html
<hey-example></hey-example>
```

## 🧐 Concepts
- **Encapsulation**. Both the JavaScript and CSS of each component are encapsulated using the native [Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom) API. No need to worry about namespacing your classes anymore.
- **Styles**. They are shared between components instances using [Constructable Stylesheets](https://developers.google.com/web/updates/2019/02/constructable-stylesheets) or fallback to the normal style tag. They can either be in the component's file or in an external styles file.
- **Properties**. In custom elements, attributes are always strings. With `static get properties()` your attributes are converted to the specified type and are accessible with `this.propertyname`.
- **Events**. You can attach events using `static get events()` by specifying the event, the function called and the element with an `@` attribute. Events are automatically destroyed when the element is removed from the DOM.
- **Templates**. With the `render()` function, the returned [template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) is inserted. You can use the native placeholders `${expression}` for templating. 
- **Interoperability**. Like events, you can listen to other components events by adding the component name to the `static get events()` getter instead of an `@` element. The event can be created with the `this.newEvent()` method.
- **Lifecycle**. You can use the `connected()` and `disconnected()` lifecycle methods in your components.
- **Selector**. To select elements in your component, we shortened the `this.shadowRoot.querySelectorAll()` query to `this.$('@element')`.

## 🍱 API 
### Styles
| Method | Description |
| ------ | ----------- |
| [``const styles = css` ` ``](#simple-component) | Add your styles to the `css` tag function and pass it to the constructor as `super(styles)`. It can live [above your class](#simple-component) or in an [external file](#external-styles).
### Getters
| Method | Description |
| ------ | ----------- |
| [`static get properties()`](#properties) | Return your properties with a type as value `String`, `Number`, `Boolean`, `Object` or `Array`. They are accessible with `this.propertyname`. | 
| [`static get events()`](#events) | Return your events with a function name as the value `event: 'func'`, an element name  `event: { '@element': 'func' }` or an [external component](#external-events) name `event: { 'Component': 'func' }`. They are destroyed when the element disconnects. |

### Lifecycle
| Method | Description |
| ------ | ----------- |
| [`render()`](#conditional-rendering) | Return your template literal to be inserted in the DOM. Use the JavaScript placeholder `${expression}` for templating. |
| [`connected()`](#selector) | Called when the element is inserted into the DOM. |
| `disconnected()` | Called when the element is removed from the DOM. |

### Methods
| Method | Description |
| ------ | ----------- |
| [`this.newEvent('eventName'[, detail])`](#external-events) | Create a custom event to be listened from another component. Pass additional data with the optional detail.  |
| [`this.$('@name'[, context])`](#selector) | Select an element with an `@` attribute, followed by a query if needed. Add a context `Object` for scoping. Returns a `NodeList`. |
| `this.parent('@name', context)` | Select a parent element with an `@` attribute, followed by a query if needed, from a context `Object`. |
| `this.update()` | Rerender the component. Updates the DOM. |

## 🏋️‍♂️ Examples

### External styles
```js
import { css } from 'nativeweb';

const styles = css`
    .hey {
        font-size: 4rem;
    }
`;

export default styles;

```
```js
import { Element } from 'nativeweb';
import styles from './hey-example.css.js';

export class HeyExample extends Element {
    constructor() {
        super(styles);
    }

    render() {
        return `
            <h1 class="hey">Hey✌️</h1>
        `;
    }
}

customElements.define('hey-example', HeyExample);
```
```html
<hey-example></hey-example>
```

### Properties
```js
import { Element } from 'nativeweb';

export class HeaderExample extends Element {
    static get properties() {
        return {
            heading: String
        };
    }

    render() {
        return `
            <header>
                <h1>${this.heading}</h1>
            </header>
        `;
    }
}

customElements.define('header-example', HeaderExample);
```
```html
<header-example heading="Heading"></header-example>
```

### Events 
```js
import { Element } from 'nativeweb';

export class ButtonExample extends Element {
    static get events() {
        return {
            click: {
                '@button': 'doSomething'
            }
        };
    }

    doSomething() {
        console.log('👻');
    }

    render() {
        return `
            <button @button>Click me!</button>
        `;
    }
}

customElements.define('button-example', ButtonExample);
```
```html
<button-example></button-example>
```

### External events 
```js
import { Element } from 'nativeweb';

export class FirstComponent extends Element {
    static get events() {
        return {
            ready: {
                'SecondComponent': 'showMe'
            }
        };
    }

    showMe(e) {
        console.log(e.detail);
    }
}

customElements.define('first-component', FirstComponent);
```
```js
import { Element } from 'nativeweb';

export class SecondComponent extends Element {
    connected() {
        const readyEvent = this.newEvent('ready', 'I am ready 😎');
        dispatchEvent(readyEvent);
    }
}

customElements.define('second-component', SecondComponent);
```
```html
<first-component></first-component>
<second-component></second-component>
```

### Conditional rendering 
```js
import { Element } from 'nativeweb';

export class HeaderExample extends Element {
    static get properties() {
        return {
            heading: String,
            description: String
        };
    }

    render() {
        return `
            <header>
                ${this.heading ? `<h1>${this.heading}</h1>` : `<p>Default</p>`}
                ${this.description && `<p>${this.description}</p>`}
            </header>
        `;
    }
}

customElements.define('header-example', HeaderExample);
```
```html
<header-example heading="Heading" description="Description"></header-example>
```

### Composition
```js
import { Element } from 'nativeweb';

export class SectionExample extends Element {
    render() {
        return `
            <section>
                <header>
                    <slot name="heading"></slot>
                </heading>
                <slot></slot>
            </section>
        `;
    }
}

customElements.define('section-example', SectionExample);
```
```html
<section-example>
    <h2 slot="heading">Heading</h2>
    <p>Text</p>
</section-example>
```

### Selector
```js
import { Element } from 'nativeweb';

export class HeyExample extends Element {
    connected() {
        this.$('@heading').innerText = 'Redacted';
    }
    
    render() {
        return `
            <h1 @heading>Hey✌️</h1>
        `;
    }
}
    
customElements.define('hey-example', HeyExample);
```
```html
<hey-example></hey-example>
```

## 🤝 License 
[ISC License](https://choosealicense.com/licenses/isc/)
