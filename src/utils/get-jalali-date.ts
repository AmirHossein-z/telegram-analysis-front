import dayjs from "dayjs";

const getJalaliDate = (date: Date | string) => {
  return dayjs(date).calendar("jalali").locale("fa").format("DD MMMM YYYY");
};

export default getJalaliDate;
