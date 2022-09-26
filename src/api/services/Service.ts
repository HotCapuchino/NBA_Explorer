import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { isNil, reduce } from 'lodash';

export class HTTPRequestService {
	protected axiosInstance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.axiosInstance = axios.create(config);
	}

	protected requestParamsToString(args: { [x: string]: string | number }): string {
		return reduce<{ [x: string]: string | number }, Array<string>>(
			args,
			(acc, cur, key) => {
				if (!isNil(cur)) {
					acc.push(`${key}=${String(cur)}`);
				}
				return acc;
			},
			[]
		).join('&');
	}
}
