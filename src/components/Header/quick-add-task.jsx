import { ReactComponent as PlusIcon } from "assets/svg/plus.svg";
import { useOverlayContextValue } from "context";
export const QuickAddTask = () => {
  const { setShowDialog } = useOverlayContextValue();

  return (
    <div className="quick-add-task header-clickable" onClick={() => setShowDialog("QUICK_ADD_TASK")}>
      <PlusIcon strokeWidth={.1} width={28} height={28} />
    </div>
  );
};
