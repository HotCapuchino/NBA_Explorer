import { SeasonAveragesModel } from './../models/SeasonAverages';
import { PlayerModel } from './../models/Player';
import { HTTPRequestService } from './Service';
import { AxiosRequestConfig } from 'axios';

export class PlayerService extends HTTPRequestService {
	fetchPlayers(config?: AxiosRequestConfig): Promise<PlayerModel[]> {
		return this.axiosInstance.get<unknown, PlayerModel[]>('/players', config);
	}

	findPlayer(params: { id: number }, config?: AxiosRequestConfig): Promise<PlayerModel> {
		return this.axiosInstance.get<unknown, PlayerModel>(`/players${this.requestParamsToString(params)}`, config);
	}

	fetchPlayerSeasonAverages(params: { seasons: number; 'player_ids[]': number }, config?: AxiosRequestConfig): Promise<SeasonAveragesModel> {
		return this.axiosInstance.get<unknown, SeasonAveragesModel>(`/season_averages${this.requestParamsToString(params)}`, config);
	}
}
