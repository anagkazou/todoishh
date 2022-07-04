import { ConfrimDeleteProject } from "components/ConfirmDeleteProject";
import { SetNewTaskProjectPopper } from "components/dropdowns/set-new-task-project-popper";
import { SetNewTaskSchedulePopper } from "components/dropdowns/set-new-task-schedule-popper";
import { MenuList } from "components/MenuList";
import { UserOptions } from "components/UserOption";
import { ViewOptions } from "components/ViewOptions";
import { useOverlayContextValue } from "context/overlay-context";
import { useEffect } from "react";
import "./main.scss";
import { ProjectEditor } from "./ProjectEditor";
import { QuickAddTaskDialog } from "./quick-add-task-dialog";
export const Overlay = () => {
  const { showDialog, setShowDialog, dialogProps, setDialogProps } = useOverlayContextValue();
  const closeOverlay = () => {
    setShowDialog("");
  };
  useEffect(() => {
    setShowDialog(false);
  }, []);
  const renderSwitch = (params) => {
    switch (showDialog) {
      case "ADD_PROJECT":
        return <ProjectEditor closeOverlay={closeOverlay} />;
      case "QUICK_ADD_TASK":
        return <QuickAddTaskDialog closeOverlay={closeOverlay} />;
      case "USER_OPTIONS":
        return (
          <UserOptions closeOverlay={closeOverlay} xPosition={dialogProps.elementPosition.x} yPosition={dialogProps.elementPosition.y} />
        );
      case "VIEW_OPTIONS":
        return (
          <ViewOptions
            closeOverlay={closeOverlay}
            xPosition={dialogProps.elementPosition.x}
            yPosition={dialogProps.elementPosition.y}
            projectId={dialogProps.projectId}
          />
        );
      case "MENU_LIST":
        return (
          <MenuList
            closeOverlay={closeOverlay}
            taskId={dialogProps.taskId}
            projectId={dialogProps.projectId}
            xPosition={dialogProps.elementPosition.x}
            yPosition={dialogProps.elementPosition.y}
            targetIsProject={dialogProps.targetIsProject}
            targetIsTask={dialogProps.targetIsTask}
            taskIsImportant={dialogProps.taskIsImportant}
          />
        );
      case "SET_SCHEDULE":
        return (
          <SetNewTaskSchedulePopper
            closeOverlay={closeOverlay}
            setSchedule={dialogProps.setSchedule}
            projectId={dialogProps.projectId}
            xPosition={dialogProps.elementPosition.x}
            yPosition={dialogProps.elementPosition.y}
          />
        );
      case "SET_PROJECT":
        return (
          <SetNewTaskProjectPopper
            closeOverlay={closeOverlay}
            setProject={dialogProps.setProject}
            projectId={dialogProps.projectId}
            xPosition={dialogProps.elementPosition.x}
            yPosition={dialogProps.elementPosition.y}
            setPopupSelectedProject={dialogProps.setPopupSelectedProject}
          />
        );
      case "EDIT_PROJECT":
        return <ProjectEditor isEdit projectToEdit={dialogProps.project} closeOverlay={closeOverlay} />;

      case "CONFIRM_DELETE":
        return <ConfrimDeleteProject closeOverlay={closeOverlay} projectId={dialogProps.projectId} />;
    }
  };
  return <>{renderSwitch(showDialog)}</>;
};
