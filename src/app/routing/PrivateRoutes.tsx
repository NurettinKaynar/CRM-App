import { FC, Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
import { getCSSVariableValue } from "../../_metronic/assets/ts/_utils";
import { WithChildren } from "../../_metronic/helpers";
import { MasterLayout } from "../../_metronic/layout/MasterLayout";
import { DashboardWrapper } from "../pages/dashboard/DashboardWrapper";


const PrivateRoutes = () => {
  const ProjectManagement = lazy(() => import("../project-management/ProjectWrapper"));
  const ProductWrapper = lazy(() => import("../product-management/productWrapper"));
  const TaskListWrapper = lazy(() => import("../task-management/TaskListWrapper"));
  const EmployeeWrapper = lazy(() => import("../employee-management/EmployeeWrapper"));

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path="auth/*" element={<Navigate to="/dashboard" />} />
        {/* Pages */}
        <Route path="dashboard" element={<DashboardWrapper />} />
        {/* <Route path="builder" element={<BuilderPageWrapper />} />
        <Route path="menu-test" element={<MenuTestPage />} /> */}
        {/* Lazy Modules */}
        {/* <Route
          path="profile/*"
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/pages/wizards/*"
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/widgets/*"
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path="crafted/account/*"
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        */}
        <Route
          path="task-operation/*"
          element={
            <SuspensedView>
              <TaskListWrapper/>
            </SuspensedView>
          }
        /> 
        <Route
          path="project-operation/*"
          element={
            <SuspensedView>
              <ProjectManagement />
            </SuspensedView>
          }
        />
        <Route
          path="product-operation/*"
          element={
            <SuspensedView>
              <ProductWrapper />
            </SuspensedView>
          }
        />
        <Route
          path="employee-operation/*"
          element={
            <SuspensedView>
              <EmployeeWrapper />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path="*" element={<Navigate to="/error/404" />} />
      </Route>
    </Routes>
  );
};

const SuspensedView: FC<WithChildren> = ({ children }) => {
  const baseColor = getCSSVariableValue("--bs-primary");
  TopBarProgress.config({
    barColors: {
      "0": baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  });
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
};

export { PrivateRoutes };
