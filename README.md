# rollup-plugin-images

Forked from [rollup-plugin-image-files](https://github.com/bspaulding/rollup-plugin-image-files)

Added the following enhancements:

- supports custom output directory for images.
- copy and rename image with hash: `[name]_[md5hash].[extname]`.

## Usage

Install the plugin via npm:

```bash
npm install --save-dev rollup-plugin-images
```

Add the plugin to your rollup config:

```javascript
import images from 'rollup-plugin-images';

export default {
	entry: 'src/index.js',
	des: 'dist/bundle.js',
	plugins: [
		images({
			output: 'build/images'
		})
	]
};
```

Require some images in your source:

```javascript
import React from 'react';
import { Image } from 'react-native';
import imageSrc from '../path/to/image.png';

export default const MyComponent = () => (
  <img src={imageSrc} alt='' />
);
```
