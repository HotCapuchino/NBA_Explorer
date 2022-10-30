import { makeAutoObservable } from 'mobx';

export class AppStore {
	startPageVisited = false;

	constructor() {
		makeAutoObservable(this);
	}
}
