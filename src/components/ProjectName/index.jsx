import "./styles/project-name.scss";
import { useSelectedProjectValue } from "context";
import { useParams } from "react-router-dom";
import { getProjectTitle } from "utils";
import { useProjects } from "hooks";
export const ProjectName = () => {
  const { selectedProject } = useSelectedProjectValue();
  const {projects} = useProjects()

  const { selectedProjectName } = selectedProject;
  const { projectId, defaultGroup } = useParams();
  const customProjectTitle = getProjectTitle(projects, projectId);
  return <h1 className="project__name">{customProjectTitle || defaultGroup}</h1>;
};
//CHange every instance of selected preojecta dn use useparams instead