import { ReactComponent as HelpIcon } from "assets/svg/help.svg";
export const Info = () => {
  return <a className="github_link header-clickable">
    <HelpIcon strokeWidth={.1}/>
  </a>;
};
