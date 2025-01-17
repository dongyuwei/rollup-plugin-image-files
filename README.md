# rollup-plugin-image-assets
Like rollup-plugin-image, but writes image files to dest instead of inlining base64. 

Forked from [rollup-plugin-image-files](https://github.com/bspaulding/rollup-plugin-image-files)

Added the following enhancements:

- supports custom output directory for images.
- copy and rename image with hash: `[name]_[md5hash].[extname]`.
- It even supports copy other assets like mp3/wav/mp4 :), just config the `extensions`.

## Usage

Install the plugin via npm:

```bash
npm install --save-dev rollup-plugin-image-assets
```

Add the plugin to your rollup config:

```javascript
import images from 'rollup-plugin-image-assets';

export default {
	entry: 'src/index.js',
	des: 'dist/bundle.js',
	plugins: [
		images({
			extensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg',   '.mp3', '.wav']
			output: 'build/images'
		})
	]
};
```

Require some images in your source:

```javascript
import React from 'react';
import imageSrc from './images/foo.png';

export default const MyComponent = () => (
  <img src={imageSrc} alt='' />
);
```
