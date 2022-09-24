import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { GameModel } from '../models/Game';
import { HTTPRequestService } from './Service';

export class GameService extends HTTPRequestService {
	fetchGames(config?: AxiosRequestConfig): Promise<GameModel[]> {
		return this.axiosInstance.get<unknown, GameModel[]>('/games', config);
	}

	findGame(id: number, config?: AxiosRequestConfig): Promise<GameModel> {
		return this.axiosInstance.get<unknown, GameModel>(`/games?${this.requestParamsToString({ id })}`, config);
	}
}
