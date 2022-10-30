import { cloneDeep, isEqual, uniqWith } from 'lodash';
import { TeamModel } from './../dataLayer/balldontlie/models/Team';
import { GameModel } from 'src/dataLayer/balldontlie/models/Game';
import { BallDontLieAPI } from 'src/dataLayer/balldontlie/services';
import { GameServiceInterface } from 'src/dataLayer/balldontlie/services/GameService';
import { BallDontLieResponseStructure, FetchGamesParams } from 'src/dataLayer/balldontlie/types';
import { SearchImageAPI } from 'src/dataLayer/searchImageAPI/services';
import { SearchImageServiceInterface } from 'src/dataLayer/searchImageAPI/services/ImageService';
import { ImageRepository } from './ImageRepository';
import { RepositoryInterface } from './types';

export class GameRepository extends ImageRepository implements GameRepositoryInterface {
	// DI (?)
	remoteHoopsDataSource: GameServiceInterface = BallDontLieAPI.init().gameService;
	remoteImagesDataSource: SearchImageServiceInterface = SearchImageAPI.init().searchImageService;

	async *fetchGames(params: FetchGamesParams): AsyncGenerator<BallDontLieResponseStructure<GameModel[]>> {
		let gamesData: BallDontLieResponseStructure<GameModel[]> = { data: [], meta: null };

		try {
			gamesData = await this.remoteHoopsDataSource.fetchGames(params);
			const teamsToFetchImagesFor = gamesData.data.map((gameData) => [gameData.home_team, gameData.visitor_team]).flat();

			const { models, keys } = this.pullImagesForModels(teamsToFetchImagesFor, { toSearch: ['full_name', 'logo'], toCache: ['abbreviation'] });

			const newGamesData: GameModel[] = [];
			for (const gameData of gamesData.data) {
				newGamesData.push(this.mapModelsToTeams(gameData, models));
			}

			gamesData.data = newGamesData;
			yield gamesData;

			if (keys.length) {
				const { data } = await this.remoteImagesDataSource.getImagesBySearch({
					search: uniqWith(
						keys.map((key) => key.toSearch),
						isEqual
					),
				});
				const newModels = this.cacheAndPullImages(models, data, keys, ['abbreviation']);

				const newGamesData: GameModel[] = [];
				for (const gameData of gamesData.data) {
					newGamesData.push(this.mapModelsToTeams(gameData, newModels));
				}

				gamesData.data = newGamesData;
				yield gamesData;
			}
		} catch (err) {
			// TODO: use notification
			console.warn('Error occurred while fetching games', err);
		} finally {
			yield gamesData;
		}
	}

	async *findGame(id: number): AsyncGenerator<GameModel> {
		let gameData: GameModel = null;

		try {
			gameData = (await this.remoteHoopsDataSource.findGame(id)).data;
			const teamsToFetchImagesFor = [gameData.home_team, gameData.visitor_team];

			const { models, keys } = this.pullImagesForModels(teamsToFetchImagesFor, { toSearch: ['full_name', 'logo'], toCache: ['abbreviation'] });

			yield this.mapModelsToTeams(gameData, models);

			if (keys.length) {
				const { data } = await this.remoteImagesDataSource.getImagesBySearch({ search: keys.map((key) => key.toSearch) });
				const newModels = this.cacheAndPullImages(models, data, keys, ['abbreviation']);

				yield this.mapModelsToTeams(gameData, newModels);
			}
		} catch (err) {
			// TODO: use notification
			console.warn('Error occurred while fetching games', err);
		} finally {
			yield gameData;
		}
	}

	private mapModelsToTeams(gameData: GameModel, models: TeamModel[]): GameModel {
		const newGameModel = cloneDeep(gameData);

		newGameModel.home_team = models.find((x) => x.id === gameData.home_team.id);
		newGameModel.visitor_team = models.find((x) => x.id === gameData.visitor_team.id);

		return newGameModel;
	}
}

export interface GameRepositoryInterface extends RepositoryInterface<GameServiceInterface, SearchImageServiceInterface> {
	fetchGames: (params: FetchGamesParams) => AsyncGenerator<BallDontLieResponseStructure<GameModel[]>>;
	findGame: (id: number) => AsyncGenerator<GameModel>;
}
