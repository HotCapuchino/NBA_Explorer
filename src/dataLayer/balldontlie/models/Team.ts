import { WithPictureModel } from './WithPicture';
import { DivisionEnum } from './Division';
import { ConferenceEnum } from './Conference';

export interface TeamModel extends WithPictureModel {
	id: number;
	abbreviation: string;
	city: string;
	conference: ConferenceEnum;
	division: DivisionEnum;
	full_name: string;
	name: string;
}
