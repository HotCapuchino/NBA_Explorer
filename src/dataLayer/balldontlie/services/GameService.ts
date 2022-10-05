import { AxiosRequestConfig } from 'axios';
import { HTTPRequestService } from 'src/dataLayer/core/service';
import { GameModel } from '../models/Game';
import { BallDontLieResponseStructure, FetchGamesParams } from '../types';

export class GameService extends HTTPRequestService implements GameServiceInterface {
	fetchGames(params: FetchGamesParams, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<GameModel[]>> {
		return this.fetchPaginatedData('/games', params, config);
	}

	findGame(id: number, config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<GameModel>> {
		return this.axiosInstance.get('/games', { ...config, params: { id } });
	}
}

export interface GameServiceInterface {
	fetchGames: (params: FetchGamesParams) => Promise<BallDontLieResponseStructure<GameModel[]>>;
	findGame(id: number): Promise<BallDontLieResponseStructure<GameModel>>;
}
