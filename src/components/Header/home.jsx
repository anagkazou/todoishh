import { ReactComponent as HomeIcon } from "assets/svg/home.svg";
import { useProjects, useSelectedProject } from "hooks";
import { Link, useParams } from "react-router-dom";
export const HomeButton = () => {
  const params = useParams();
  const { projects } = useProjects();
  const { setSelectedProject, selectedProject } = useSelectedProject(params, projects);
  return (
    <Link
      to="/app/Inbox"
      className="home_button header-clickable"
      onClick={() => setSelectedProject({ selectedProjectName: "Inbox", defaultProject: true })}
    >
      {/* <svg width="19" height="19" fill="none" strokeWidth="1.2">
        <use href={`${featherIcon}#home`}></use>
      </svg> */}
      <HomeIcon strokeWidth=".1" />
    </Link>
  );
};
