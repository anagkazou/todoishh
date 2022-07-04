import { useTaskEditorContextValue } from "context";
import { useProjects } from "hooks";
import { Droppable } from "react-beautiful-dnd";
import { TaskEditor } from "../TaskEditor";
import { BoardTask } from "./board-task";
export const BoardColumn = ({ column, tasks }) => {
  const { projects } = useProjects();
  const { taskEditorToShow } = useTaskEditorContextValue();
  return (
    <div className="board-column__container">
      <p className="board-column__title">{column.title}</p>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div className="tasklist" ref={provided.innerRef} {...provided.droppableProps}>
            {tasks.map((task, index) => (
              <>
                {taskEditorToShow != task.taskId && <BoardTask key={task.taskId} task={task} index={index} column={column} />}
                {taskEditorToShow == task.taskId && <TaskEditor taskId={task.taskId} task={task} projects={projects} isEdit />}
              </>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <TaskEditor column={column} />
    </div>
  );
};
