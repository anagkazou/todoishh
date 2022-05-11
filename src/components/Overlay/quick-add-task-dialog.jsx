import { AddTask } from "components/Add-Task";
export const QuickAddTaskDialog = ({ closeOverlay }) => {
  return (
    <div className="option__overlay" onClick={(event) => closeOverlay(event)}>
      <div className="quick-add-task__wrapper">
        <AddTask isQuickAdd closeOverlay={closeOverlay} />
      </div>
    </div>
  );
};
