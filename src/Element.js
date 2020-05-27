export class Element extends HTMLElement {
	constructor(styles) {
		super();
		// Set shadow DOM
		this.attachShadow({ mode: 'open' });
		// Set styles
		styles && this._setStyles(styles);
	}

	connectedCallback() {
		// Set properties
		this.constructor.properties && this._setProperties();
		// Start render
		this._insertRender();
		// Add events listeners
		this.constructor.events && this._setEvents(true);
		// Call user's connected method
		this.connected();
	}

	disconnectedCallback() {
		// Remove events listeners
		this._events && this._setEvents(false);
		// Call user's disconnected method
		this.disconnected();
	}

	_setStyles(styles) {
		this.shadowRoot.adoptedStyleSheets
			? // If stylesheet, adopt it
			  (this.shadowRoot.adoptedStyleSheets = [].concat(styles))
			: // Else assign styles
			  (this._styles = Array.isArray(styles) ? styles.join('') : styles);
	}

	_insertRender() {
		let render = this.render();
		// No stylesheet, add style tag
		if (this._styles) render = `<style>${this._styles}</style>${render}`;
		// Insert render
		this.shadowRoot.innerHTML = render;
	}

	_setEvents(add) {
		this._events = this.constructor.events;
		this._checkEventTarget = this._checkEventTarget.bind(this);
		this._callExternalEventMethod = this._callExternalEventMethod.bind(this);
		// Add or remove an event listener for each event types in this.constructor.events
		Object.entries(this._events).forEach(([e, v]) => {
			if (typeof v === 'string') {
				// Event is on the component, add/remove listener to this
				add
					? this.addEventListener(e, this._callEventMethod)
					: this.removeEventListener(e, this._callEventMethod);
			} else {
				// Event is for a child or external
				if (e === 'mouseenter')
					console.warn(`${e} doesn't work on a child, at the moment.`);
				let hasChild = false;

				for (const k in v) {
					if (k.startsWith('@')) {
						// Has child event, set true
						hasChild = true;
					} else {
						// Has external event, combine component name + event name
						const ev = `${k}-${e}`;
						// Add/remove listener to window for external event
						add
							? window.addEventListener(ev, this._callExternalEventMethod)
							: window.removeEventListener(ev, this._callExternalEventMethod);
					}
				}
				// Add/remove listener for child event
				hasChild && add
					? this.shadowRoot.addEventListener(e, this._checkEventTarget)
					: this.shadowRoot.removeEventListener(e, this._checkEventTarget);
			}
		});
	}

	_setProperties() {
		Object.entries(this.constructor.properties).forEach(([e, v]) => {
			// Get attribute's value
			const attr = this.getAttribute(e);
			// Convert value to specified type
			switch (v) {
				case String:
					this[e] = attr || '';
					break;
				case Number:
					this[e] = Number(attr) || '';
					break;
				case Boolean:
					attr === '' || attr === 'true' ? (this[e] = true) : (this[e] = '');
					break;
				case Object:
					this[e] = JSON.parse(attr) || '';
					break;
				case Array:
					this[e] = JSON.parse(attr) || '';
					break;
			}
		});
	}

	_callEventMethod(e, target, name) {
		// Event value
		const event = this._events[e.type];

		if (target) {
			// Event is for a child
			if (event.hasOwnProperty(name)) {
				// Event exists in this._events, get method
				const method = event[name];
				// Assign the correct element to currentTarget
				Object.defineProperty(e, 'currentTarget', { value: target });
				// Call event's method
				this[method](e);
			}
		} else {
			// Event is on the component, call method
			this[event](e);
		}
	}

	_callExternalEventMethod(e) {
		const event = e.type.split('-');
		// Event value
		const method = this._events[event[1]][event[0]];
		// Call event's method
		this[method](e);
	}

	_checkEventTarget(e) {
		// Event is for a child, get targets path
		let targets = e.composedPath();
		// Check targets
		for (const el of targets) {
			// Stop at shadowRoot, don't bubble out
			if (el === this.shadowRoot) break;

			if (el.attributes && el.attributes.length) {
				// Get attributes that starts with @
				const attrs = Array.from(el.attributes).filter(({ name }) => name.startsWith('@'));
				// Call events method
				attrs.forEach(a => this._callEventMethod(e, el, a.name));
			}
		}
	}

	connected() {}

	render() {
		return ``;
	}

	update() {
		// Reinsert render
		this._insertRender();
	}

	disconnected() {}

	newEvent(name, detail) {
		// Create custom event with component name + event name
		return new CustomEvent(`${this.constructor.name}-${name}`, { detail });
	}

	$(query, context) {
		const el = context || this;
		// Class index
		const classIndex = query.indexOf('.');
		// Id index
		const idIndex = query.indexOf('#');
		// Array of indexes, filter out -1
		const indexes = [classIndex, idIndex].filter(i => i != -1);
		let more = '';

		if (indexes.length) {
			// Smallest index is first character
			const index = Math.min(...indexes);
			// Slice before index
			const start = query.slice(0, index);
			// Slice after index
			more = query.slice(index);
			query = start;
		}
		// Query the result, escape the @
		return el.shadowRoot.querySelectorAll(`[\\${query}]${more}`);
	}

	parent(query, context) {
		// Start at context
		let parent = context;
		// Loop every parent, stop at shadowRoot
		while (parent && parent !== this.shadowRoot) {
			// If matches query, return it
			if (parent.matches(`[\\${query}]`)) return parent;
			// Else next parent
			parent = parent.parentNode;
		}
	}
}
