import { ReactComponent as SliderIcon } from 'assets/svg/toggle-view.svg';
import { useOverlayContextValue } from "context";
import { useProjects, useSelectedProject } from "hooks";
import { useParams } from "react-router-dom";
import "./styles/light.scss";
import "./styles/main.scss";

export const SelectViewType = () => {
  const params = useParams();
  const { projects } = useProjects();
  const { selectedProject } = useSelectedProject(params, projects);
  const { setShowDialog, setDialogProps } = useOverlayContextValue();
  const onClickHandler = (elementPosition) => {
    setDialogProps(Object.assign({ elementPosition }, { projectId: selectedProject.selectedProjectId }));
    setShowDialog("VIEW_OPTIONS");
  };
  return (
    <button
      role="button"
      type="button"
      className="view-header__action view-options"
      onClick={(event) => onClickHandler(event.currentTarget.getBoundingClientRect())}
    >
      <SliderIcon strokeWidth=".1"/>

      <span>View</span>
    </button>
  );
};
