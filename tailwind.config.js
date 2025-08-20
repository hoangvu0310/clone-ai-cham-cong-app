/** @type {{}} */

const colors = require('./src/constants/colors')

module.exports = {
	// NOTE: Update this to include the paths to all files that contain Nativewind classes.
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	presets: [require('nativewind/preset')],
	theme: {
		extend: {
			fontFamily: {
				regular: ['MontserratRegular'],
				bold: ['MontserratBold'],
			},
		},
		colors: { ...colors },
	},
	plugins: [],
}
