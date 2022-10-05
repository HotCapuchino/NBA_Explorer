export const routes = {
	index: '/',
	players: {
		index: '/players',
		player: '/player/:id',
		openPlayer: (playerId: number) => `/player/${playerId}`,
	},
	teams: {
		index: '/teams',
		// team: 'team/:id',
		// openTeam: (teamId: number) => `team/${teamId}`,
	},
	games: {
		index: '/games',
	},
};
