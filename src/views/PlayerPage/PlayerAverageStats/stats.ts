import { PlayerSeasonAverageStatsModel } from 'src/dataLayer/balldontlie/models/SeasonAverages';

const seasonStats: ColumnNames<PlayerSeasonAverageStatsModel, string> = [
	{ label: 'Games played this season', key: 'games_played' },
	{ label: 'Minutes played', key: 'min' },
	{ label: 'Points', key: 'pts' },
];

const overallStats: ColumnNames<PlayerSeasonAverageStatsModel, string> = [
	{ label: 'Assists', key: 'ast' },
	{ label: 'Steals', key: 'stl' },
	{ label: 'Blocks', key: 'blk' },
	{ label: 'Turnovers', key: 'turnover' },
	{ label: 'Fouls', key: 'pf' },
];

const fieldGoalsStats: ColumnNames<PlayerSeasonAverageStatsModel, string> = [
	{ label: 'Field goals made', key: 'fgm' },
	{ label: 'Field goals attempted', key: 'fga' },
	{ label: 'Field goals percentage', key: 'fg_pct' },
];

const threePointGoals: ColumnNames<PlayerSeasonAverageStatsModel, string> = [
	{ label: 'Three point field goals made', key: 'fg3m' },
	{ label: 'Three point field goals attempted', key: 'fg3a' },
	{ label: 'Three point field goals percentage', key: 'fg3_pct' },
];

const freeThrowsGoals: ColumnNames<PlayerSeasonAverageStatsModel, string> = [
	{ label: 'Free throws made', key: 'ftm' },
	{ label: 'Free throws attempted', key: 'fta' },
	{ label: 'Free throws percentage', key: 'ft_pct' },
];

const reboundStats: ColumnNames<PlayerSeasonAverageStatsModel, string> = [
	{ label: 'Rebounds', key: 'reb' },
	{ label: 'Offensive rebounds', key: 'oreb' },
	{ label: 'Defensive rebounds', key: 'dreb' },
];

export const infoBlocksMap = [
	{ label: 'Overall stats', stats: seasonStats },
	{ label: 'Game stats', stats: overallStats },
	{ label: 'Field goals stats', stats: fieldGoalsStats },
	{ label: 'Three point stats', stats: threePointGoals },
	{ label: 'Free trows stats', stats: freeThrowsGoals },
	{ label: 'Rebound stats', stats: reboundStats },
];
