import { GameService } from './GameService';
import { AxiosRequestConfig } from 'axios';
import { isNil } from 'lodash';
import { PlayerService } from './PlayerService';
import { TeamService } from './TeamService';

export class BallDontLieAPI {
	playerService: PlayerService;
	teamService: TeamService;
	gameService: GameService;

	private static api: BallDontLieAPI = null;

	static init(): BallDontLieAPI {
		if (isNil(BallDontLieAPI.api)) {
			const singletoneInstance = new BallDontLieAPI();
			BallDontLieAPI.api = singletoneInstance;

			return singletoneInstance;
		}

		return BallDontLieAPI.api;
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
