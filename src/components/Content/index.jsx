import { Board } from "components/BoardView/index";
import { TaskList } from "components/ListView";
import { useSelectedProjectInfo } from "hooks";
import React from "react";
import { useParams } from "react-router-dom";
import "./styles/content.scss";
import "./styles/light.scss";
export const Content = () => {
  const { projectId, defaultGroup } = useParams();
  const projectInfo = useSelectedProjectInfo(projectId);
  const currentView = projectInfo && projectInfo[0]?.projectIsList;

  return (
    <div className="content">
      <div className="project__wrapper">{currentView || defaultGroup ? <TaskList /> : <Board />}</div>
    </div>
  );
};
