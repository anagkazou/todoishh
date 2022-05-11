import { useProjects } from "hooks";
import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProjectInfo } from "utils";
export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const param = useParams();
  const { projectId, defaultGroup } = useParams();
  //TODO: Find out why Params (projectid and defaultGroup) is undefined here
  const { projects } = useProjects();
  // useEffect(() => {
  //   if (defaultGroup) {
  //     setSelectedProject({ selectedProjectName: defaultGroup, defaultProject: true });
  //   }
  //   if (projectId) {
  //     const projectInfo = getProjectInfo(projects, projectId);
  //     setSelectedProject();
  //   }
  // }, [defaultGroup, projectId]);

  const defaultState = { selectedProjectName: "Inbox", defaultProject: true };

  const [selectedProject, setSelectedProject] = useState(defaultState);

  return <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>{children}</SelectedProjectContext.Provider>;
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
