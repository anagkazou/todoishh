import { collection, onSnapshot } from "firebase/firestore";
import { useAuth } from "hooks";
import { useEffect, useState } from "react";
import { db } from "_firebase";

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuth();
    useEffect(() => {
      setLoading(true);
      onSnapshot(collection(db, "user", `${currentUser && currentUser.id}/projects`), (snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));
  
        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
        setLoading(false);
      });
    }, [projects, currentUser]);
  
    return { projects, setProjects, loading };
  };
  