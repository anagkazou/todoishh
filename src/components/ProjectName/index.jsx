import { useProjects, useSelectedProject } from "hooks";
import { useParams } from "react-router-dom";
import { getProjectTitle } from "utils";
import "./styles/project-name.scss";
export const ProjectName = () => {
  const params = useParams();
    const { projectId, defaultGroup } = params;

  const { projects } = useProjects();
  const { setSelectedProject, selectedProject } = useSelectedProject(params, projects); 

  const { selectedProjectName } = selectedProject;
  const customProjectTitle = getProjectTitle(projects, projectId);
  return <h1 className="project__name">{customProjectTitle || defaultGroup}</h1>;
};
//CHange every instance of selected preojecta dn use useparams instead