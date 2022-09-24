declare module '*.module.sass' {
	const resource: { [key: string]: string };
	export = resource;
}
declare module '*.sass';

declare module '*.module.scss' {
	const resource: { [key: string]: string };
	export = resource;
}
declare module '*.scss';

declare module '*.module.less' {
	const resource: { [key: string]: string };
	export = resource;
}
declare module '*.less';

declare module '*.svg' {
	const SVGComponent: (props: React.SVGProps<SVGElement>) => React.ReactElement;
	export default SVGComponent;
}