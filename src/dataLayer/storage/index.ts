import { isNil, isUndefined } from 'lodash';

export class StorageAdapter implements LocalStorageInterface {
	private static singleInstance: StorageAdapter = null;

	static init(): StorageAdapter {
		if (isNil(StorageAdapter.singleInstance)) {
			const singletoneInstance = new StorageAdapter();
			StorageAdapter.singleInstance = singletoneInstance;

			return singletoneInstance;
		}

		return StorageAdapter.singleInstance;
	}

	private constructor() {
		//
	}

	setData(key: string, data: unknown, rewrite = false): void {
		if (!isNil(localStorage.getItem(key)) && !isUndefined(localStorage.getItem(key))) {
			if (!rewrite) {
				// throw error
				console.log('unable to save data with key', key);
				return;
			}
		}

		localStorage.setItem(key, JSON.stringify(data));
	}

	getData<T>(key: string): T | null {
		const data = localStorage.getItem(key);

		return data ? (JSON.parse(data) as T) : null;
	}

	removeData(key?: string): void {
		if (!key) {
			localStorage.clear();
		} else {
			localStorage.removeItem(key);
		}
	}
}

export interface LocalStorageInterface {
	setData: (key: string, data: unknown, rewrite: boolean) => void;
	getData: <T>(key: string) => T | null;
	removeData: (key?: string) => void;
}
