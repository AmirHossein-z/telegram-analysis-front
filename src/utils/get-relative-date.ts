import dayjs from "dayjs";
import "dayjs/locale/fa";
import jalaliPlugin from "@zoomit/dayjs-jalali-plugin";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
dayjs.extend(jalaliPlugin);
dayjs.calendar("jalali");
dayjs.locale("fa");

const getRelativeDate = (date: Date | string, dateFrom = new Date()) => {
  if (dayjs(date).diff(dateFrom, "day") <= 0) {
    return dayjs(date).from(dateFrom);
  }
  return `${dayjs(date).from(dateFrom)} پیش`;
};

export default getRelativeDate;
