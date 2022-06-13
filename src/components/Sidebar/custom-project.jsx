import { useSelectedProjectValue } from "../../context/selected-project-context";
import { useTasks , useSelectedProject, useProjects} from "../../hooks";
import { useEffect, useState } from "react";
import { OptionsButton } from "components/MenuButton";
import { ProjectTasksCounts } from "./project-tasks-count";
import { NavLink } from "react-router-dom";
import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";
import { ReactComponent as Dot } from "assets/svg/dot.svg";
import { useParams } from "react-router-dom";
export const CustomProject = ({ project }) => {
  const params = useParams();
  const { projects } = useProjects();
  const { setSelectedProject, selectedProject } = useSelectedProject(params, projects);  
  // const current = useSelectedProjectValue().selectedProject.selectedProjectId;
  const [currentTaskProp, setCurrentTaskProp] = useState([]);
  const { setTasks } = useTasks();
  useEffect(() => {
    setCurrentTaskProp(project);
  }, [project]);

  return (
    <NavLink
      to={`/project/${project.projectId}`}
      className={({ isActive }) => (isActive ? "active default-project-group" : "default-project-group")}
      role="button"
      onClick={() => {
        // setSelectedProject({ selectedProjectName: project.name, selectedProjectId: project.projectId, ...project });
      }}
    >
      <div className="default-project-group__group">
        <div className="default-project-group__icon">
          {/* <div className="custom-project__dot" style={{ backgroundColor: `${project?.projectColour?.hex}` }}></div> */}
          {/* <InboxIcon fill="#246fe0" /> */}
          <Dot color={`${project?.projectColour?.hex}`} />
        </div>
        <p className="default-project-group__name">{currentTaskProp.name}</p>
      </div>

      <OptionsButton projectId={project.projectId} targetIsProject project={project} />
      <ProjectTasksCounts projectId={project.projectId} />
    </NavLink>
  );
};
