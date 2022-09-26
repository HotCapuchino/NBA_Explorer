import { GameService } from './GameService';
import { AxiosRequestConfig } from 'axios';
import { isNil } from 'lodash';
import { PlayerService } from './PlayerService';
import { TeamService } from './TeamService';

export class API {
	playerService: PlayerService;
	teamService: TeamService;
	gameService: GameService;

	private static api: API = null;

	static init(): API {
		if (isNil(API.api)) {
			const singletoneInstance = new API();
			API.api = singletoneInstance;

			return singletoneInstance;
		}

		return API.api;
	}

	private constructor() {
		const config = this.createConfig();

		this.playerService = new PlayerService(config);
		this.teamService = new TeamService(config);
		this.gameService = new GameService(config);
	}

	private createConfig(): AxiosRequestConfig {
		return {
			baseURL: 'https://www.balldontlie.io/api/v1',
		};
	}
}
