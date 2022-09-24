import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { isNil, reduce } from 'lodash';

export class HTTPRequestService {
	protected axiosInstance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.axiosInstance = axios.create(config);
		// this.setInterceptors();
	}

	// private setInterceptors() {
	// 	this.axiosInstance.interceptors.request.use(
	// 		() => {},
	// 		(err) => {}
	// 	);
	// }

	protected requestParamsToString(args: { [x: string]: unknown }): string {
		return reduce<{ [x: string]: unknown }, Array<string>>(
			args,
			(acc, cur, key) => {
				if (!isNil(cur)) {
					acc.push(`${key}=${cur as string}`);
				}
				return acc;
			},
			[]
		).join('&');
	}
}
