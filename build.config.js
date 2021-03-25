import build from '@nativeweb/build';

build(
	{
		entryPoints: ['src/index.js', 'src/test/index.js'],
		outdir: '.',
		outfile: '',
		target: 'esnext'
	},
	{
		serve: {
			root: 'test'
		}
	}
);
