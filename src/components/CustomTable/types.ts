/* eslint-disable @typescript-eslint/no-explicit-any */
export interface CustomTableProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	pagination: {
		enabled: boolean;
		params?: any;
	};
	className?: string;
	extraHeader?: React.ReactNode | React.ReactElement | (() => JSX.Element);
}

export interface TableColumn<T> extends Omit<AbstractComponentProps, 'children'> {
	columnName: React.ReactElement | React.ReactNode | (() => JSX.Element);
	columnKey: keyof T | string;
	render?: (value: T, field: unknown) => JSX.Element;
	className?: string;
	width?: number | string;
}
