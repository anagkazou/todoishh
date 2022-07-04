import { useEffect, useState } from "react";
import { getProjectInfo } from "utils";

export const useSelectedProject = ({ defaultGroup, projectId }, projects) => {
  const defaultState = { selectedProjectName: "Inbox", defaultProject: true };
  const [selectedProject, setSelectedProject] = useState(defaultState);
  useEffect(() => {
    if (defaultGroup) {
      setSelectedProject(defaultState);
    }
    if (projectId) {
      const projectInfo = getProjectInfo(projects, projectId);
      setSelectedProject({ selectedProjectName: projectInfo?.name, selectedProjectId: projectInfo?.projectId, ...projectInfo });
    }
  }, [defaultGroup, projectId, projects]);
  return { selectedProject, setSelectedProject, defaultState };
};
