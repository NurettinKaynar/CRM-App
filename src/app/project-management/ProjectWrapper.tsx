import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Content } from "../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { PageLink, PageTitle } from "../../_metronic/layout/core";
import Overview from "./components/Overview/Overview";
import { ProjectDetailsHeader } from "./components/ProjectDetailsHeader/ProjectDetailsHeader";
import { ProjectHeader } from "./components/ProjectHeader/ProjectHeader";
import Events from "./pages/Events/Events";
import ProjectList from "./pages/ProjectList/ProjectList";
import TaskList from "./components/TaskList/TaskList";
import UserList from "./components/Users/UserList";

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
  const [activeTab, setActiveTab] = useState<number>(1);
  const handleChangeTab = (e: number) => {
    setActiveTab(e);
  };
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
                    <ProjectDetailsHeader
                      changeTab={(e) => handleChangeTab(e)}
                    />
                    <div key={Math.random()} className="p-5">
                      {activeTab === 1 && <Overview />}
                      {activeTab === 2 && <TaskList />}
                      {activeTab === 3 && <UserList />}
                    </div>
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
