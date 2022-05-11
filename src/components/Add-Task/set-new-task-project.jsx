import { useSelectedProjectValue } from "context/selected-project-context";
import featherIcon from "assets/svg/feather-sprite.svg";
import { useState, useEffect } from "react";
import { SetNewTaskProjectPopper } from "../dropdowns/set-new-task-project-popper";
import { useOverlayContextValue } from "context";
import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";
import { useParams } from "react-router-dom";
import { useProjects, useSelectedProject } from "hooks";
import { ReactComponent as Dot } from "assets/svg/dot.svg";
export const SetNewTaskProject = ({ isQuickAdd, project, closeOverlay, xPosition, yPosition, setProject }) => {
  const params = useParams();
  // const { selectedProject } = useSelectedProjectValue(params);
  const { projects } = useProjects();
  const { selectedProject, defaultGroup } = useSelectedProject(params, projects);
  const [popupSelectedProject, setPopupSelectedProject] = useState(selectedProject);
  const { setShowDialog, setDialogProps } = useOverlayContextValue();
  const [showPopup, setShowPopup] = useState(false);
  const [parentPosition, setParentPosition] = useState({});

  useEffect(() => {
    console.log('PROJECT333', project);
    if (!project.defaultProject) {
      setPopupSelectedProject(project);
    } else {
      setPopupSelectedProject({ selectedProjectName: "Inbox", selectedProjectId: "", defaultProject: true });
    }
  }, [project]);
  const showQUickAddDropDown = (parentPosition) => {
    setParentPosition(parentPosition);
    setShowPopup(true);

    console.log("PARENTPOS", parentPosition);
  };
  return (
    <div
      className="set-new-task__project"
      role="button"
      onClick={(e) => {
        setDialogProps(
          Object.assign({ elementPosition: e.currentTarget.getBoundingClientRect() }, { setProject, setPopupSelectedProject })
        );
        isQuickAdd ? showQUickAddDropDown(e.currentTarget.getBoundingClientRect()) : setShowDialog("SET_PROJECT");
      }}
    >
      {popupSelectedProject?.selectedProjectName === "Inbox" ? (
        <InboxIcon width="18px" height="18px" fill="#5297ff" />
      ) : (
        <Dot color={`${project?.projectColour?.hex}`} width={17} height={17} />
      )}
      <p className="set-new-task__project--name">{popupSelectedProject.selectedProjectName}</p>
      {showPopup && (
        <SetNewTaskProjectPopper
          setShowPopup={setShowPopup}
          project={project}
          setProject={setProject}
          setPopupSelectedProject={setPopupSelectedProject}
          parentPosition={parentPosition}
          isQuickAdd={isQuickAdd}
          showPopup={showPopup}
        />
      )}
    </div>
  );
};
