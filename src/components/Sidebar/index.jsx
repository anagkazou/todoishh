import { useSelectedProjectValue } from "context/selected-project-context";
import { defaultTaskGroups } from "constants/constants";
import "./styles/main.scss";
import "./styles/light.scss";
import { CustomProjects } from "./custom-projects";
import { DefaultProjects } from "./default-projects";
import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";

export const Sidebar = (props) => {
  return (
    <>
      <div className="sidebar__overlay" onClick={props.onClick}></div>
      <aside className="sidebar">
        <div className="sidebar__wrapper">
          <div className="sidebar-clickables">
            <DefaultProjects />
          </div>
          <CustomProjects />
          {/* <Labels/> */}
        </div>
      </aside>
    </>
  );
};
