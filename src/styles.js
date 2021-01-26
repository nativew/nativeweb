export const styles = css => ({
	kind: 'field',
	placement: 'own',
	key: '_styles',
	descriptor: {},
	initializer() {
		this._setStyles(css);
	}
});
