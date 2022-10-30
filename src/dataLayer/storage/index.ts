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

	setData(key: string, data: unknown, options: { needToBeEncoded?: boolean; rewrite?: boolean }): void {
		if (!isNil(localStorage.getItem(key)) && !isUndefined(localStorage.getItem(key))) {
			if (!options?.rewrite) {
				// throw error
				// console.log('unable to save data with key', key);
				return;
			}
		}
		const dataToSave = options?.needToBeEncoded ? JSON.stringify(data) : String(data);

		localStorage.setItem(key, dataToSave);
	}

	getData<T>(key: string, needToBeParsed = false): T | string | null {
		const data = localStorage.getItem(key);

		return data ? (needToBeParsed ? (JSON.parse(data) as T) : data) : null;
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
	setData: (key: string, data: unknown, options: { needToBeEncoded?: boolean; rewrite?: boolean }) => void;
	getData: <T>(key: string, needToBeParsed?: boolean) => T | string | null;
	removeData: (key?: string) => void;
}
