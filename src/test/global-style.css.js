import { css } from '..';

export default css`
	*,
	*::before,
	*::after,
	::slotted(*) {
		box-sizing: border-box;
	}
`;
