/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/**
 * Template for React SVG
 *
 * Converts the given SVG into a TypeScript-compatible React component
 *
 * @docs https://react-svgr.com/docs/custom-templates/
 */
 function template({ template }, opts, { imports, componentName, props, jsx, exports }) {
	const plugins = ['jsx'];

	if (opts.typescript) {
		plugins.push('typescript');
	}

	const tpl = template.smart({ plugins });

	return tpl.ast`${imports}
	import classNames from 'classnames';

	function ${componentName}(props) {
		const { className, ...rest } = props;
		const icon = ${jsx};

		return (
			<span className={classNames('icon', className)}>
				{icon}
			</span>
		);
	};

	${exports}
`;
}

module.exports = template;