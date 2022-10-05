import { PGStatsModel } from './PGStats';

export interface PlayerSeasonAverageStatsModel extends PGStatsModel {
	player_id: number;
	games_played: number;
	season: number;
}
