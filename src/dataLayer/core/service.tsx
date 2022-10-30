import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { isNil, isUndefined, reduce } from 'lodash';
import moment from 'moment';
import React from 'react';
import NotificationSnackbar from 'src/components/NotificationSnackbar';
import { formatDate } from 'src/helpers/dateFormat';
import { showNotification } from 'src/helpers/notification';
import { PaginationParams, RequestParams } from './types';


export class HTTPRequestService {
	axiosInstance: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.axiosInstance = axios.create({
			...config,
			paramsSerializer: (params: RequestParams) => {
				const concatenatedParams = reduce<RequestParams, Array<string>>(
					params,
					(acc, cur, key) => {
						if (!isNil(cur) && !isUndefined(cur)) {
							if (Array.isArray(cur)) {
								cur.forEach((val) => {
									acc.push(`${key}=${moment.isMoment(val) ? formatDate(val) : String(val)}`);
								});
							} else {
								acc.push(`${key}=${moment.isMoment(cur) ? formatDate(cur) : String(cur)}`);
							}
						}
						return acc;
					},
					[]
				).join('&');

				return concatenatedParams.length ? concatenatedParams : '';
			}
		});
		this.setInterceptors();
	}

	private setInterceptors(): void {
		this.axiosInstance.interceptors.response.use(
			(response) => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                return response.data;
			},
			(err: AxiosError) => {
				this.catchError(err);
			}
		);
	}

	private catchError(err: AxiosError): void {
		const code = Number(err.status);
		const errorMessage = err.message;

		if (code < 500) {
			this.notificateAboutError(<div>Something unpredictable happened: {errorMessage}</div>);
		} else {
			this.notificateAboutError(
				<div>
					<div>Client error:</div>
					<div>{errorMessage}</div>
				</div>
			);
		}
	}

	private notificateAboutError(err: React.ReactElement | React.ReactNode): void {
		showNotification(
			<NotificationSnackbar alert={{severity: 'error'}}>
				<>{err}</>
			</NotificationSnackbar>
		);
	}

	protected fetchPaginatedData<T, K>(endpointURL: string, params: K extends PaginationParams ? K : PaginationParams, config?: AxiosRequestConfig): Promise<T> {
		return this.axiosInstance.get<unknown, T>(endpointURL, {...config, params});
	}
}