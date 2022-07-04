import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { db } from "_firebase";

export const useSelectedProjectInfo = (projectId) => {
  const [projectInfo, setProjectInfo] = useState();
  const { currentUser } = useAuth();

  useEffect(() => {
    if (projectId) {
      const projectQuery = query(collection(db, "user", `${currentUser && currentUser.id}/projects`), where("projectId", "==", projectId));
      const unsubscribe = onSnapshot(projectQuery, (querySnapshot) => {
        let project = querySnapshot.docs.map((project) => ({
          ...project.data(),
        }));

        setProjectInfo(project);
      });
      return unsubscribe;
    }
  }, [projectId]);

  return projectInfo;
};
