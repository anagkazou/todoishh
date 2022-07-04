import { useState, useEffect, createContext, useContext } from "react";

export const TaskEditorContext = createContext();

export const TaskEditorContextProvider = ({ children }) => {
  const [taskEditorToShow, setTaskEditorToShow] = useState();

  useEffect(() => {}, [taskEditorToShow]);

  return <TaskEditorContext.Provider value={{ taskEditorToShow, setTaskEditorToShow }}>{children}</TaskEditorContext.Provider>;
};

export const useTaskEditorContextValue = () => useContext(TaskEditorContext);
