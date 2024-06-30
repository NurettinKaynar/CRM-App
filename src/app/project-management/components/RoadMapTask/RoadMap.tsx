import React, { useEffect, useRef, useState } from "react";
import { KTCard } from "../../../../_metronic/helpers";
import { getProjectByDate } from "../../core/_request";
import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { Link } from "react-router-dom";

const RoadMap = () => {
  const [activeDate, setActiveDate] = useState<string>(
    new Date().toUTCString()
  );
  const [ProjectsData, setProjectsData] = useState<any[]>([]);

  const dayNames = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"];
  const getDates = () => {
    const today = new Date();
    const datesArray = [];

    for (let i = 0; i < 10; i++) {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);

      const day = dayNames[futureDate.getDay()];
      const date = futureDate.getDate();
      const dateTime = futureDate.toUTCString();

      datesArray.push({ day, date, dateTime });
    }

    return datesArray;
  };
  const [dates, setDates] = useState(getDates());

  const activeDateHandler = (date: string) => {
    setActiveDate(date);
    handleGetDateData(date);
  };

  const handleGetDateData = (date: string) => {
    getProjectByDate(date)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setProjectsData(res.data);
        }
      })
      .catch((err: AxiosError) => {
        console.error("Hata Veri Yok", err);
        setProjectsData([]);
      });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setDates(getDates());
    }, 24 * 60 * 60 * 1000); // Günlük olarak güncellenir

    return () => clearInterval(timer); // Temizlik işlemi
  }, []);
  useEffect(() => {
    handleGetDateData(activeDate);
  }, []);
  return (
    <KTCard className="h-100">
      <div className="d-flex flex-column p-5">
        <h3 className="fw-bold mb-1">Yol Haritası</h3>
        {/* Navigation */}
        <ul
          className="nav nav-pills d-flex flex-nowrap hover-scroll-x py-2"
          role="tablist">
          {dates.map((dateObj, index) => (
            <li
              onClick={() => activeDateHandler(dateObj.dateTime)}
              key={index}
              className="nav-item me-1"
              role="presentation">
              <span
                className={`nav-link btn d-flex flex-column flex-center rounded-pill min-w-45px me-2 py-4 px-3 btn-active-primary ${
                  dateObj.dateTime === activeDate ? "active" : ""
                }`}>
                <span className="opacity-50 fs-7 fw-semibold">
                  {dateObj.day}
                </span>
                <span className="fs-6 fw-bold">{dateObj.date}</span>
              </span>
            </li>
          ))}
        </ul>
        {/* Navigation End */}
        {/* Content Side Start */}
        <div className="tab-pane fade active show">
          {activeDate ? (
            <>
              {ProjectsData.map((project, index) => (
                <div
                  key={index}
                  className="d-flex flex-stack position-relative mt-8">
                  <div className="position-absolute h-100 w-4px bg-secondary rounded top-0 start-0"></div>

                  <div className="fw-semibold ms-5 text-gray-600">
                    <div className="fs-5">
                      {moment(project.startingDate).format("Do MMMM YYYY")} -{" "}
                      {moment(project.endDate).format("Do MMMM YYYY")}
                    </div>

                    <span className="fs-5 fw-bold text-gray-800 text-hover-primary mb-2">
                      {project.title}
                    </span>
                  </div>
                  <Link
                    to={`/project-operation/${project.id}`}
                    className="btn btn-bg-light btn-active-color-primary btn-sm">
                    Görüntüle
                  </Link>
                </div>
              ))}
            </>
          ) : (
            <div className="d-flex flex-column">
              <img
                src="media/svg/illustrations/sigma/question.svg"
                alt="empty"
                width={250}
                height={250}
              />
              <span className="fw-semibold ms-5 text-gray-600">
                Proje Bulunamadı
              </span>
            </div>
          )}
        </div>

        {/* COntent Side End */}
      </div>
    </KTCard>
  );
};

export default RoadMap;
