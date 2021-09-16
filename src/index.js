import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { basename, dirname, extname } from 'path';
import { createFilter } from 'rollup-pluginutils';
const crypto = require('crypto');

const defaultExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];

const getHash = content => {
	try {
		const hashFunc = crypto.createHash('md5');
		return hashFunc.update(content).digest('hex');
	} catch (e) {
		return null;
	}
};

const generateFileNameWithHash = (basename, extname, hash) => {
	return `${basename}-${hash}.${extname}`.replace('..', '.');
};

export default function image(options = {}) {
	const extensions = options.extensions || defaultExtensions;
	const includes = extensions.map(e => `**/*${e}`);
	const filter = createFilter(options.include || includes, options.exclude);
	let images = new Map();

	function generateBundle(outputOptions, rendered) {
		const dir =
			options.output ||
			outputOptions.dir ||
			dirname(outputOptions.dest || outputOptions.file);
		if (!existsSync(dir)) {
			mkdirSync(dir, { recursive: true });
		}
		for (const [image, hash] of images) {
			const ext = extname(image);
			writeFileSync(
				`${dir}/${generateFileNameWithHash(basename(image, ext), ext, hash)}`,
				readFileSync(image)
			);
		}
	}

	return {
		name: 'image-file2',
		load(image) {
			if ('string' !== typeof image || !filter(image)) {
				return null;
			}

			if (!images.has(image)) {
				const content = readFileSync(image);
				const hash = getHash(content);
				images.set(image, hash);
			}

			const hash = images.get(image);
			const ext = extname(image);
			return `const img = require('${
				options.output ? options.output : '.'
			}/${generateFileNameWithHash(
				basename(image, ext),
				ext,
				hash
			)}').default; export default img;`;
		},
		generateBundle,
		ongenerate: generateBundle
	};
}
