import { Route, Routes, Outlet, Navigate } from "react-router-dom";
import { PageLink, PageTitle } from "../../../../_metronic/layout/core";
import { ProjectListWrapper } from "./project-list/ProjectList";

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

const UsersPage = () => {
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
              <ProjectListWrapper />
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/project-operation/projects" />} />
    </Routes>
  );
};

export default UsersPage;
