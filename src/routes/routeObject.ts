export const routes = {
	index: '/',
	players: {
		index: '/players',
		player: '/player/:id',
		openPlayer: (playerId: number) => `/player/${playerId}`,
	},
	teams: {
		index: '/teams',
	},
	games: {
		index: '/games',
		game: '/game/:id',
		openGame: (gameId: number) => `/game/${gameId}`,
	},
};
