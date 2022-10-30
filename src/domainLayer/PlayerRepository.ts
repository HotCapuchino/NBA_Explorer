/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { PaginationParams } from './../dataLayer/core/types';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { isEqual, omit, uniqWith } from 'lodash';
import { PlayerModel } from 'src/dataLayer/balldontlie/models/Player';
import { PlayerServiceInterface } from 'src/dataLayer/balldontlie/services/PlayerService';
import { BallDontLieAPI } from 'src/dataLayer/balldontlie/services';
import { PlayerSeasonAverageStatsModel } from 'src/dataLayer/balldontlie/models/SeasonAverages';
import { PlayerPGStatsModel } from 'src/dataLayer/balldontlie/models/PlayerPGStats';
import { BallDontLieResponseStructure, FetchPlayerSeasonAveragesParams, FetchPlayersParams, FetchPlayerStatsParams } from 'src/dataLayer/balldontlie/types';
import { RepositoryInterface } from './types';
import { SearchImageAPI } from 'src/dataLayer/searchImageAPI/services';
import { SearchImageServiceInterface } from 'src/dataLayer/searchImageAPI/services/ImageService';
import { ImageRepository } from './ImageRepository';

export interface PlayerInfoModel {
	player: PlayerModel;
	seasonAverages: PlayerSeasonAverageStatsModel;
	gameStats: BallDontLieResponseStructure<PlayerPGStatsModel>;
}

export type PlayerInfoParams = SubtractKeys<WithRequiredProperty<FetchPlayerStatsParams, 'player_ids[]'>, PaginationParams>;

export class PlayerRepository extends ImageRepository implements PlayerRepositoryInterface {
	// DI (?)
	remoteHoopsDataSource: PlayerServiceInterface = BallDontLieAPI.init().playerService;
	remoteImagesDataSource: SearchImageServiceInterface = SearchImageAPI.init().searchImageService;

	async *getPlayers(params: Partial<FetchPlayersParams>): AsyncGenerator<BallDontLieResponseStructure<PlayerModel[]>> {
		let playerModels: BallDontLieResponseStructure<PlayerModel[]> = { data: [], meta: null };

		try {
			playerModels = await this.remoteHoopsDataSource.fetchPlayers(params);

			const { models, keys } = this.pullImagesForModels(playerModels.data, { toSearch: ['last_name', 'first_name', 'NBA'], toCache: ['last_name', 'first_name'] });

			playerModels.data = models;
			yield playerModels;

			if (keys.length) {
				const { data } = await this.remoteImagesDataSource.getImagesBySearch({
					search: uniqWith(
						keys.map((key) => key.toSearch),
						isEqual
					),
				});

				const newModels = this.cacheAndPullImages(models, data, keys, ['last_name', 'first_name']);
				playerModels.data = newModels;

				yield playerModels;
			}

			return playerModels;
		} catch (err) {
			// TODO: use notification
			console.warn('Error occurred while fetching players', err);
		} finally {
			yield playerModels;
		}
	}

	async *getPlayerInfo(params: PlayerInfoParams): AsyncGenerator<PlayerInfoModel> {
		const id = params['player_ids[]'][0];

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		let player = await this.getPlayer(id);

		if (player) {
			try {
				const seasonParams: Partial<FetchPlayerSeasonAveragesParams> = {
					'player_ids[]': params['player_ids[]'][0] || null,
					season: params['seasons[]'] || null,
				};

				const { models, keys } = this.pullImagesForModels([player], { toSearch: ['last_name', 'first_name', 'NBA', 'head'], toCache: ['last_name', 'first_name'] });
				player = models[0];

				const results = await Promise.all([this.getSeasonStats(seasonParams), this.getPlayerGameStats(params)]);
				const previousSeasonStats = results[0];
				const playerGameStats = results[1];

				yield {
					player,
					seasonAverages: previousSeasonStats[0],
					gameStats: playerGameStats,
				};

				if (keys.length) {
					const { data } = await this.remoteImagesDataSource.getImagesBySearch({ search: keys.map((key) => key.toSearch) });

					player = this.cacheAndPullImages(models, data, keys, ['last_name', 'first_name'])[0];

					yield {
						player,
						seasonAverages: previousSeasonStats[0],
						gameStats: playerGameStats,
					};
				}
			} catch (err) {
				// TODO: use notification
				console.warn('Error occurred while fetching players', err);

				yield {
					player,
					seasonAverages: null,
					gameStats: null,
				};
			}
		}

		return null;
	}

	async getPlayer(id: number): Promise<PlayerModel> {
		return await this.remoteHoopsDataSource.findPlayer(id);
	}

	async getSeasonStats(params: Partial<FetchPlayerSeasonAveragesParams>): Promise<PlayerSeasonAverageStatsModel[]> {
		const { data } = await this.remoteHoopsDataSource.fetchPlayerSeasonAverages(params);
		return data;
	}

	async getPlayerGameStats(params: Partial<FetchPlayerStatsParams>): Promise<BallDontLieResponseStructure<PlayerPGStatsModel>> {
		return await this.remoteHoopsDataSource.fetchPlayerGameStats(params);
	}
}

export interface PlayerRepositoryInterface extends RepositoryInterface<PlayerServiceInterface, SearchImageServiceInterface> {
	getPlayers: (params: Partial<FetchPlayersParams>) => AsyncGenerator<BallDontLieResponseStructure<PlayerModel[]>>;
	getPlayer: (id: number) => Promise<PlayerModel>;
	getPlayerInfo: (params: PlayerInfoParams) => AsyncGenerator<PlayerInfoModel>;
	getSeasonStats: (params: Partial<FetchPlayerSeasonAveragesParams>) => Promise<PlayerSeasonAverageStatsModel[]>;
	getPlayerGameStats: (params: Partial<FetchPlayerStatsParams>) => Promise<BallDontLieResponseStructure<PlayerPGStatsModel>>;
}
