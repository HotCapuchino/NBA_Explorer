import { AxiosRequestConfig } from 'axios';
import { HTTPRequestService } from 'src/dataLayer/core/service';
import { TeamModel } from '../models/Team';
import { BallDontLieResponseStructure } from '../types';

export class TeamService extends HTTPRequestService implements TeamServiceInterface {
	fetchTeams(config?: AxiosRequestConfig): Promise<BallDontLieResponseStructure<TeamModel[]>> {
		return this.axiosInstance.get('/teams', config);
	}
}

export interface TeamServiceInterface {
	fetchTeams: (config?: AxiosRequestConfig) => Promise<BallDontLieResponseStructure<TeamModel[]>>;
}
