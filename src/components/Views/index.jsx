import { Sidebar } from "components/Sidebar";
import { Content } from "components/Content";
import { Overlay } from "components/Overlay";
import { Header } from "components/Header";
import { SelectedProjectProvider, ProjectsContextProvider, useOverlayContextValue, useThemeContextValue } from "context";

import { BrowserRouter as Router, Route, Routes, Navigate, matchPath, Redirect } from "react-router-dom";
import { Layout } from "components/Layout";
import { LandingPage } from "pages/landing-page";
import { DashBoardRoutes } from "components/DashBoardRoutes";
import { AuthenticationPage } from "pages/authentication";
import { UnauthenticatedRoutes } from "components/UnauthenticatedRoutes";
export const Views = () => {
  return (
    <SelectedProjectProvider>
      <ProjectsContextProvider>
        <Routes>
          <Route element={<UnauthenticatedRoutes />}>
            <Route exact path="/" element={<LandingPage />} />
            <Route exact path="/signin" element={<AuthenticationPage />} />
            <Route exact path="/signup" element={<AuthenticationPage />} />
          </Route>

          <Route element={<DashBoardRoutes />}>
            <Route exact path={"/app/*"} element={<Layout />}>
              <Route path={":defaultGroup"} element={<Content isDefaultGroup />} />
            </Route>

            <Route path={"/project/*"} element={<Layout />}>
              <Route path={":projectId"} element={<Content />} />
            </Route>
          </Route>
          <Route path="/app" element={<>ERRORRR!!!!</>} />
          <Route path="*" element={<>ERRORRR!!!!</>} />
        </Routes>
      </ProjectsContextProvider>
    </SelectedProjectProvider>
  );
};
