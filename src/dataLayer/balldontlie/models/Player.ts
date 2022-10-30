import { TeamModel } from './Team';
import { WithPictureModel } from './WithPicture';

export interface PlayerModel extends WithPictureModel {
	id: number;
	first_name: string;
	last_name: string;
	height_feet?: number;
	height_inches?: number;
	position: string;
	weight_pounds?: number;
	team: TeamModel;
}
