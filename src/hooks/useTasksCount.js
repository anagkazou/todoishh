import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "hooks";
import moment from "moment";
import { useEffect, useState } from "react";
import { db } from "_firebase";

export const useTasksCount = (isDefaultGroup, projectId, name) => {
  const { currentUser } = useAuth();
  const [taskCount, setTaskCount] = useState();

  useEffect(() => {
    let q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`));
    if (!isDefaultGroup) {
      q = query(
        collection(db, "user", `${currentUser && currentUser.id}/tasks`),
        where("projectId", "==", projectId),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name == "Today") {
      q = query(
        collection(db, "user", `${currentUser && currentUser.id}/tasks`),
        where("date", "==", moment().format("DD-MM-YYYY"), where("completed", "==", false))
      );
    } else if (isDefaultGroup && name === "Inbox") {
      q = query(
        collection(db, "user", `${currentUser && currentUser.id}/tasks`),
        where("projectId", "==", ""),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name === "Important") {
      q = query(
        collection(db, "user", `${currentUser && currentUser.id}/tasks`),
        where("important", "==", true),
        where("completed", "==", false)
      );
    } else if (isDefaultGroup && name === "Scheduled") {
      q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "!=", ""), where("completed", "==", false));
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let numOfTasks = querySnapshot.docs.length;
      setTaskCount(numOfTasks);
    });
    return unsubscribe;
  }, [isDefaultGroup, projectId]);

  return taskCount;
};
