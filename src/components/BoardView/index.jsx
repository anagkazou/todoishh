import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAuth, useBoardData, useProjects, useSelectedProject } from "hooks";
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { db } from "_firebase";
import { ViewHeader } from "../ViewHeader";
import { BoardColumn } from "./column";
import "./styles/light.scss";
import "./styles/main.scss";
export const Board = () => {
  const params = useParams();
  const { projects } = useProjects();
  const { setSelectedProject, selectedProject } = useSelectedProject(params, projects);
  const boardData = useBoardData(selectedProject);
  const { currentUser } = useAuth();
  const [boardState, setBoardState] = useState(boardData);
  useEffect(() => {
    setBoardState(boardData);
  }, [boardData]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = boardState.columns[source.droppableId];
    const newColumnTasks = [...column.columnTasks];
    const start = boardState.columns[source.droppableId];
    const finish = boardState.columns[destination.droppableId];
    const taskWithDraggableId = Object.values(boardState.tasks).find((task) => task.taskId == draggableId);

    if (start === finish) {
      const newTaskIds = Array.from(start.columnTasks);
      newTaskIds.splice(source.index, 1);

      newTaskIds.splice(destination.index, 0, taskWithDraggableId);

      const newColumn = {
        ...start,
        columnTasks: newTaskIds,
      };

      const newState = {
        ...boardState,
        columns: {
          ...boardState.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBoardState(newState);
      return;
    }
    const startTaskIds = Array.from(start.columnTasks);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      columnTasks: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.columnTasks);
    finishTaskIds.splice(destination.index, 0, taskWithDraggableId);
    const newFinish = {
      ...finish,
      columnTasks: finishTaskIds,
    };

    const newState = {
      ...boardState,
      columns: {
        ...boardState.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    const oldState = boardState;

    try {
      setBoardState(newState);

      const taskQuery = await query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("taskId", "==", draggableId));
      const taskDocs = await getDocs(taskQuery);
      taskDocs.forEach(async (taskDoc) => {
        await updateDoc(taskDoc.ref, {
          boardStatus: destination.droppableId,
        });
      });
    } catch (error) {
      console.log(error);
      setBoardState(oldState);
    }
  };
  return (
    <>
      <ViewHeader />
      <div className="board__wrapper">
        <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
          {boardState &&
            boardState.columnOrder.map((columnId) => {
              const column = boardState.columns[columnId];

              const tasks = column.columnTasks;

              return <BoardColumn key={column.id} tasks={tasks} column={column} />;
            })}
        </DragDropContext>
      </div>
    </>
  );
};
