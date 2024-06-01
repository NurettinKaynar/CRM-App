import { useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../_metronic/helpers";

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById("root");
    if (root) {
      root.style.height = "100%";
    }
    return () => {
      if (root) {
        root.style.height = "auto";
      }
    };
  }, []);

  return (
    <div className="d-flex flex-column flex-lg-row flex-column-fluid h-100">
      {/* begin::Aside */}
      <div
        className="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-2 order-lg-1"
        style={{
          backgroundImage: `url(${toAbsoluteUrl("media/images/bg01.jpg")})`,
        }}>
        {/* begin::Content */}
        <div
          style={{ background: "rgba(0,0,0,0.6)" }}
          className="d-flex flex-column flex-center py-15 px-5 px-md-15 w-100">
          {/* begin::Logo */}
          <Link to="/" className="mb-12">
            <img
              alt="Logo"
              src={toAbsoluteUrl("media/logos/logo.jpg")}
              className="h-75px"
            />
          </Link>
          {/* end::Logo */}

          {/* begin::Image */}
          {/* <img
            className="mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20"
            src={toAbsoluteUrl("media/misc/auth-screens.png")}
            alt=""
          /> */}
          {/* end::Image */}

          {/* begin::Title */}
          <h1 className="text-white fs-2qx fw-bolder text-center mb-7">
            ELATUKKU CRM
          </h1>
          {/* end::Title */}

          {/* begin::Text */}
          <div className="text-white fs-base text-center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam, qui.
            Provident exercitationem cumque aperiam voluptate. Molestias,
            consequuntur? Veritatis optio pariatur laboriosam rem, cum, odio
            voluptatibus libero, necessitatibus et repudiandae similique!
          </div>
          {/* end::Text */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}

      {/* begin::Body */}
      <div className="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-1 order-lg-2">
        {/* begin::Form */}
        <div className="d-flex flex-center flex-column flex-lg-row-fluid">
          {/* begin::Wrapper */}
          <div className="w-lg-500px p-10">
            <Outlet />
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}
      </div>
      {/* end::Body */}
    </div>
  );
};

export { AuthLayout };
