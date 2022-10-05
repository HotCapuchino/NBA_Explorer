import { AxiosRequestConfig } from 'axios';
import { PlayerModel } from '../models/Player';
import { PlayerSeasonAverageStatsModel } from '../models/SeasonAverages';
import { PlayerPGStatsModel } from '../models/PlayerPGStats';
import { HTTPRequestService } from 'src/dataLayer/core/service';
import { BallDontLieResponseStructure, FetchPlayerSeasonAveragesParams, FetchPlayersParams, FetchPlayerStatsParams } from '../types';

export class PlayerService extends HTTPRequestService implements PlayerServiceInterface {
	fetchPlayers(params: Partial<FetchPlayersParams>, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<PlayerModel[]>> {
		return this.fetchPaginatedData('/players', params, config);
	}

	findPlayer(id: number, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<PlayerModel>> {
		return this.axiosInstance.get('/players', { ...config, params: { id } });
	}

	fetchPlayerSeasonAverages(params: Partial<FetchPlayerSeasonAveragesParams>, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<PlayerSeasonAverageStatsModel>> {
		return this.axiosInstance.get('/season_averages', { ...config, params });
	}

	fetchPlayerGameStats(params: Partial<FetchPlayerStatsParams>, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<PlayerPGStatsModel>> {
		return this.fetchPaginatedData('/stats', params, config);
	}
}

export interface PlayerServiceInterface {
	fetchPlayers: (params: Partial<FetchPlayersParams>, config?: AxiosRequestConfig) => Promise<BallDontLieResponseStructure<PlayerModel[]>>;

	findPlayer(id: number, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<PlayerModel>>;

	fetchPlayerSeasonAverages: (
		params: Partial<FetchPlayerSeasonAveragesParams>,
		config?: AxiosRequestConfig
	) => Promise<BallDontLieResponseStructure<PlayerSeasonAverageStatsModel>>;

	fetchPlayerGameStats: (params: Partial<FetchPlayerStatsParams>, config?: AxiosRequestConfig) => Promise<BallDontLieResponseStructure<PlayerPGStatsModel>>;
}
