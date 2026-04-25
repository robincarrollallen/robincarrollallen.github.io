import { TIME_FORMATS } from '~/enums/time';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(timezone);
dayjs.extend(utc);

/** 格式化时间为日期 */
export function formatTimeByDay(time: string | number | Date | Dayjs, format = TIME_FORMATS.DATE_TIME) {
  const date = dayjs(time);
  
  return date.format(format);
}