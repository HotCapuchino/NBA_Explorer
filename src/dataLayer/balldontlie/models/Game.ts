import { TeamModel } from './Team';

export interface GameModel {
	id: number;
	date: string;
	home_team: TeamModel;
	home_team_score: number;
	period: number;
	postseason: boolean;
	season: number;
	status: string;
	visitor_team: TeamModel;
	visitor_team_score: number;
}
