import featherIcon from "assets/svg/feather-sprite.svg";
import { useThemeContextValue } from "context";
import { useTaskEditorContextValue } from "context/board-add-task-context";
import { addDoc, collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { useAuth, useProjects, useSelectedProject } from "hooks";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generatePushId } from "utils";
import { db } from "_firebase";
import { SetNewTaskProject } from "./set-new-task-project";
import { SetNewTaskSchedule } from "./set-new-task-schedule";
import "./styles/add-task.scss";
import "./styles/light.scss";

export const AddTask = ({ column, isQuickAdd, isEdit, task, closeOverlay }) => {
  const params = useParams();
  const { defaultGroup, projectId } = params;
  const [schedule, setSchedule] = useState({ day: "", date: "" });

  const { projects } = useProjects();
  const { selectedProject, defaultState } = useSelectedProject(params, projects);
  const { projectIsList } = selectedProject;
  const [project, setProject] = useState(isQuickAdd ? defaultState : { ...selectedProject });
  const [showAddTaskForm, setShowAddTaskForm] = useState(isQuickAdd || isEdit ? true : false);
  const [taskName, setTaskName] = useState(isEdit && task.name);
  const { currentUser } = useAuth();
  const [disabled, setDisabled] = useState(true);
  const { taskEditorToShow, setTaskEditorToShow } = useTaskEditorContextValue();

  const { isLight } = useThemeContextValue();
  const addTaskToFirestore = async (event) => {
    event.preventDefault();
    const taskId = generatePushId();
    try {
      resetForm();
      await addDoc(collection(db, "user", `${currentUser && currentUser.id}/tasks`), {
        projectId: project.selectedProjectId || "",
        date: schedule.date,
        name: taskName,
        taskId: taskId,
        completed: false,
        boardStatus: "TODO",
        important: false,
        ...(!projectIsList && column && { boardStatus: column?.id }),
      });
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = (event) => {
    event?.preventDefault();
    setProject({ ...selectedProject });
    // setSchedule({ day: "", date: "" });
    isQuickAdd && closeOverlay();
    setTaskName("");
  };

  const showAddTaskFormHandler = (event) => {
    resetForm(event);
  //  setTaskEditorToShow(column?.id || "NEW");
    setShowAddTaskForm(!showAddTaskForm);
  };
  const handleChange = (e) => {
    e.target.value.length < 1 ? setDisabled(true) : setDisabled(false);
  };

  const updateTaskInFirestore = async (e) => {
    e.preventDefault();
    const taskQuery = await query(collection(db, "user", `${currentUser && currentUser.id}/tasks`), where("taskId", "==", task.taskId));
    const taskDocs = await getDocs(taskQuery);
    taskDocs.forEach(async (taskDoc) => {
      await updateDoc(taskDoc.ref, {
        name: taskName,
        date: schedule.date,
        projectId: task.projectId,
      });
    });
    setTaskEditorToShow("");
  };

  const { defaultProject } = selectedProject;

  useEffect(() => {
    setShowAddTaskForm(false)
    if (defaultGroup || isQuickAdd) {
      setProject({ selectedProjectId: "", selectedProjectName: "Inbox", defaultProject });
    } else {
      setProject({ ...selectedProject });
    }
    if (defaultGroup == "Today") {
      setSchedule({ day: "Today", date: moment().format("DD-MM-YYYY") });
    } else if (isEdit) {
      console.log("THE DATE!", task);
      moment.defaultFormat = "DD-MM-YYYY";
      setSchedule({ day: task.date.length > 1 ? moment(task.date, moment.defaultFormat).format("DD MMM  ") : task.date, date: task.date });
    }
  }, [defaultGroup]);

  return (
    <div
      className={`add-task__wrapper ${isQuickAdd && "quick-add__wrapper"}`}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {!showAddTaskForm ? (
        <div
          className="add-task__toggle"
          onClick={(event) => {
            event.stopPropagation();
            showAddTaskFormHandler(event);
          }}
        >
          <div className="add-task__icon">
            <svg width="19" height="19" fill="none" strokeLinejoin="round">
              <use xlinkHref={`${featherIcon}#plus`}></use>
            </svg>
          </div>
          <span>Add Task</span>
        </div>
      ) : (
        <></>
      )}
      {showAddTaskForm && (
        <form
          className="add-task"
          onSubmit={(event) => (isEdit ? updateTaskInFirestore(event) : addTaskToFirestore(event))}
          style={{ width: `${isQuickAdd ? "100%" : ""}` }}
        >
          <div className={`add-task__container ${isQuickAdd ? " quick-add__container" : ""}`}>
            <input
              className="add-task__input"
              value={taskName}
              onChange={(event) => {
                handleChange(event);
                setTaskName(event.target.value);
              }}
              required
              type="text"
              maxLength="30"
              placeholder="e.g 'Renew gym subscription'"
            />

            <div className="add-task__attributes">
              <div className="add-task__attributes--left">
                <SetNewTaskSchedule isQuickAdd={isQuickAdd} schedule={schedule} setSchedule={setSchedule} />
                <SetNewTaskProject isQuickAdd={isQuickAdd} project={project} projects={projects} setProject={setProject} />
              </div>
              <div className="add-task__attributes--right"></div>
            </div>
          </div>

          <div className={`add-task__actions ${isQuickAdd ? "quick-add__actions" : ""}`}>
            <button className=" action add-task__actions--add-task" type="submit" disabled={isEdit ? false : disabled}>
              {isEdit ? "Save" : "Add task"}
            </button>
            <button
              className={` action  ${isLight ? "action__cancel" : "action__cancel--dark"}`}
              onClick={(event) => (isQuickAdd ? closeOverlay() : showAddTaskFormHandler(event))}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
