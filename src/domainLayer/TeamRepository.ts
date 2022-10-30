import { BallDontLieAPI } from './../dataLayer/balldontlie/services/index';
import { TeamServiceInterface } from 'src/dataLayer/balldontlie/services/TeamService';
import { TeamModel } from 'src/dataLayer/balldontlie/models/Team';
import { RepositoryInterface } from './types';
import { SearchImageServiceInterface } from 'src/dataLayer/searchImageAPI/services/ImageService';
import { SearchImageAPI } from 'src/dataLayer/searchImageAPI/services';
import { ImageRepository } from './ImageRepository';
import { BallDontLieResponseStructure } from 'src/dataLayer/balldontlie/types';

export class TeamRepository extends ImageRepository implements TeamRespositoryInterface {
	remoteHoopsDataSource: TeamServiceInterface = BallDontLieAPI.init().teamService;
	remoteImagesDataSource: SearchImageServiceInterface = SearchImageAPI.init().searchImageService;

	async *fetchTeams(): AsyncGenerator<TeamModel[]> {
		let teamsData: BallDontLieResponseStructure<TeamModel[]> = { data: [], meta: null };

		try {
			teamsData = await this.remoteHoopsDataSource.fetchTeams();

			const { models, keys } = this.pullImagesForModels(teamsData.data, { toSearch: ['full_name', 'logo'], toCache: ['abbreviation'] });
			teamsData.data = models;

			yield teamsData.data;

			if (keys.length) {
				const { data } = await this.remoteImagesDataSource.getImagesBySearch({ search: keys.map((key) => key.toSearch) });
				const newModels = this.cacheAndPullImages(models, data, keys, ['abbreviation']);

				yield newModels;
			}
		} catch (err) {
			// TODO: use notification
			console.warn('Error occurred while fetching teams', err);
		} finally {
			yield teamsData.data;
		}
	}
}

export interface TeamRespositoryInterface extends RepositoryInterface<TeamServiceInterface, SearchImageServiceInterface> {
	fetchTeams: () => AsyncGenerator<TeamModel[]>;
}
