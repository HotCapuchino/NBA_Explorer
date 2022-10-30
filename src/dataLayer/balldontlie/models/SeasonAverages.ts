import { PGStatsModel } from './PGStats';

export interface PlayerSeasonAverageStatsModel extends Omit<PGStatsModel, 'game' | 'player' | 'team'> {
	player_id: number;
	games_played: number;
	season: number;
}
