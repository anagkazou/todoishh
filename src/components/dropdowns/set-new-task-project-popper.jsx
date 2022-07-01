import featherIcon from "assets/svg/feather-sprite.svg";
import { ReactComponent as InboxIcon } from "assets/svg/inbox.svg";
import { useProjects } from "hooks";
import "./main.scss";

export const SetNewTaskProjectPopper = ({
  setShowPopup,
  showPopup,
  isQuickAdd,
  setProject,
  setPopupSelectedProject,
  xPosition,
  yPosition,
  closeOverlay,
  parentPosition,
}) => {
  const { projects } = useProjects();
  // const [popupSelectedProject, setPopupSelectedProject] = useState(project);
  const setProjectHandler = (project) => {
    setProject({ selectedProjectName: project.name, selectedProjectId: project.projectId, ...project });
    setPopupSelectedProject({ selectedProjectName: project.name, selectedProjectId: project.projectId, ...project });
  };
  const setProjectAsInbox = () => {
    setProject({ selectedProjectName: "Inbox", selectedProjectId: "" });
    setPopupSelectedProject({ selectedProjectName: "Inbox", selectedProjectId: "", defaultProject: true });
  };

  const targetedposition = parentPosition ? parentPosition : { x: xPosition, y: yPosition };

  return (
    <div
      className="option__overlay"
      onClick={(event) => {
        event.stopPropagation();
        isQuickAdd ? setShowPopup(!showPopup) : closeOverlay(event);
      }}
    >
      <div
        className="set-project__popper"
        // onClick={(event) => event.stopPropagation()}
        style={{ top: `${targetedposition.y }px`, left: `${targetedposition.x}px` }}
      >
        <ul>
          <li className="set-project__popper--option" onClick={() => setProjectAsInbox()}>
            <div className="set-project__popper--option-icon">
              <InboxIcon fill="#FF9A14" />
            </div>
            <p className="set-new-task__project--name">Inbox</p>
          </li>
          {projects &&
            projects.map((project) => (
              <li key={project.projectId} className="set-project__popper--option" onClick={() => setProjectHandler(project)}>
                <div className="set-project__popper--option-icon">
                  <svg
                    className=""
                    width="11"
                    height="11"
                    fill={`${project?.projectColour?.hex}`}
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <use href={`${featherIcon}#circle`}></use>
                  </svg>
                </div>

                <p className="set-new-task__project--name">{project.name}</p>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};
