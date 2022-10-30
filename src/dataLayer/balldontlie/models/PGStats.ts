import { TeamModel } from './Team';
import { PlayerModel } from 'src/dataLayer/balldontlie/models/Player';
import { GameModel } from 'src/dataLayer/balldontlie/models/Game';
export interface PGStatsModel {
	// minutes played
	min: string;
	// field goals made
	fgm: number;
	// field goals attempted
	fga: number;
	// field goals percentage
	fg_pct: number;
	// three-point field goals made
	fg3m: number;
	// three-point field goals attempted
	fg3a: number;
	// three-point field goals percentage
	fg3_pct: number;
	// free-throws made
	ftm: number;
	// free-throws attempted
	fta: number;
	// free-throws percentage
	ft_pct: number;
	// rebounds
	reb: number;
	// offensive rebounds
	oreb: number;
	// defensive rebounds
	dreb: number;
	// assists
	ast: number;
	// steals
	stl: number;
	// blocks
	blk: number;
	turnover: number;
	// personal fouls
	pf: number;
	// points
	pts: number;
	game: GameModel;
	player: PlayerModel;
	team: TeamModel;
}
