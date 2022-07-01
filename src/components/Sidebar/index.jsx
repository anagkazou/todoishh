import { CustomProjects } from "./custom-projects";
import { DefaultProjects } from "./default-projects";
import "./styles/light.scss";
import "./styles/main.scss";

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
