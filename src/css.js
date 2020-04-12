export const css = styles => {
	try {
		// Browser supports CSSStyleSheet
		// Create stylesheet
		const sheet = new CSSStyleSheet();
		// Add styles to sheet
		sheet.replaceSync(styles);
		// Return stylesheet
		return sheet;
	} catch {
		// Doesn't support CSSStyleSheet
		return styles[0];
	}
};
