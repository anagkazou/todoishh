import moment from "moment";
export const Date = () => {
  return <small className="today__date">{moment().format("ddd MMM D")}</small>;
};
