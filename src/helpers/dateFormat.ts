import moment from 'moment';
import { Moment } from 'moment';

export const formatDate = (date: Moment | string): string => moment(date).format('YYYY-MM-DD');
