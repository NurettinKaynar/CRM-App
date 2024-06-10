import { FC, useEffect, useState } from "react";

import { Link, useLocation } from "react-router-dom";
import { KTIcon } from "../../../../_metronic/helpers";
import moment from "moment";
import { getTotalActiveProjectList } from "../../core/_request";
import { AxiosResponse } from "axios";

const ProjectHeader: FC = () => {
  const location = useLocation();
  const [totalProject, seTotalProject] = useState(0);

  const handleGetTotalProjects = () => {
    getTotalActiveProjectList().then((res: AxiosResponse) => {
      if (res.status === 200) {
        seTotalProject(res.data);
      }
    });
  };

  useEffect(() => {
    handleGetTotalProjects();
  }, []);
  return (
    <>
      <div className="card mb-5 mb-xl-10">
        <div className="card-body pt-9 pb-0">
          <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
            <div className="flex-grow-1">
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                <div className="d-flex flex-column">
                  <div className="d-flex align-items-center mb-2">
                    <span className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                      Proje İstatistikleri
                    </span>
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap flex-stack">
                <div className="d-flex flex-column flex-grow-1 pe-8">
                  <div className="d-flex flex-wrap">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">
                          {moment(new Date()).format("DD/MM/YYYY")}
                        </div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">Tarih</div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-2 fw-bolder">{totalProject}</div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">
                        Toplam Proje Sayısı
                      </div>
                    </div>

                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <KTIcon
                          iconName="arrow-up"
                          className="fs-3 text-success me-2"
                        />
                        <div className="fs-2 fw-bolder">70.800 TL</div>
                      </div>

                      <div className="fw-bold fs-6 text-gray-500">
                        Toplam Maliyet
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex overflow-auto h-55px">
            <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === "/project-operation/projects" &&
                      "active")
                  }
                  to="/project-operation/projects">
                  Proje Listesi
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    `nav-link text-active-primary me-6 ` +
                    (location.pathname === "/project-operation/calendar" &&
                      "active")
                  }
                  to="/project-operation/calendar">
                  Takvim
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProjectHeader };
