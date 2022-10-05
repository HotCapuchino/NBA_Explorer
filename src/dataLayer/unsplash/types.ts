import { PaginationParams } from '../core/types';
import { UnsplashImageOrientation } from './models/ImageOrientation';

export interface SearchImageParams extends PaginationParams {
	search: string;
	orientation?: UnsplashImageOrientation;
}
