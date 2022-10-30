export interface PositionProps {
	position: PlayerPositions | PlayerPositions[];
}

export enum PlayerPositions {
	Guard = 'Guard',
	Forward = 'Forward',
	Center = 'Center',
	NoPosition = 'Position is not determined',
}
