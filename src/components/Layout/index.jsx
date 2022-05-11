import { useState, useCallback, useEffect } from "react";
import { Header } from "components/Header";
import { Overlay } from "components/Overlay";
import { Sidebar } from "components/Sidebar";
import { Outlet, useParams } from "react-router-dom";
import { useThemeContextValue, useTaskEditorContextValue } from "context";
import { useProjects } from "hooks";
import { LoadingPage } from "components/LoadingPage";
import { TaskEditorContextProvider } from "context/board-add-task-context";

export const Layout = () => {
  const { isLight, setIsLight } = useThemeContextValue();
  const [showSidebar, setShowSidebar] = useState(true);
  const toggleSidebar = useCallback(() => setShowSidebar((value) => !value));
  const params = useParams();
  useEffect(() => {
    const { innerWidth: width } = window;
    width < 900 && setShowSidebar(false);
  }, [params]);

  const { projects, loading } = useProjects();

  return (
    <>
      <TaskEditorContextProvider>
        {!loading ? (
          <div className={`${isLight ? "light" : ""} ${!showSidebar ? "hide-sidebar " : ""}app`}>
            <Header onClick={toggleSidebar} showSideBar={showSidebar} />
            <Overlay />
            <Sidebar onClick={toggleSidebar} />
            <Outlet />
          </div>
        ) : (
          <LoadingPage />
        )}{" "}
      </TaskEditorContextProvider>
    </>
  );
};
