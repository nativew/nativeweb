export const css = styles => {
	try {
		const sheet = new CSSStyleSheet();

		sheet.replaceSync(styles);

		return sheet;
	} catch {
		return styles[0];
	}
};
