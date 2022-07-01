import featherIcon from "assets/svg/feather-sprite.svg";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAuth } from "hooks";
import { db } from "_firebase";


export const ViewOptions = ({ closeOverlay, xPosition, yPosition, projectId }) => {
  const { currentUser } = useAuth();

  const setProjectView = async (viewIsList) => {
    try {
      const projectQuery = await query(
        collection(db, "user", `${currentUser && currentUser.id}/projects`),
        where("projectId", "==", projectId)
      );
      const projectDocs = await getDocs(projectQuery);
      projectDocs.forEach(async (projectDoc) => {
        await updateDoc(projectDoc.ref, {
          projectIsList: viewIsList,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="option__overlay" onClick={(e) => closeOverlay(e)}>
      <div className="menu__list" style={{ top: `${yPosition}px`, left: `${xPosition}px` }}>
        <ul>
          <li role="button" className="menu__list--item" onClick={() => setProjectView(true)}>
            <div className="menu__list--icon">
              <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1px">
                <use href={`${featherIcon}#align-justify`}></use>
              </svg>
            </div>

            <span className="menu__list--content">List</span>
          </li>
          <li role="button" className="menu__list--item" onClick={() => setProjectView(false)}>
            <div className="menu__list--icon">
              <svg width="18" height="18" stroke="currentColor" fill="none" strokeWidth="1px">
                <use href={`${featherIcon}#columns`}></use>
              </svg>
            </div>

            <span className="menu__list--content">Board</span>
          </li>
        </ul>
      </div>
    </div>
  );
};
