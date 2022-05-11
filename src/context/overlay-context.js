import { createContext, useContext, useState } from "react";

export const OverlayContext = createContext();

export const OverlayContextProvider = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);
  const [dialogProps, setDialogProps] = useState([])
  const [dialogToshow, setDialogDIalogToShow] = useState();
  return <OverlayContext.Provider value={{ showDialog, setShowDialog, dialogProps, setDialogProps }}> {children}</OverlayContext.Provider>;
};

export const useOverlayContextValue = () => useContext(OverlayContext);
