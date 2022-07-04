import { ReactComponent as Dot } from "assets/svg/dot.svg";
import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";

export const TaskProject = ({ projectHexColour, projectName }) => {

  return (
    <div className="task__project-info">
      {projectName ? (
        <>
          <span>{projectName}</span>
          <Dot color={`${projectHexColour}`} width={13} height={13} />
        </>
      ) : (
        <>
          <span>Inbox</span>

          <InboxIcon width={13} height={13} fill="#5297ff" />
        </>
      )}
    </div>
  );
};
