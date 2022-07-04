import { createContext, useContext, useState } from "react";
export const SelectedProjectContext = createContext();

export const SelectedProjectProvider = ({ children }) => {
  const defaultState = { selectedProjectName: "Inbox", defaultProject: true };

  const [selectedProject, setSelectedProject] = useState(defaultState);

  return <SelectedProjectContext.Provider value={{ selectedProject, setSelectedProject }}>{children}</SelectedProjectContext.Provider>;
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
