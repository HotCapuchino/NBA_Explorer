import { makeObservable, observable, action } from 'mobx';
import { BasicStore } from './BasicStore';
import { PlayerInfoModel, PlayerInfoParams, PlayerRepository, PlayerRepositoryInterface } from 'src/domainLayer/PlayerRepository';
import { PlayerModel } from 'src/dataLayer/balldontlie/models/Player';
import { PlayerSeasonAverageStatsModel } from 'src/dataLayer/balldontlie/models/SeasonAverages';
import { BallDontLieResponseStructure, FetchPlayerSeasonAveragesParams, FetchPlayerStatsParams } from 'src/dataLayer/balldontlie/types';
import { PlayerPGStatsModel } from 'src/dataLayer/balldontlie/models/PlayerPGStats';

export class PlayerStore extends BasicStore {
	repository: PlayerRepositoryInterface = new PlayerRepository();
	players: BallDontLieResponseStructure<PlayerModel[]> = { data: [], meta: null };
	selectedPlayer: PlayerInfoModel = null;

	constructor() {
		super();
		makeObservable(this, {
			players: observable,
			selectedPlayer: observable,
			fetchPlayers: action,
			getPlayerInfo: action,
			getSeasonStats: action,
		});
	}

	async fetchPlayers(page?: number, search = ''): Promise<void> {
		const iterator = this.repository.getPlayers({ page, per_page: this.entriesPerPage, search });

		for await (const res of iterator) {
			this.players = res;
		}
	}

	async getPlayerInfo(params: Partial<PlayerInfoParams>): Promise<void> {
		const iterator = this.repository.getPlayerInfo(params);

		for await (const res of iterator) {
			this.selectedPlayer = res;
		}
	}

	async getSeasonStats(params: Partial<FetchPlayerSeasonAveragesParams>): Promise<PlayerSeasonAverageStatsModel> {
		const seasonAverages = await this.repository.getSeasonStats(params);
		this.selectedPlayer.seasonAverages = seasonAverages.length > 0 ? seasonAverages[0] : null;

		return this.selectedPlayer.seasonAverages;
	}

	async getPlayerGameStats(params: Partial<FetchPlayerStatsParams>): Promise<BallDontLieResponseStructure<PlayerPGStatsModel>> {
		const pgs = await this.repository.getPlayerGameStats(params);
		this.selectedPlayer.gameStats = pgs;

		return pgs;
	}
}
