import { ReactComponent as EmptyState2Dark } from "assets/svg/empty-2-dark.svg";
import { ReactComponent as EmptyState2Light } from "assets/svg/empty-2-light.svg";
import { ReactComponent as EmptyStateToday2Dark } from "assets/svg/empty-2-today-dark.svg";
import { ReactComponent as EmptyStateToday2Light } from "assets/svg/empty-2-today-light.svg";
import { ReactComponent as EmptyState3Dark } from "assets/svg/empty-3-dark.svg";
import { ReactComponent as EmptyState3Light } from "assets/svg/empty-3-light.svg";
import { ReactComponent as EmptyStateInboxDark } from "assets/svg/empty-inbox-dark.svg";
import { ReactComponent as EmptyStateInboxLight } from "assets/svg/empty-inbox-light.svg";
import { ReactComponent as EmptyStateLight } from "assets/svg/empty-light.svg";
import { ReactComponent as EmptyStateTodayDark } from "assets/svg/empty-today-dark.svg";
import { ReactComponent as EmptyStateTodayLight } from "assets/svg/empty-today-light.svg";
import { ReactComponent as EmptyStateDark } from "assets/svg/empty.svg";
import { useTaskEditorContextValue, useThemeContextValue } from "context";
import { useParams } from "react-router-dom";
const index = Math.floor(Math.random() * 2);

export const EmptyState = () => {
  const { isLight } = useThemeContextValue();
  const { defaultGroup } = useParams();
  const { taskEditorToShow, setTaskEditorToShow } = useTaskEditorContextValue();
  const getRandomEmptyStateIllustration = () => {
    const emptyStateIllustrationsDark = [<EmptyStateDark />, <EmptyState2Dark />, <EmptyState3Dark />];
    const emptyStateIllustrationsLight = [<EmptyStateLight />, <EmptyState2Light />, <EmptyState3Light />];
    const emptyStateIllustrationsDarkToday = [<EmptyStateTodayDark />, <EmptyStateToday2Dark />];
    const emptyStateIllustrationsLightToday = [<EmptyStateTodayLight />, <EmptyStateToday2Light />];

    switch (defaultGroup) {
      case "Today":
        return isLight ? emptyStateIllustrationsLightToday[index] : emptyStateIllustrationsDarkToday[index];

      case "Inbox":
        return isLight ? <EmptyStateInboxLight /> : <EmptyStateInboxDark />;

      default:
        return isLight ? emptyStateIllustrationsLight[index] : emptyStateIllustrationsDark[index];
    }
  };

  const getEmptyStateText = () => {
    switch (defaultGroup) {
      case "Today":
        return (
          <>
            <p className="empty-state__header"> Get a clear view of the day ahead</p>
            <p className="empty-state__body">All your tasks that are due today will show up here.</p>{" "}
            {/* <button onClick={()=> } className="empty-state__button">Add Task</button> */}
          </>
        );
      case "Inbox":
        return (
          <>
            <p className="empty-state__header"> All clear</p>
            <p className="empty-state__body">Looks like everything's organized in the right place.</p>
          </>
        );
      case "Important":
        return (
          <>
            <p className="empty-state__header"> High priority!</p>
            <p className="empty-state__body">Tasks that you set to be important will show up here.</p>
          </>
        );

      default:
        return (
          <>
            <p className="empty-state__header"> Keep your tasks organized in projects</p>
            <p className="empty-state__body">Group your tasks by goal or area of your life.</p>{" "}
          </>
        );
    }
  };

  return (
    <div className="empty-state">
      <div className="empty-state__illustration">{getRandomEmptyStateIllustration()} </div>

      {getEmptyStateText()}
      <button
        className="empty-state__button"
        onClick={(e) => {
          setTaskEditorToShow("NEW");
        }}
      >
        Add Task
      </button>
    </div>
  );
};
