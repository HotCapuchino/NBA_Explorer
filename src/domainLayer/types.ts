import { LocalStorageInterface } from 'src/dataLayer/storage';

export interface RepositoryInterface<T, K> extends Partial<BaseRepositoryInterface> {
	remoteHoopsDataSource: T;
	remoteImagesDataSource: K;
}

export interface BaseRepositoryInterface {
	localDataSource: LocalStorageInterface;
}
