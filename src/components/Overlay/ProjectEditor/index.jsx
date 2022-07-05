import featherIcon from "assets/svg/feather-sprite.svg";
import { useOverlayContextValue } from "context/overlay-context";
import { collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useAuth, useProjects } from "hooks";
import { useEffect, useState } from "react";
import { generatePushId } from "utils/index";
import { db } from "_firebase";
import { SetProjectColourDropdown } from "./set-project-colour";
import "./styles/add-project.scss";
import "./styles/light.scss";
export const ProjectEditor = ({ closeOverlay, isEdit, projectToEdit }) => {
  const { currentUser } = useAuth();
  const [projectName, setprojectName] = useState(isEdit && projectToEdit.name);
  const [projectColour, setProjectColour] = useState(
    isEdit
      ? projectToEdit.projectColour
      : {
          name: "Charcoal",
          hex: "#808080",
        }
  );
  const [projectIsList, setProjectIsList] = useState(isEdit ? projectToEdit.projectIsList : true);
  const [showSelectColourDropdown, setShowSelectColourDropdown] = useState(false);
  const { setProjects } = useProjects();
  const [selectedColour, setSelectedColour] = useState(projectColour);
  const projectId = generatePushId();
  const { setShowDialog } = useOverlayContextValue();
  const [disableSubmit, setDisableSubmit] = useState(isEdit ? false : true);

  const updateProjectHandler = async (e) => {
    e.preventDefault();
    const taskQuery = await query(
      collection(db, "user", `${currentUser && currentUser.id}/projects`),
      where("projectId", "==", projectToEdit.projectId)
    );
    const taskDocs = await getDocs(taskQuery);
    taskDocs.forEach(async (taskDoc) => {
      await updateDoc(taskDoc.ref, {
        name: projectName,
        projectColour: projectColour,
        projectIsList: projectIsList,
      });
    });
  };

  useEffect(() => {
    setSelectedColour(projectColour);

    return () => {
      setSelectedColour(null);
    };
  }, [projectColour]);

  const addProjectHandler = async (e) => {
    e.preventDefault();
    const newProject = {
      name: projectName,
      projectId: projectId,
      projectColour: projectColour,
      projectIsList: projectIsList,
    };
    const projectsDocRef = doc(collection(db, "user", `${currentUser && currentUser.id}/projects`));
    setShowDialog("");
    await setDoc(projectsDocRef, newProject).then(() => {
      setProjects({ ...newProject });
    });
  };

  const handleChange = (e) => {
    const projectNameInputValue = e.target.value;
    if (!projectNameInputValue.length) {
      setDisableSubmit(true);
    } else {
      setDisableSubmit(false);
    }
    setprojectName(e.target.value);
  };
  return (
    <div className="overlay" onClick={(event) => closeOverlay(event)}>
      <div className="add-project__modal" onClick={(event) => event.stopPropagation()}>
        <header className="add-project__modal--header">
          <h4>{isEdit ? "Edit" : "Add"} Project</h4>
        </header>
        <div className="add-project__modal--content">
          <form action="" autoComplete="off" onSubmit={(e) => addProjectHandler(e)}>
            <div className="add-project__form-group">
              <label>Name</label>
              <input
                className="add-project__project-name"
                type="text"
                name="projectName"
                id="projectName"
                maxLength={12}
                minLength={2}
                value={projectName || ""}
                onChange={(e) => handleChange(e)}
                required
              />
            </div>
            <div className="add-project__form-group" role="button">
              <label>Color</label>
              <div className="add-project__select-color" onClick={() => setShowSelectColourDropdown(!showSelectColourDropdown)}>
                <span className="add-project__selected-color" style={{ backgroundColor: `${selectedColour.hex}` }} />
                <span className="add-project__selected-color-name">{selectedColour.name}</span>
                {showSelectColourDropdown && (
                  <SetProjectColourDropdown
                    setProjectColour={setProjectColour}
                    projectColour={projectColour}
                    showSelectColourDropdown={showSelectColourDropdown}
                    setShowSelectColourDropdown={setShowSelectColourDropdown}
                  />
                )}
              </div>
            </div>
            <div className="add-project__form-group">
              <label>View</label>
              <div className="add-project__set-view-type">
                <div
                  className={`${projectIsList ? "selected" : ""} add-project__set-view-type--option`}
                  onClick={() => setProjectIsList(true)}
                >
                  <div className="add-project__set-view-type--preview preview__list" />
                  <div className="add-project__set-view-type--description">
                    <div className="add-project__set-view-type--radio">
                      <svg
                        width="11"
                        height="11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <use xlinkHref={`${featherIcon}#check`}></use>
                      </svg>
                    </div>
                    <p className="add-project__set-view-type--name">List</p>
                  </div>
                </div>
                <div
                  className={`${!projectIsList ? "selected" : ""} add-project__set-view-type--option`}
                  onClick={() => setProjectIsList(false)}
                >
                  <div className="add-project__set-view-type--preview preview__board" />
                  <div className="add-project__set-view-type--description">
                    <div className="add-project__set-view-type--radio">
                      <svg width="11" height="11" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <use xlinkHref={`${featherIcon}#check`}></use>
                      </svg>
                    </div>
                    <p className="add-project__set-view-type--name">Board</p>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <footer className="add-project__modal--footer">
          <div className="add-project__modal--buttons">
            <button className="action action__cancel" type="button" onClick={() => setShowDialog(!setShowDialog)}>
              Cancel
            </button>
            <button
              className="action action__add-project"
              type="submit"
              disabled={disableSubmit}
              onClick={(e) => {
                e.preventDefault();
                isEdit ? updateProjectHandler(e) : addProjectHandler(e);
              }}
            >
              {isEdit ? "Save" : "Add"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
