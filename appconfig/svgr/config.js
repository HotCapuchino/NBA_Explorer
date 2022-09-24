module.exports = {
	icon: true,
	typescript: true,
	expandProps: 'end',
	prettier: false,
	svgo: true,
	titleProp: false,
	ext: 'tsx',
	template: require('./template.js'),
	plugins: ['@svgr/plugin-jsx'],
	svgProps: {
		width: '1em',
		height: '1em',
		fill: 'currentColor',
	},
};