import { AxiosRequestConfig } from 'axios';
import { isNil } from 'lodash';
import { SearchImageService, SearchImageServiceInterface } from './ImageService';

export class SearchImageAPI {
	searchImageService: SearchImageServiceInterface;

	private static api: SearchImageAPI = null;

	static init(): SearchImageAPI {
		if (isNil(SearchImageAPI.api)) {
			const singletoneInstance = new SearchImageAPI();
			SearchImageAPI.api = singletoneInstance;

			return singletoneInstance;
		}

		return SearchImageAPI.api;
	}

	private constructor() {
		const config = this.createConfig();

		this.searchImageService = new SearchImageService(config);
	}

	private createConfig(): AxiosRequestConfig {
		return {
			baseURL: 'http://localhost:5000',
		};
	}
}
