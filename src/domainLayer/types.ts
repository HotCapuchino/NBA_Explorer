import { LocalStorageInterface } from 'src/dataLayer/storage';

export interface RepositoryInterface<T> {
	remoteDataSource: T;
	localDataSource: LocalStorageInterface;
}
