import { ReactComponent as InfoIcon } from "assets/svg/info.svg";
import { ReactComponent as CancelIcon } from "assets/svg/plus.svg";
import { collection, deleteDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth, useProjects } from "hooks";
import { useNavigate } from "react-router-dom";
import { getProjectTitle } from "utils";
import { db } from "_firebase";
import "./light.scss";
import "./main.scss";
export const ConfrimDeleteProject = ({ projectId, closeOverlay }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const deleteHandler = async (e) => {
    //   setSelectedProject({ selectedProjectName: "Inbox", defaultProject: true });
    e.stopPropagation();
    e.preventDefault();
    try {
      const q = await query(collection(db, "user", `${currentUser && currentUser.id}/"projects"`), where("projectId", "==", projectId));
      const docs = await getDocs(q);
      docs.forEach(async (projectDoc) => {
        await deleteDoc(projectDoc.ref);
      });
    } catch (error) {
      console.log(error);
    }
    try {
      const taskQuery = await query(
        collection(db, "user", `${currentUser && currentUser.id}/projects`),
        where("projectId", "==", projectId)
      );
      const projectDocs = await getDocs(taskQuery);
      projectDocs.forEach(async (projectDoc) => {
        await deleteDoc(projectDoc.ref);
      });
    } catch (error) {
      console.log(error);
    }
    navigate("/app/Inbox");

    closeOverlay();
  };

  const { projects } = useProjects();
  const projectName = getProjectTitle(projects, projectId);
  return (
    <div className="overlay" onClick={(event) => closeOverlay(event)}>
      <div className="confirm-delete">
        <form action="">
          <header>
            <button>
              <InfoIcon
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            </button>
            <button onClick={(e) => closeOverlay(e)}>
              <CancelIcon width={29} height={29} />
            </button>
          </header>

          <div className="confirm-delete__content">Are you sure you want to delete {projectName}?</div>
          <footer>
            <button className="action action__cancel--dark">Cancel</button>
            <button className="action action__delete-project" onClick={(e) => deleteHandler(e)}>
              Delete
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
};
