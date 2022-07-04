import { ReactComponent as TooltipIcon } from 'assets/svg/tooltip-trigger.svg';
import { useOverlayContextValue } from "context/overlay-context";
import "./styles/light.scss";
import "./styles/menu-button.scss";

export const OptionsButton = ({ taskId, targetIsProject, targetIsTask, project, projectId, isHeaderButton, taskIsImportant }) => {
  const { setShowDialog, setDialogProps } = useOverlayContextValue();
  const menuTriggerHandler = (event, elementPosition) => {
    event.stopPropagation();
    event.preventDefault();

    setDialogProps(
      Object.assign(
        { elementPosition, taskIsImportant },
        targetIsTask && { taskId: taskId, targetIsTask: targetIsTask },
        targetIsProject && { projectId: projectId, targetIsProject: targetIsProject, project: project }
      )
    );
    setShowDialog("MENU_LIST");
  };

  return (
    <button
      className={`menu__trigger ${isHeaderButton ? "menu__trigger--header" : ""}`}
      onClick={(event) => menuTriggerHandler(event, event.currentTarget.getBoundingClientRect())}
    >
      <TooltipIcon/>
    </button>
  );
};
