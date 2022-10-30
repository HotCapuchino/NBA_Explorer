import { HTTPRequestService } from 'src/dataLayer/core/service';
import { AxiosRequestConfig } from 'axios';
import { SearchImageParams } from '../types';
import { SearchImageResponseStructure } from './types';

export class SearchImageService extends HTTPRequestService implements SearchImageServiceInterface {
	getImagesBySearch(params: SearchImageParams, config?: AxiosRequestConfig): Promise<SearchImageResponseStructure> {
		return this.fetchPaginatedData('/search/images', params, config);
	}
}

export interface SearchImageServiceInterface {
	getImagesBySearch: (params: SearchImageParams, config?: AxiosRequestConfig) => Promise<SearchImageResponseStructure>;
}
