import { TaskEditor } from "components/Add-Task";
import { ViewHeader } from "components/ViewHeader";
import { useTaskEditorContextValue } from "context";
import { useProjects, useTasks } from "hooks";
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
console.log('gggggggggggg', taskEditorToShow);
  return (
    <div className="task-list__wrapper">
      <ViewHeader />
      {tasks &&
        tasks.map((task) => {
          return (
            <>
              {taskEditorToShow != task.taskId && <Task name={task.name} key={task.taskId} task={task} projects={projects} />}
              {taskEditorToShow == task.taskId && <TaskEditor taskId={task.taskId} task={task} projects={projects} isEdit />}
            </>
          );
        })}

      {defaultGroup !== "Important" && <TaskEditor projects={projects} />}
      {tasks.length ? null : <EmptyState />}
    </div>
  );
};
