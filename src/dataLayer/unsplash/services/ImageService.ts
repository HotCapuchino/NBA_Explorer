import { AxiosRequestConfig } from 'axios';
import { ImageModel } from '../models/Image';
import { SearchImageParams } from '../types';

export class ImageService implements ImageServiceInterface {
	getImageBySearch(params: SearchImageParams, config?: AxiosRequestConfig<any>): Promise<ImageModel[]> {
		// TODO
		return null;
	}
}

export interface ImageServiceInterface {
	getImageBySearch: (params: SearchImageParams, config?: AxiosRequestConfig) => Promise<ImageModel[]>;
}
