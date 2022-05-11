import { collatedTasks } from "../constants";
import { useProjects } from "../hooks";
export const collatedTasksExist = (selectedProject) => collatedTasks.find((task) => task.key === selectedProject);
export const getCollatedTitle = (projects, key) => projects.find((project) => project.key === key);
export const getTitle = (projects, projectId) => projects.find((project) => project.projectId === projectId);
export const getProjectTitle = (projects, projectId) => {
  let project = projects.find((project) => project.projectId === projectId);
  return project?.name;
};
export const getProjectInfo = (projects, projectId) => {
  return projects.find((project) => project.projectId === projectId);
};
export const generatePushId = (() => {
  const PUSH_CHARS = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";

  const lastRandChars = [];

  return function () {
    let now = new Date().getTime();

    const timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }

    let id = timeStampChars.join("");

    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }

    return id;
  };
})();

export const getProjectId = (projects, projectName) => projects.find((project) => project.name === projectName);
export const getProjectHex = (projects, projectId) => projects.find((project) => project.projectId == projectId);
