import { PlayerPositions } from 'src/components/Position/types';

export function getPlayerPositions(val: string): PlayerPositions[] {
	const playerPositions: PlayerPositions[] = [];

	if (!val) {
		return [PlayerPositions.NoPosition];
	}

	if (!val.length) {
		return [PlayerPositions.NoPosition];
	}

	val.split('-')
		.sort()
		.map((letter) => {
			switch (letter) {
				case 'G': {
					playerPositions.push(PlayerPositions.Guard);
					break;
				}
				case 'F': {
					playerPositions.push(PlayerPositions.Forward);
					break;
				}
				case 'C': {
					playerPositions.push(PlayerPositions.Center);
					break;
				}
			}
		});

	return playerPositions;
}
