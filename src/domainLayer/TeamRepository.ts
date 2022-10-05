import { BallDontLieAPI } from './../dataLayer/balldontlie/services/index';
import { TeamServiceInterface } from 'src/dataLayer/balldontlie/services/TeamService';
import { TeamModel } from 'src/dataLayer/balldontlie/models/Team';
import { LocalStorageInterface, StorageAdapter } from 'src/dataLayer/storage';
import { RepositoryInterface } from './types';

export class TeamRepository implements TeamRespositoryInterface {
	remoteDataSource: TeamServiceInterface = BallDontLieAPI.init().teamService;
	localDataSource: LocalStorageInterface = StorageAdapter.init();

	async fetchTeams(): Promise<TeamModel[]> {
		// TODO: fetch player photos from unsplash
		const { data } = await this.remoteDataSource.fetchTeams();

		return data;
	}
}

export interface TeamRespositoryInterface extends RepositoryInterface<TeamServiceInterface> {
	fetchTeams: () => Promise<TeamModel[]>;
}
