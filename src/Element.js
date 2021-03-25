export class Element extends HTMLElement {
	constructor() {
		super();

		this.attachShadow({ mode: 'open' });
	}

	_setStyles(styles) {
		styles = [].concat(styles);

		this.shadowRoot.adoptedStyleSheets
			? (this.shadowRoot.adoptedStyleSheets = styles)
			: (this._css = styles.join(''));
	}

	_insertRender() {
		const css = this._css ? `<style>${this._css}</style>` : '';

		this.shadowRoot.innerHTML = css + this.render();
	}

	connectedCallback() {
		this._insertRender();
		this.connected();
	}

	disconnectedCallback() {
		this.disconnected();
	}

	adoptedCallback() {
		this.adopted();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this.attributeChanged(name, oldValue, newValue);
	}

	update() {
		this._insertRender();
	}

	render() {}

	connected() {}

	disconnected() {}

	adopted() {}

	attributeChanged(name, oldValue, newValue) {}

	get properties() {
		return Object.values(this.attributes)
			.map(a => `${a.name}="${a.value}"`)
			.join(' ');
	}
}
