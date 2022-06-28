import { collection, doc, getDocs, onSnapshot, where, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "context/AuthContext";
import { db } from "_firebase";
import { collatedTasksExist, getProjectInfo } from "utils";
import moment from "moment";

export { useAuth } from "./useAuth";
export { useBoardData } from "./useBoardData";
export { useSelectedProjectInfo } from "./useSelectedProjectInfo";
export { useTasksCount } from "./useTasksCount";
export { useTasks } from "./useTasks";
export { useSelectedProject } from "./useSelectedProject";
export { useProjects } from "./useProjects";

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const useProjects = () => {
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { currentUser } = useAuth();
//   useEffect(() => {`
//     setLoading(true);
//     onSnapshot(collection(db, "user", `${currentUser && currentUser.id}/projects`), (snapshot) => {
//       const allProjects = snapshot.docs.map((project) => ({
//         ...project.data(),
//         docId: project.id,
//       }));

//       if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
//         setProjects(allProjects);
//       }
//       setLoading(false);
//     });
//   }, [projects, currentUser]);

//   return { projects, setProjects, loading };
// };

// export const useSelectedProject = ({ defaultGroup, projectId }, projects) => {
//   const defaultState = { selectedProjectName: "Inbox", defaultProject: true };
//   const [selectedProject, setSelectedProject] = useState(defaultState);
//   useEffect(() => {
//     if (defaultGroup) {
//       setSelectedProject(defaultState);
//     }
//     if (projectId) {
//       const projectInfo = getProjectInfo(projects, projectId);
//       setSelectedProject({ selectedProjectName: projectInfo?.name, selectedProjectId: projectInfo?.projectId, ...projectInfo });
//     }
//   }, [defaultGroup, projectId, projects]);
//   return { selectedProject, setSelectedProject, defaultState };
// };

// export const useTasksCount = (isDefaultGroup, projectId, name) => {
//   const { currentUser } = useAuth();
//   const [taskCount, setTaskCount] = useState();

//   useEffect(() => {
//     let q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`));
//     if (!isDefaultGroup) {
//       q = query(
//         collection(db, "user", `${currentUser && currentUser.id}/tasks`),
//         where("projectId", "==", projectId),
//         where("completed", "==", false)
//       );
//     } else if (isDefaultGroup && name == "Today") {
//       q = query(
//         collection(db, "user", `${currentUser && currentUser.id}/tasks`),
//         where("date", "==", moment().format("DD-MM-YYYY"), where("completed", "==", false))
//       );
//     } else if (isDefaultGroup && name == "Inbox") {
//       q = query(
//         collection(db, "user", `${currentUser && currentUser.id}/tasks`),
//         where("projectId", "==", ""),
//         where("completed", "==", false)
//       );
//     } else if (isDefaultGroup && name == "Important") {
//       q = query(
//         collection(db, "user", `${currentUser && currentUser.id}/tasks`),
//         where("important", "==", true),
//         where("completed", "==", false)
//       );
//     } else if (isDefaultGroup && name == "Scheduled") {
//       q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "!=", ""), where("completed", "==", false));
//     }
//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       let numOfTasks = querySnapshot.docs.length;
//       setTaskCount(numOfTasks);
//     });
//     return unsubscribe;
//   }, [isDefaultGroup, projectId]);

//   return taskCount;
// };

// export const useSelectedProjectInfo = (projectId) => {
//   const { currentUser } = useAuth();
//   const [projectInfo, setProjectInfo] = useState();

//   useEffect(() => {
//     if (projectId) {
//       const projectQuery = query(collection(db, "user", `${currentUser && currentUser.id}/projects`), where("projectId", "==", projectId));
//       const unsubscribe = onSnapshot(projectQuery, (querySnapshot) => {
//         let project = querySnapshot.docs.map((project) => ({
//           ...project.data(),
//         }));

//         setProjectInfo(project);
//       });
//       return unsubscribe;
//     }
//   }, [projectId]);

//   return projectInfo;
// };

// export const useTasks = () => {
//   const { projectId, defaultGroup } = useParams();
//   const selectedProject = projectId || defaultGroup;

//   const { currentUser } = useAuth();
//   const [tasks, setTasks] = useState([]);
//   const [importantTasks, setImportantTasks] = useState([]);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);

//     let q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`));
//     if (selectedProject && !collatedTasksExist(selectedProject)) {
//       q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("projectId", "==", selectedProject));
//     } else if (selectedProject === "Today") {
//       q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "==", moment().format("DD-MM-YYYY")));
//     } else if (selectedProject === "Inbox" || selectedProject === 0) {
//       q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("projectId", "==", ""));
//     } else if (selectedProject === "Scheduled") {
//       //TODO: this is still buggy...something about query indexes because you are doing more than one query
//       q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("date", "!=", ""), where("completed", "==", false));
//     } else if (selectedProject === "Important") {
//       q = query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("important", "==", true));
//     }

//     const unsubscribe = onSnapshot(q, (querySnapshot) => {
//       const result = [];
//       querySnapshot.forEach((doc) => {
//         if (doc.data()?.completed !== true) {
//           result.push(doc.data());
//         }
//       });

//       if (selectedProject === "Scheduled") {
//         let sevenDaysTasks = result.filter((task) => moment(task.date, "DD-MM-YYYY").diff(moment(), "days") <= 7);
//         setTasks(sevenDaysTasks);
//         setLoading(false);
//       } else {
//         setTasks(result);
//       }
//     });

//     return unsubscribe;
//   }, [selectedProject, currentUser]);
//   return { setTasks, tasks, importantTasks, completedTasks, loading };
// };

// export const useBoardData = (selectedProject) => {
//   const { tasks } = useTasks(selectedProject.selectedProjectId ?? selectedProject.selectedProjectName);
//   // const { tasks } = useTasks(selectedProject.selectedProjectId ? selectedProject.selectedProjectId : selectedProject.selectedProjectName);
//   const data = {};
//   const [boardData, setBoardData] = useState();
//   let getColumnTasks = (column) => {
//     return tasks.filter((task) => task.boardStatus == column);
//   };
//   useEffect(() => {
//     data.tasks = Object.assign({}, tasks);
//     let todoTasks = getColumnTasks("TODO");
//     let completeTasks = getColumnTasks("COMPLETE");
//     let inprogressTasks = getColumnTasks("INPROGRESS");
//     data.columns = {
//       TODO: {
//         id: "TODO",
//         title: "To do",
//         columnTasks: todoTasks,
//         hex: "#b8255f",
//       },
//       INPROGRESS: {
//         id: "INPROGRESS",
//         title: "In Progress",
//         columnTasks: inprogressTasks,
//         hex: "#ff9933",
//       },
//       COMPLETE: {
//         id: "COMPLETE",
//         title: "Complete",
//         columnTasks: completeTasks,
//         hex: "#299438",
//       },
//     };
//     data.columnOrder = ["TODO", "INPROGRESS", "COMPLETE"];

//     setBoardData(data);
//   }, [tasks]);

//   return boardData;
// };
