import { TaskCheckbox } from "components/Checkbox";
import { OptionsButton } from "components/MenuButton";
import { TaskDate } from "components/task-date";
import { TaskProject } from "components/TaskProject";
import { useProjects } from "hooks";
import { Draggable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { getProjectInfo } from "utils";
export const BoardTask = ({ task, index }) => {
  const { defaultGroup } = useParams();
  const { projects } = useProjects();
  const taskProject = getProjectInfo(projects, task.projectId);

  return (
    <Draggable draggableId={task.taskId} index={index}>
      {(provided) => (
        <div className="board-task" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
          <TaskCheckbox taskId={task.taskId} />
          <div className="board-task__content">
            <p className="board-task__name">{task.name}</p>
            <div className="board-task__info">
              <div> {task.date && <TaskDate date={task.date} />}</div>
              <div>
                {defaultGroup && <TaskProject projectHexColour={taskProject?.projectColour?.hex} projectName={taskProject?.name} />}
              </div>
            </div>
          </div>

          <OptionsButton taskId={task.taskId} targetIsTask />
        </div>
      )}
    </Draggable>
  );
};
