import { useOverlayContextValue } from "context/overlay-context";
import "./main.scss";
import { useEffect } from "react";
import { AddProject } from "./AddProject";
import { MenuList } from "components/MenuList";
import { QuickAddTaskDialog } from "./quick-add-task-dialog";
import { UserOptions } from "components/UserOption";
import { ViewOptions } from "components/ViewOptions";
import { useAuth } from "hooks";
//TODO: fix these names
import { SetNewTaskSchedulePopup } from "components/dropdowns/set-new-task-schedule-popup";
import { SetNewTaskProjectPopper } from "components/dropdowns/set-new-task-project-popper";
import { ConfrimDeleteProject } from "components/ConfirmDeleteProject";
export const Overlay = () => {
  const { showDialog, setShowDialog, dialogProps, setDialogProps } = useOverlayContextValue();
  const closeOverlay = () => {
    setShowDialog("");
  };
  //TODO: Refactor so you can efficiently spread dialog props into components
  useEffect(() => {
    setShowDialog(false);
  }, []);
  const renderSwitch = (params) => {
    switch (showDialog) {
      case "ADD_PROJECT":
        return <AddProject closeOverlay={closeOverlay} />;
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
          <SetNewTaskSchedulePopup
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
        return <AddProject isEdit projectToEdit={dialogProps.project} closeOverlay={closeOverlay} />;

      case "CONFIRM_DELETE":
        console.log("OPOPOPOPOPOP");
        return <ConfrimDeleteProject closeOverlay={closeOverlay} projectId={dialogProps.projectId} />;
    }
  };
  return <>{renderSwitch(showDialog)}</>;
};
