import { PaginationParams } from '../core/types';

export interface SearchImageParams extends PaginationParams {
	search: string | string[];
}
