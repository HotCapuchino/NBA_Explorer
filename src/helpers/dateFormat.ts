import { Moment } from 'moment';

export const formatDate = (date: Moment): string => date.format('YYYY-MM-DD');
