import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Content } from "../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import {
  PageLink,
  PageTitle
} from "../../_metronic/layout/core";
import { ProjectHeader } from "./components/ProjectHeader/ProjectHeader";
import Events from "./pages/Events/Events";
import ProjectList from "./pages/ProjectList/ProjectList";
import { ProjectDetailsHeader } from "./components/ProjectDetailsHeader/ProjectDetailsHeader";
import ProjectDetails from "./pages/ProjectDetails/ProjectDetails";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Proje Listesi",
    path: "/project-operation/projects",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "Proje Detayları",
    path: "/project-operation/:id",
    isSeparator: false,
    isActive: false,
  },
  {
    title: "",
    path: "",
    isSeparator: true,
    isActive: false,
  },
];

const ProjectWrapper = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="projects"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                Proje Listesi
              </PageTitle>
              <Content>
                <div className="app-content ">
                  <div className="app-container container-xxl">
                    <ToolbarWrapper />
                    <ProjectHeader />
                    <ProjectList />
                  </div>
                </div>
              </Content>
            </>
          }
        />
        <Route
          path="calendar"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                Proje Takvimi
              </PageTitle>
              <Content>
                <div className="app-content ">
                  <div className="app-container container-xxl">
                    <ToolbarWrapper />
                    <ProjectHeader />
                    <Events />
                  </div>
                </div>
              </Content>
            </>
          }
        />
        <Route
          path=":id"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>
                Proje Detayları
              </PageTitle>
              <Content>
                <div className="app-content ">
                  <div className="app-container container-xxl">
                    <ToolbarWrapper />
                    <ProjectDetailsHeader />
                   <ProjectDetails/>
                  </div>
                </div>
              </Content>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/project-operation/projects" />} />
    </Routes>
  );
};

export default ProjectWrapper;
