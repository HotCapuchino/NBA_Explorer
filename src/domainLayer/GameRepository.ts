import { GameModel } from 'src/dataLayer/balldontlie/models/Game';
import { BallDontLieAPI } from 'src/dataLayer/balldontlie/services';
import { GameServiceInterface } from 'src/dataLayer/balldontlie/services/GameService';
import { BallDontLieResponseStructure, FetchGamesParams } from 'src/dataLayer/balldontlie/types';
import { LocalStorageInterface, StorageAdapter } from 'src/dataLayer/storage';
import { RepositoryInterface } from './types';

export class GameRepository implements GameRepositoryInterface {
	// DI (?)
	remoteDataSource: GameServiceInterface = BallDontLieAPI.init().gameService;
	localDataSource: LocalStorageInterface = StorageAdapter.init();

	async fetchGames(params: FetchGamesParams): Promise<BallDontLieResponseStructure<GameModel[]>> {
		return await this.remoteDataSource.fetchGames(params);
	}

	async findGame(id: number): Promise<GameModel> {
		const { data } = await this.remoteDataSource.findGame(id);

		return data;
	}
}

export interface GameRepositoryInterface extends RepositoryInterface<GameServiceInterface> {
	fetchGames: (params: FetchGamesParams) => Promise<BallDontLieResponseStructure<GameModel[]>>;
	findGame: (id: number) => Promise<GameModel>;
}
