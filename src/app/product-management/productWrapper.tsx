import React from "react";
import { PageLink, PageTitle } from "../../_metronic/layout/core";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Content } from "../../_metronic/layout/components/content";
import { ToolbarWrapper } from "../../_metronic/layout/components/toolbar";
import { ProjectHeader } from "../project-management/components/ProjectHeader/ProjectHeader";
import Events from "../project-management/pages/Events/Events";
import ProjectList from "../project-management/pages/ProjectList/ProjectList";
import ProductList from "./productList/ProductList";

const usersBreadcrumbs: Array<PageLink> = [
  {
    title: "Ürün Yönetimi",
    path: "/product-operation/products",
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
const productWrapper = () => {
  return (
    <Routes>
      <Route element={<Outlet />}>
        <Route
          path="products"
          element={
            <>
              <PageTitle breadcrumbs={usersBreadcrumbs}>Ürün Listesi</PageTitle>
              <Content>
                <div className="app-content">
                  <div className="app-container container-xxl">
                    <ToolbarWrapper />
                    <ProductList />
                  </div>
                </div>
              </Content>
            </>
          }
        />
      </Route>
      <Route index element={<Navigate to="/product-operation/products" />} />
    </Routes>
  );
};

export default productWrapper;
