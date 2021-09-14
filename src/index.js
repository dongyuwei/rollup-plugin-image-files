import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname } from 'path';
import { createFilter } from 'rollup-pluginutils';

const defaultExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

export default function image(options = {}) {
	const extensions = options.extensions || defaultExtensions;
	const includes = extensions.map(e => `**/*${e}`);
	const filter = createFilter(options.include || includes, options.exclude);
	let images = [];

	function generateBundle(outputOptions, rendered) {
		const dir =
			options.output ||
			outputOptions.dir ||
			dirname(outputOptions.dest || outputOptions.file);
		if (!existsSync(dir)) {
			mkdirSync(dir, { recursive: true });
		}
		images.forEach(id => {
			writeFileSync(`${dir}/${basename(id)}`, readFileSync(id));
		});
	}

	return {
		name: 'image-file2',
		load(id) {
			if ('string' !== typeof id || !filter(id)) {
				return null;
			}

			if (images.indexOf(id) < 0) {
				images.push(id);
			}
			return `const img = require('${
				options.output ? options.output : '.'
			}/${basename(id)}').default; export default img;`;
		},
		generateBundle,
		ongenerate: generateBundle
	};
}
