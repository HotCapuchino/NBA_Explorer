declare type AbstractComponentProps = {
	children?: React.ReactNode;
	className?: string;
};

declare type ColumnNames<T, K> = Array<{ key: keyof T | Array<keyof T>; label: K | string }>;
