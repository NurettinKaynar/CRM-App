import React, { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { LayoutSplashScreen, PageLink, PageTitle } from "../../_metronic/layout/core";
import { ProjectListWrapper } from "../modules/apps/user-management/project-list/ProjectList";
import ProjectList from "./pages/ProjectList";
import { Content } from "../../_metronic/layout/components/content";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Proje Listesi",
    path: "/project-operation/projects",
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
    <Suspense fallback={<LayoutSplashScreen/>}>
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
                    <ProjectList />
                  </div>
                </div>
              </Content>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/project-operation/projects" />} />
    </Routes>
    </Suspense>
  );
};

export default ProjectWrapper;
