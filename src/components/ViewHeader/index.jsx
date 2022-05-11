import { Date } from "components/date";
import { ProjectName } from "components/ProjectName";
import { useProjects, useSelectedProjectInfo } from "hooks";
import { useParams } from "react-router-dom";
import { getProjectInfo } from "utils";
import { OptionsButton } from "../MenuButton";
import { SelectViewType } from "../SelectViewTypeButton";
import "./styles/light.scss";
import "./styles/main.scss";

export const ViewHeader = () => {
  const { projectId } = useParams();
  const { defaultGroup } = useParams();
  const projectInfo = useSelectedProjectInfo(projectId && projectId);
  const currentView = projectInfo && projectInfo[0]?.projectIsList;
  const { projects } = useProjects();
  const project = getProjectInfo(projects, projectId);
  return (
    <div className={`${currentView || defaultGroup ? "view-header__list" : "view-header__board"} `}>
      <div className="view-header__actions--left">
        <ProjectName />
        {defaultGroup == "Today" && <Date />}
      </div>

      {projectId && (
        <div className="view-header__actions--right">
          <SelectViewType />
          <OptionsButton projectId={projectId} isHeaderButton targetIsProject project={project} />
        </div>
      )}
    </div>
  );
};
