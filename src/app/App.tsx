import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import { I18nProvider } from "../_metronic/i18n/i18nProvider";
import { LayoutProvider, LayoutSplashScreen } from "../_metronic/layout/core";
import { MasterInit } from "../_metronic/layout/MasterInit";
import { AuthInit } from "./modules/auth";
import { ThemeModeProvider } from "../_metronic/partials";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const App = () => {
  const [loading, setLoading] = useState<boolean>();
  axios.interceptors.request.use(config=>{
    setLoading(true);
    return config
  })
  axios.interceptors.response.use(config=>{
    setLoading(false);
    return config
  })
  
  return (

    <Suspense fallback={<LayoutSplashScreen />}>
      <I18nProvider>
        <LayoutProvider>
          <ThemeModeProvider>
            <AuthInit>
              <ToastContainer />
              <Outlet />
              <MasterInit />
            </AuthInit>
          </ThemeModeProvider>
        </LayoutProvider>
      </I18nProvider>
    </Suspense>
  );
};

export { App };
