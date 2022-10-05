import { GameModel } from './Game';
import { PGStatsModel } from './PGStats';
import { PlayerModel } from './Player';
import { TeamModel } from './Team';

export interface PlayerPGStatsModel extends PGStatsModel {
	game: GameModel;
	player: PlayerModel;
	team: TeamModel;
}
