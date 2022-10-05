export type RequestParams = { [x: string]: string | number | boolean | Array<string | number> };

export interface PaginationParams extends RequestParams {
	page?: number;
	per_page?: number;
}
