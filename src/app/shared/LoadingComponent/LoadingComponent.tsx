import React from "react";

const LoadingComponent = () => {
  return (
    <div id="splash-screen" className="splash-screen">
      <img
        src="./public/media/logos/logo.svg"
        className="dark-logo"
        alt="ELATUKKU CRM"
      />
      <img
        src="./public/media/logos/logo.svg"
        className="light-logo"
        alt="ELATUKKU CRM"
      />
      <div className="loader-wrapper">
        <span className="loader"></span>
        <span className="loading-text" style={{ marginLeft: 10 }}>
          Yükleniyor...
        </span>
      </div>
    </div>
  );
};

export default LoadingComponent;
