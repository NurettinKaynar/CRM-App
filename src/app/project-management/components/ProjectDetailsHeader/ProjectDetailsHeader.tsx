import { FC, useEffect, useState } from "react";

import { AxiosError, AxiosResponse } from "axios";
import moment from "moment";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { KTCard, KTCardBody } from "../../../../_metronic/helpers";
import { getProjectById } from "../../core/_request";
const ProjectDetailsHeader = ({
  changeTab,
}: {
  changeTab: (e: number) => void;
}) => {
  const [activeTab, setActiveTab] = useState<number>(1);
  const { id } = useParams();
  const [projectImage, setProjectImage] = useState<string>(
    "/metronic8/demo1/assets/media/svg/brand-logos/volicity-9.svg"
  );
  const [users, setUsers] = useState<any[]>([]);
  const [projectData, setProjectData] = useState<any>();
  const handleProjectDetails = () => {
    getProjectById(Number(id))
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          console.log("Proje Detayları Geldi", res.data);
          setProjectData(res.data);
          handleImage(res.data);
          handleUsers(res.data);
        }
      })
      .catch((err: AxiosError) => {
        console.error("Proje Detayları Gelmedi", err);
      });
  };

  const handleImage = (projectData: any) => {
    if (projectData.images && projectData.images.length > 0) {
      setProjectImage(projectData.images[0].path);
    } else {
      setProjectImage(
        "/metronic8/demo1/assets/media/svg/brand-logos/volicity.svg"
      );
    }
  };

  const handleUsers = (projectData: any) => {
    const data: any[] = [];
    if (projectData.relateds.length > 0)
      projectData.relateds.forEach((user: any) => {
        if (user.adminId) {
          data.push(user.admin);
        }
        if (user.employeeId) {
          data.push(user.employee);
        }
      });
    setUsers(data);
  };

  const UserAvatar = ({ user }: { user: any }) => {
    // Arka plan sınıfları
    const backgroundClass = [
      "bg-warning text-inverse-warning",
      "bg-success text-inverse-success",
      "bg-danger text-inverse-danger",
      "bg-info text-inverse-info",
      "bg-primary text-inverse-primary",
    ];

    // 0 ile 10 arasında rastgele bir sayı üretmek için Math.random() kullanılır
    const randomIndex = Math.floor(Math.random() * 11); // 0 dahil, 11 hariç olduğu için 0-10 arası sayılar üretir
    const randomClass = backgroundClass[randomIndex % backgroundClass.length];

    return (
      <OverlayTrigger
        placement="top"
        delay={{ show: 250, hide: 400 }}
        overlay={<Tooltip>{`${user.name} ${user.surname}`}</Tooltip>}>
        <div className="symbol symbol-35px symbol-circle">
          <span
            style={{ textTransform: "uppercase" }}
            className={`symbol-label ${randomClass} fw-bold`}>
            {user.name.substring(0, 1)}
            {user.surname.substring(0, 1)}
          </span>
        </div>
      </OverlayTrigger>
    );
  };

  useEffect(() => {
    if (id) {
      handleProjectDetails();
    }
  }, []);

  return (
    <>
      {projectData && (
        <KTCard>
          <KTCardBody className=" card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-6">
              <div className="d-flex flex-center flex-shrink-0 bg-light rounded w-100px h-100px w-lg-150px h-lg-150px me-7 mb-4">
                <img
                  className="mw-75px mw-lg-150px"
                  src={projectImage}
                  alt="image"
                />
              </div>
              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-1">
                      <span className="text-gray-800 text-hover-primary fs-2 fw-bold me-3">
                        {projectData.title}
                      </span>
                      <span
                        className={`badge ${
                          projectData.isComplete
                            ? "badge-light-success"
                            : "badge-light-primary"
                        } me-auto`}>
                        {projectData.isComplete ? "Tamamlandı" : "Devam Ediyor"}
                      </span>
                    </div>

                    <div className="d-flex flex-wrap fw-semibold mb-4 fs-5 text-gray-500">
                      {projectData.description}
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-wrap justify-content-start">
                  <div className="d-flex flex-wrap">
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 fw-bold">
                          {moment(projectData.startingDate).format(
                            "Do MMMM YYYY"
                          )}
                        </div>
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Başlangıç Tarihi
                      </div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 fw-bold">
                          {moment(projectData.endDate).format("Do MMMM YYYY")}
                        </div>
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Bitiş Tarihi
                      </div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 fw-bold">
                          {projectData.appActivities.length}
                        </div>
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Toplam Aktivite
                      </div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 fw-bold">
                          {projectData.comments.length}
                        </div>
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Toplam Yorum
                      </div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 fw-bold">
                          {projectData.appFiles.length}
                        </div>
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Toplam Dosya
                      </div>
                    </div>
                    <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fs-4 fw-bold">{projectData.cost} ₺</div>
                      </div>
                      <div className="fw-semibold fs-6 text-gray-500">
                        Toplam Bütçe
                      </div>
                    </div>
                  </div>
                  <div className="symbol-group symbol-hover mb-3">
                    {users.map((user, idx) => (
                      <UserAvatar user={user} key={idx} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex overflow-auto h-55px">
              <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                <li className="nav-item">
                  <span
                    onClick={() => {
                      setActiveTab(1);
                      changeTab(1);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 1 && "active")
                    }>
                    Özet
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    onClick={() => {
                      setActiveTab(2);
                      changeTab(2);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 2 && "active")
                    }>
                    Görevler
                  </span>
                </li>
                <li className="nav-item">
                  <span
                    onClick={() => {
                      setActiveTab(3);
                      changeTab(3);
                    }}
                    style={{
                      cursor: "pointer",
                    }}
                    className={
                      `nav-link text-active-primary me-6 ` +
                      (activeTab === 3 && "active")
                    }>
                    Proje Sorumluları
                  </span>
                </li>
              </ul>
            </div>
          </KTCardBody>
        </KTCard>
      )}
    </>
  );
};

export { ProjectDetailsHeader };
