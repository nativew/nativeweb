import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import filesize from 'rollup-plugin-filesize';
import pkg from './package.json';

export default {
	input: 'src/index.js',
	output: {
		file: pkg.main,
		format: 'es'
	},
	plugins: [
		resolve(),
		terser(),
		filesize()
	]
};
