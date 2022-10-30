import { cloneDeep } from 'lodash';
import { WithPictureModel } from 'src/dataLayer/balldontlie/models/WithPicture';
import { ImageModel } from 'src/dataLayer/searchImageAPI/models/Image';
import { LocalStorageInterface, StorageAdapter } from 'src/dataLayer/storage';
import { BaseRepositoryInterface } from './types';

export type KeysToSearch = Array<{ toSearch: string; toCache: string }>;

export class ImageRepository implements BaseRepositoryInterface {
	localDataSource: LocalStorageInterface = StorageAdapter.init();

	/**
	 * Pulling images from local storage for models
	 * @param models - models to pull pictures for
	 * @param keys - keys to use to pull pictures
	 * @returns models with pictures, keys for pictures that has to be requested
	 */
	protected pullImagesForModels<T extends WithPictureModel>(
		models: Array<T>,
		keys: { toSearch: Array<string | keyof T>; toCache: Array<string | keyof T> }
	): { models: Array<T>; keys: KeysToSearch } {
		const newModels: T[] = [];
		const keysToSearch: KeysToSearch = [];

		for (const model of models) {
			const cachedKey = this.concatenateKeys(model, keys.toCache);
			const imageURL = this.localDataSource.getData<string>(cachedKey);

			if (!imageURL) {
				keysToSearch.push({ toSearch: this.concatenateKeys(model, keys.toSearch), toCache: this.concatenateKeys(model, keys.toCache) });
				newModels.push(model);
			} else {
				newModels.push({ ...model, picture: imageURL });
			}
		}

		return {
			models: newModels,
			keys: keysToSearch,
		};
	}

	/**
	 * Mapping through models and caching images
	 * @param models - models to pull pictures for
	 * @param imageData - requested images
	 * @param keys - keys to map pictures and models
	 * @param modelKeyToCache - keys of the model to properly save data into local storage
	 * @returns models with pictures
	 */
	protected cacheAndPullImages<T extends WithPictureModel>(
		models: Array<T>,
		imageData: { [key: string]: ImageModel[] },
		keys: KeysToSearch,
		modelsKeyToCache: Array<keyof T>
	): Array<T> {
		const newModels: T[] = cloneDeep(models);

		for (const key in imageData) {
			const targetKey = keys.find((k) => k.toSearch === key);

			if (targetKey) {
				const imageURL = imageData[key][0].original;
				this.localDataSource.setData(targetKey.toCache, imageURL, { needToBeEncoded: false, rewrite: true });

				const targetModelIndex = newModels.findIndex((model) => targetKey.toCache === this.concatenateKeys(model, modelsKeyToCache));

				if (targetModelIndex >= 0) {
					newModels[targetModelIndex] = { ...newModels[targetModelIndex], picture: imageURL };
				}
			}
		}

		return newModels;
	}

	/**
	 * Concatenate model properties wuth requested keys
	 * @param model - model to map
	 * @param keys - keys of models
	 * @returns string  of model properties values
	 */
	private concatenateKeys<T extends WithPictureModel>(model: T, keys: Array<string | keyof T>): string {
		return keys
			.map((key) => {
				if (model.hasOwnProperty(key)) {
					return model[key as keyof T];
				}
				return key;
			})
			.join(' ');
	}
}
