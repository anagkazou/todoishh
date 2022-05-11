import { ReactComponent as HamburgerIcon } from "assets/svg/hamburger.svg";

export const HamburgerButton = (props) => {
  return (
    <div role="button" onClick={props.onClick} className="hamburger_button header-clickable">
      {/* <svg width="19" height="19"  fill="none" strokeWidth="1.2">
        <use href={`${featherIcon}#menu`}></use>
      </svg> */}
      <HamburgerIcon strokeWidth={0.1} />
    </div>
  );
};
