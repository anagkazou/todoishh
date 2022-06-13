import React, { useState } from "react";
import { Tasks } from "components/Tasks";
import { useSelectedProjectValue } from "context/selected-project-context";
import { useSelectedProjectInfo, useTasks, useProjects, useSelectedProject } from "hooks";
import { TaskList } from "components/ListView";
import { Board } from "components/Board/index";
import { useParams } from "react-router-dom";
import "./styles/content.scss";
import "./styles/light.scss";
import { TaskEditorContextProvider } from "context/board-add-task-context";
export const Content = () => {
  const params = useParams();
  const { projects } = useProjects();
  const { setSelectedProject, selectedProject } = useSelectedProject(params, projects);  const { selectedProjectName, defaultProject } = selectedProject;

  const { projectId, defaultGroup } = useParams();
  const projectInfo = useSelectedProjectInfo(projectId);
  const currentView = projectInfo && projectInfo[0]?.projectIsList;

  return (
    <div className="content">
      <div className="project__wrapper">{currentView || defaultGroup ? <TaskList /> : <Board />}</div>
    </div>
  );
};
