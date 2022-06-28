import { useState, useEffect, createContext, useContext } from "react";

export const TaskEditorContext = createContext();

export const TaskEditorContextProvider = ({ children }) => {
  const [taskEditorContextState, setTaskEditorContextState] = useState();

  useEffect(() => {
    console.log("fffffffffffffffffff", taskEditorContextState);
  }, [taskEditorContextState]);

  return <TaskEditorContext.Provider value={{ taskEditorContextState, setTaskEditorContextState }}>{children}</TaskEditorContext.Provider>;
};

export const useTaskEditorContextValue = () => useContext(TaskEditorContext);
