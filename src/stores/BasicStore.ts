import { makeObservable, observable } from 'mobx';

export class BasicStore {
	entriesPerPage = 20;
	readonly initialEntriesPerPage = 20;

	constructor() {
		makeObservable(this, {
			entriesPerPage: observable,
		});
	}
}
