/* eslint-disable @typescript-eslint/no-unused-vars */
import { PlayerModel } from 'src/dataLayer/balldontlie/models/Player';
import { PlayerServiceInterface } from 'src/dataLayer/balldontlie/services/PlayerService';
import { BallDontLieAPI } from 'src/dataLayer/balldontlie/services';
import { PlayerSeasonAverageStatsModel } from 'src/dataLayer/balldontlie/models/SeasonAverages';
import { PlayerPGStatsModel } from 'src/dataLayer/balldontlie/models/PlayerPGStats';
import { BallDontLieResponseStructure, FetchPlayerSeasonAveragesParams, FetchPlayersParams, FetchPlayerStatsParams } from 'src/dataLayer/balldontlie/types';
import { LocalStorageInterface, StorageAdapter } from 'src/dataLayer/storage';
import { RepositoryInterface } from './types';

export class PlayerRepository implements PlayerRepositoryInterface {
	// DI (?)
	remoteDataSource: PlayerServiceInterface = BallDontLieAPI.init().playerService;
	localDataSource: LocalStorageInterface = StorageAdapter.init();

	async getPlayers(params: Partial<FetchPlayersParams>): Promise<BallDontLieResponseStructure<PlayerModel[]>> {
		const playerModels = await this.remoteDataSource.fetchPlayers(params);
		// TODO: fetch player photos from unsplash

		return playerModels;
	}

	async getPlayerInfo(params: Partial<FetchPlayerStatsParams>): Promise<unknown> {
		const id = params['player_ids[]'][0];

		const player = await this.getPlayer(id);

		if (player) {
			const previousSeasonStats = await this.getSeasonStats({});
			const playerGameStats = await this.getPlayerGameStats(params);
			const playerPicture = await this.getPlayerPicture(player.id);

			// TODO: return player info
		}

		return null;
	}

	async getPlayer(id: number): Promise<PlayerModel> {
		const { data } = await this.remoteDataSource.findPlayer(id);
		return data;
	}

	async getSeasonStats(params: Partial<FetchPlayerSeasonAveragesParams>): Promise<PlayerSeasonAverageStatsModel> {
		const { data } = await this.remoteDataSource.fetchPlayerSeasonAverages(params);
		return data;
	}

	async getPlayerGameStats(params: Partial<FetchPlayerStatsParams>): Promise<BallDontLieResponseStructure<PlayerPGStatsModel>> {
		return await this.remoteDataSource.fetchPlayerGameStats(params);
	}

	private async getPlayerPicture(playerId: number): Promise<string | null> {
		const stringURL = this.localDataSource.getData<string>(String(playerId));

		if (stringURL) {
			return stringURL;
		}

		// TODO: fetch unsplash api
		return await Promise.resolve('');
	}
}

export interface PlayerRepositoryInterface extends RepositoryInterface<PlayerServiceInterface> {
	getPlayers: (params: Partial<FetchPlayersParams>) => Promise<BallDontLieResponseStructure<PlayerModel[]>>;
	getPlayer: (id: number) => Promise<PlayerModel>;
	getPlayerInfo: (params: Partial<FetchPlayerStatsParams>) => Promise<unknown>;
	getSeasonStats: (params: Partial<FetchPlayerSeasonAveragesParams>) => Promise<PlayerSeasonAverageStatsModel>;
	getPlayerGameStats: (params: Partial<FetchPlayerStatsParams>) => Promise<BallDontLieResponseStructure<PlayerPGStatsModel>>;
}
