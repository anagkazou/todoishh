import { Content } from "components/Content";
import { DashBoardRoutes } from "components/AuthenticatedRoutes";
import { Layout } from "components/Layout";
import { UnauthenticatedRoutes } from "components/UnauthenticatedRoutes";
import { ProjectsContextProvider } from "context";
import { AuthenticationPage } from "pages/authentication";
import { LandingPage } from "pages/landing-page";
import { Route, Routes } from "react-router-dom";

export const Views = () => {
  return (
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
  );
};
