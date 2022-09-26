import { AxiosRequestConfig } from 'axios';
import { TeamModel } from './../models/Team';
import { HTTPRequestService } from './Service';

export class TeamService extends HTTPRequestService {
	fetchTeams(config?: AxiosRequestConfig): Promise<TeamModel[]> {
		return this.axiosInstance.get<unknown, TeamModel[]>('/teams', config);
	}

	// findTeam(params: {}, config?: AxiosRequestConfig): Promise<TeamModel> {
	// 	return null;
	// }
}
