import { action, computed, makeObservable, observable } from 'mobx';
import { BasicStore } from './BasicStore';
import { TeamRepository, TeamRespositoryInterface } from 'src/domainLayer/TeamRepository';
import { TeamModel } from 'src/dataLayer/balldontlie/models/Team';
import { DivisionEnum } from 'src/dataLayer/balldontlie/models/Division';
import { ConferenceEnum } from 'src/dataLayer/balldontlie/models/Conference';

export class TeamStore extends BasicStore {
	repository: TeamRespositoryInterface = new TeamRepository();
	teams: TeamModel[] = [];

	constructor() {
		super();
		makeObservable(this, {
			teams: observable,
			fetchTeams: action,
			eastConferenceTeams: computed,
			westConferenceTeams: computed,
		});
	}

	get eastConferenceTeams(): Map<DivisionEnum, TeamModel[]> {
		const eastTeamsMap = new Map<DivisionEnum, TeamModel[]>();

		if (!this.teams) return eastTeamsMap;
		this.teams.forEach((team) => {
			if (team.conference === ConferenceEnum.East) {
				if (eastTeamsMap.has(team.division)) {
					eastTeamsMap.set(team.division, [...eastTeamsMap.get(team.division), team]);
				} else {
					eastTeamsMap.set(team.division, [team]);
				}
			}
		});

		return eastTeamsMap;
	}

	get westConferenceTeams(): Map<DivisionEnum, TeamModel[]> {
		const westTeamsMap = new Map<DivisionEnum, TeamModel[]>();

		if (!this.teams) return westTeamsMap;
		this.teams.forEach((team) => {
			if (team.conference === ConferenceEnum.West) {
				if (westTeamsMap.has(team.division)) {
					westTeamsMap.set(team.division, [...westTeamsMap.get(team.division), team]);
				} else {
					westTeamsMap.set(team.division, [team]);
				}
			}
		});

		return westTeamsMap;
	}

	async fetchTeams(): Promise<void> {
		const iterator = this.repository.fetchTeams();

		for await (const res of iterator) {
			this.teams = res;
		}
	}
}
