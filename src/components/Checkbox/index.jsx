import featherIcon from "assets/svg/feather-sprite.svg";
import { updateDoc, where, query, getDocs, collection } from "firebase/firestore";
import { useAuth } from "hooks";
import { db } from "_firebase";
export const TaskCheckbox = ({ taskId }) => {
  const { currentUser } = useAuth();

  const completeTaskHandler = async (event) => {
    event.preventDefault();
    try {
      const taskQuery = await query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("taskId", "==", taskId));
      const taskDocs = await getDocs(taskQuery);
      taskDocs.forEach(async (taskDoc) => {
        await updateDoc(taskDoc.ref, {
          completed: true,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="task__checkbox" onClick={(event) => completeTaskHandler(event)}>
      <svg
        className="task__checkbox--icon"
        width="12"
        height="12"
        fill="none"
        stroke="#fff"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <use xlinkHref={`${featherIcon}#check`}></use>
      </svg>
    </div>
  );
};
