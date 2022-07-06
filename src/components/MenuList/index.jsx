import { ReactComponent as ArchiveIcon } from "assets/svg/archive.svg";
import { ReactComponent as DeleteIcon } from "assets/svg/delete.svg";
import { ReactComponent as EditIcon } from "assets/svg/edit.svg";
import featherIcon from "assets/svg/feather-sprite.svg";
import { useOverlayContextValue, useTaskEditorContextValue } from "context";
import { collection, deleteDoc, getDocs, query, setDoc, where } from "firebase/firestore";
import { useAuth } from "hooks";
import { useNavigate } from "react-router-dom";
import { db } from "_firebase";
import "./styles/light.scss";
import "./styles/menu-list.scss";

export const MenuList = ({
  closeOverlay,
  taskId,
  xPosition,
  yPosition,
  targetIsProject,
  projectId,
  targetIsTask,
  taskIsImportant,
  targetIsBoardTask,
}) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { setTaskEditorToShow } = useTaskEditorContextValue();
  const { setShowDialog, showDialog, setDialogProps } = useOverlayContextValue();
  const deleteHandler = async (e) => {
    e.stopPropagation();
    closeOverlay();
    if (targetIsProject) {
      setDialogProps({ projectId: projectId });
      setShowDialog("CONFIRM_DELETE");
      return;
    }

    //setSelectedProject({ selectedProjectName: "Inbox", defaultProject: true });
    try {
      const q = await query(
        collection(db, "user", `${currentUser && currentUser.id}/${targetIsProject ? "projects" : "tasks"}`),
        where(`${targetIsProject ? "projectId" : "taskId"}`, "==", targetIsProject ? projectId : taskId)
      );
      const docs = await getDocs(q);
      docs.forEach(async (taskDoc) => {
        await deleteDoc(taskDoc.ref);
      });
      targetIsProject && navigate("/app/Inbox");
    } catch (error) {
      console.log(error);
    }
    try {
      const taskQuery = await query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("projectId", "==", projectId));
      const taskDocs = await getDocs(taskQuery);
      taskDocs.forEach(async (taskDoc) => {
        await deleteDoc(taskDoc.ref);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const importanceHandler = async () => {
    closeOverlay();

    try {
      const taskQuery = await query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("taskId", "==", taskId));
      const taskDocs = await getDocs(taskQuery);
      taskDocs.forEach(async (taskDoc) => {
        await setDoc(taskDoc.ref, {
          ...taskDoc.data(),
          important: !taskIsImportant,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (targetIsTask) {
      console.log(taskId);
      setTaskEditorToShow(taskId);
      closeOverlay(e);
    } else {
      setShowDialog("EDIT_PROJECT");
    }
  };
  const computeXPosition = () => {
    let computedXPosition;
    if (!targetIsBoardTask) {
      const { innerWidth: width } = window;

      computedXPosition = xPosition - 100;

      if (width < 1200 && width - xPosition < 100) {
        computedXPosition = xPosition - 130;
      } else if (width < 900 && width - xPosition > 100) {
        computedXPosition = xPosition + 150;
      }
    } else {
      computedXPosition = xPosition;
      console.log("BOARDDD", targetIsBoardTask);
    }

    return computedXPosition;
  };

  return (
    <div
      className="option__overlay"
      onClick={(e) => {
        e.stopPropagation();
        closeOverlay(e);
      }}
    >
      <div className="menu__list" style={{ top: `${yPosition}px`, left: `${computeXPosition()}px` }}>
        <ul>
          <li className="menu__list--item" onClick={(e) => editHandler(e)}>
            <div className="menu__list--icon">
              <EditIcon />
            </div>
            <span className="menu__list--content">Edit {targetIsProject ? "Project" : "Task"}</span>
          </li>

          <li className="menu__list--item" onClick={(e) => deleteHandler(e)}>
            <div className="menu__list--icon">
              <DeleteIcon />
            </div>

            <span className="menu__list--content">Delete {targetIsProject ? "Project" : "Task"}</span>
          </li>

          {targetIsProject && (
            <li className="menu__list--item" style={{ opacity: 0.5 }}>
              <div className="menu__list--icon">
                <ArchiveIcon />
              </div>

              <span className="menu__list--content">Archive Project</span>
            </li>
          )}

          {targetIsTask && (
            <li className="menu__list--item" onClick={() => importanceHandler()}>
              <div className="menu__list--icon">
                <svg width="21" height="21" stroke="currentColor" fill="none" strokeWidth="1">
                  <use width="21" height="21" href={`${featherIcon}#star`}></use>
                </svg>
              </div>

              <span className="menu__list--content">{taskIsImportant ? "Remove" : "Add"} Importance </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
