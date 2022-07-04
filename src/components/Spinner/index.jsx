import { ReactComponent as SpinnerIconLight } from "assets/svg/spinner-light.svg";
import { ReactComponent as SpinnerIconDark } from "assets/svg/spinner.svg";
import "./main.scss";
export const Spinner = ({ light }) => {
  return !light ? <SpinnerIconLight className="ring__spinner" /> : <SpinnerIconDark className="ring__spinner" />;
};
