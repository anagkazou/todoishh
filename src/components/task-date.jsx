import { ReactComponent as ScheduleIcon } from "assets/svg/scheduler.svg";
import moment from "moment";

export const TaskDate = ({ date }) => {
  moment.defaultFormat = "DD-MM-YYYY";

  const isToday = moment(date).isSame(moment().format("DD-MM-YYYY"));

  const isYesterday = moment(date).isSame(moment().subtract(1, "day").format("DD-MM-YYYY"));
  const isTomorrow = moment(date).isSame(moment().add(1, "day").format("DD-MM-YYYY"));
  const isNextWeek = moment(date).isSame(moment().add(7, "day").format("DD-MM-YYYY"));
  const isPast = moment(date).isBefore(moment().format("DD-MM-YYYY"));
  const isWeekend = moment(date, moment.defaultFormat).format("dddd") == ("Saturday" || "Sunday");
  //console.log("DATE!!!!!!!!!!!!!", moment(date, moment.defaultFormat).format("dddd"), isWeekend, date);

  //todo: rename this function
  const getDateCustomClass = () => {
    if (isToday) {
      return "date__today";
    }
    if (isTomorrow) {
      return "date__tomorrow";
    }
    if (isPast || isYesterday) {
      return "date__overdue";
    }
    if (isNextWeek) {
      return "date__next-week";
    }
    if (isWeekend) {
      return "date__weekend";
    }
  };
  const getDayName = () => {
    if (isToday) {
      return "Today";
    }
    if (isTomorrow) {
      return "Tomorrow";
    }
    if (isYesterday) {
      return "Yesterday";
    }
    if (isWeekend) {
      return moment(date, moment.defaultFormat).format("dddd");
    }
    return moment(date, moment.defaultFormat).format("MMM DD");
  };
  return (
    <span className={`task__date ${getDateCustomClass()}`}>
      <ScheduleIcon width="14px" height="14px" />
      {/* {moment(date, moment.defaultFormat).format("DD MMM")} */}
      {getDayName()}
    </span>
  );
};
