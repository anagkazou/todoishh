import { Header } from "components/Header";
import { LoadingPage } from "components/LoadingPage";
import { Overlay } from "components/Overlay";
import { Sidebar } from "components/Sidebar";
import { useThemeContextValue } from "context";
import { TaskEditorContextProvider } from "context/board-task-editor-context";
import { useProjects } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";

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
