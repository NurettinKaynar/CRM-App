import EmployeeList from "./pages/EmployeeList/EmployeeList";
import React, { Suspense } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import {
  LayoutSplashScreen,
  PageLink,
  PageTitle,
} from "../../_metronic/layout/core";

import { Content } from "../../_metronic/layout/components/content";

const EmployeeWrapper = () => {
  const usersBreadcrumbs: Array<PageLink> = [
    {
      title: "Çalışanlar Listesi",
      path: "/employee-operation/employees",
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
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Routes>
        <Route element={<Outlet />}>
          <Route
            path="employees"
            element={
              <>
                <PageTitle breadcrumbs={usersBreadcrumbs}>
                  Çalışan Listesi
                </PageTitle>
                <Content>
                  <div className="app-content ">
                    <div className="app-container container-xxl">
                      <EmployeeList />
                    </div>
                  </div>
                </Content>
              </>
            }
          />
        </Route>
        <Route
          index
          element={<Navigate to="/employee-operation/employees" />}
        />
      </Routes>
    </Suspense>
  );
};

export default EmployeeWrapper;
