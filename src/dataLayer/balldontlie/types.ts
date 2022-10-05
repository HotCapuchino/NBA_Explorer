import { PaginationParams } from '../core/types';
import { MetaInformationModel } from './models/MetaInformation';

export interface BallDontLieResponseStructure<T> {
	data: T;
	meta: MetaInformationModel;
}

export interface GamesParams extends PaginationParams {
	'dates[]'?: string[];
	'seasons[]'?: number[];
	postseason?: boolean;
	start_date?: string;
	end_date?: string;
}

export interface FetchGamesParams extends GamesParams {
	'team_ids[]'?: number[];
}

export interface FetchPlayersParams extends PaginationParams {
	search: string;
}

export interface FetchPlayerStatsParams extends GamesParams {
	'player_ids[]'?: number[];
	'game_ids[]'?: number[];
}

export interface FetchPlayerSeasonAveragesParams {
	'seasons[]': number;
	'player_ids[]': number[];
}
