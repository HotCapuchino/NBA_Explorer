declare type AbstractComponentProps = {
	children?: React.ReactNode | React.ReactNode[];
	className?: string;
};

declare type ColumnName<T, K> = { key: keyof T | Array<keyof T>; label: K | string };

declare type ColumnNames<T, K> = Array<ColumnName<T, K>>;

declare type SinglePageRouteParams = { id: string };

declare type NavbarTabs = 'Players' | 'Teams' | 'Games';

declare type NavbarMenuItemContent = { value: NavbarTabs; route: string };

declare type SubtractKeys<T, K> = Omit<T, keyof K>;

declare type WithRequiredProperty<T, Key extends keyof T> = T & { [P in Key]-?: T[P] };
