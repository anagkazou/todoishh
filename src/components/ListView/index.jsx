import { TaskEditor } from "components/TaskEditor";
import { ViewHeader } from "components/ViewHeader";
import { useTaskEditorContextValue } from "context";
import { useProjects, useTasks } from "hooks";
import React from "react";
import { useParams } from "react-router-dom";
import { EmptyState } from "./empty-state";
import "./styles/light.scss";
import "./styles/listview.scss";
import { Task } from "./task";

export const TaskList = () => {
  const { projectId, defaultGroup } = useParams();

  const { tasks } = useTasks(defaultGroup || projectId);
  // const { tasks } = useTasks(selectedProject.selectedProjectId ? selectedProject.selectedProjectId : selectedProject.selectedProjectName);
  const { projects } = useProjects();
  const { taskEditorToShow } = useTaskEditorContextValue();
  return (
    <div className="task-list__wrapper">
      <ViewHeader />
      {tasks &&
        tasks.map((task) => {
          return (
            <React.Fragment key={task.taskId}>
              {taskEditorToShow != task.taskId && <Task name={task.name} key={task.taskId} task={task} projects={projects} />}
              {taskEditorToShow === task.taskId && <TaskEditor taskId={task.taskId} task={task} projects={projects} isEdit />}
            </React.Fragment>
          );
        })}

      <TaskEditor projects={projects} />
      {tasks.length ? null : <EmptyState />}
    </div>
  );
};
