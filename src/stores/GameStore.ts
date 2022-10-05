import { makeObservable, observable, action } from 'mobx';
import { GameModel } from 'src/dataLayer/balldontlie/models/Game';
import { FetchGamesParams } from 'src/dataLayer/balldontlie/types';
import { GameRepositoryInterface, GameRepository } from 'src/domainLayer/GameRepository';
import { BasicStore } from './BasicStore';

export class GameStore extends BasicStore {
	repository: GameRepositoryInterface = new GameRepository();
	games: GameModel[] = [];
	selectedGame: GameModel = null;

	constructor() {
		super();
		makeObservable(this, {
			games: observable,
			selectedGame: observable,
			fetchGamesByFilters: action,
			findGame: action,
		});
	}

	async fetchGamesByFilters(params: FetchGamesParams): Promise<GameModel[]> {
		const { data, meta } = await this.repository.fetchGames(params);
		this.games = data;

		return this.games;
	}

	async findGame(gameId: number): Promise<GameModel> {
		const chosenGame = this.games.find((game) => game.id === gameId);

		if (chosenGame) {
			this.selectedGame = chosenGame;
		} else {
			this.selectedGame = await this.repository.findGame(gameId);
		}

		return this.selectedGame;
	}
}
