import { makeObservable, observable, action } from 'mobx';
import { BasicStore } from './BasicStore';
import { PlayerRepository, PlayerRepositoryInterface } from 'src/domainLayer/PlayerRepository';
import { PlayerModel } from 'src/dataLayer/balldontlie/models/Player';

export class PlayerStore extends BasicStore {
	repository: PlayerRepositoryInterface = new PlayerRepository();
	players: PlayerModel[] = [];
	selectedPlayer: PlayerModel = null;

	constructor() {
		super();
		makeObservable(this, {
			players: observable,
			selectedPlayer: observable,
			fetchPlayers: action,
			findPlayer: action,
		});
	}

	async fetchPlayers(page?: number, search = ''): Promise<PlayerModel[]> {
		const { data, meta } = await this.repository.getPlayers({ page, per_page: this.entriesPerPage, search });

		return data;
	}

	async findPlayer(playerId: number): Promise<PlayerModel> {
		const chosenPlayer = this.players.find((player) => player.id === playerId);

		if (chosenPlayer) {
			this.selectedPlayer = chosenPlayer;
		} else {
			this.selectedPlayer = await this.repository.getPlayer(playerId);
		}

		return this.selectedPlayer;
	}
}
