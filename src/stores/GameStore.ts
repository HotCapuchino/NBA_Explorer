import { makeObservable, observable, action } from 'mobx';
import { GameModel } from 'src/dataLayer/balldontlie/models/Game';
import { FetchGamesParams, BallDontLieResponseStructure } from 'src/dataLayer/balldontlie/types';
import { GameRepositoryInterface, GameRepository } from 'src/domainLayer/GameRepository';
import { BasicStore } from './BasicStore';

export class GameStore extends BasicStore {
	repository: GameRepositoryInterface = new GameRepository();
	games: BallDontLieResponseStructure<GameModel[]> = { data: [], meta: null };
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

	async fetchGamesByFilters(params: FetchGamesParams): Promise<void> {
		const iterator = this.repository.fetchGames(params);

		for await (const res of iterator) {
			this.games = res;
		}
	}

	async findGame(gameId: number): Promise<GameModel> {
		const chosenGame = this.games.data.find((game) => game.id === gameId);

		if (chosenGame) {
			this.selectedGame = chosenGame;
		} else {
			this.selectedGame = (await this.repository.findGame(gameId).next()).value;
		}

		return this.selectedGame;
	}
}
