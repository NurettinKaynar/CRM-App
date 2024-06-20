import React from 'react'
import { PageLink, PageTitle } from '../../_metronic/layout/core';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Content } from '../../_metronic/layout/components/content';
import { ToolbarWrapper } from '../../_metronic/layout/components/toolbar';
import TaskList from './pages/TaskList';

const usersBreadcrumbs: Array<PageLink> = [
    {
      title: "Görev Yönetimi",
      path: "/task-operation/task-list",
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
  
const TaskListWrapper = () => {
    return (
        <Routes>
          <Route element={<Outlet />}>
            <Route
              path="task-list"
              element={
                <>
                  <PageTitle breadcrumbs={usersBreadcrumbs}>
                    Görev Listesi
                  </PageTitle>
                  <Content>
                    <div className="app-content ">
                      <div className="app-container container-xxl">
                        <ToolbarWrapper />
                        <TaskList/>
                      </div>
                    </div>
                  </Content>
                </>
              }
            />
          </Route>
          <Route index element={<Navigate to="/task-operation/task-list" />} />
        </Routes>
      );
}

export default TaskListWrapper