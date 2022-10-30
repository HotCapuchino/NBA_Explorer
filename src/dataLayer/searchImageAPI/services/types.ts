import { ImageModel } from '../models/Image';

export interface SearchImageResponseStructure {
	data: { [key: string]: ImageModel[] };
}
