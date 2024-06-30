import React, { useEffect, useState } from "react";
import { KTCard } from "../../../../_metronic/helpers";
import { useParams } from "react-router-dom";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AxiosResponse, AxiosError } from "axios";
import { getProjectById } from "../../core/_request";

const UserList = () => {
  const { id } = useParams();
  const [projectData, setProjectData] = useState<any>();
  const handleProjectDetails = () => {
    getProjectById(Number(id))
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          console.log("Proje Detayları Geldi", res.data);
          setProjectData(res.data);
        }
      })
      .catch((err: AxiosError) => {
        console.error("Proje Detayları Gelmedi", err);
      });
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
    return data;
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
    handleProjectDetails();
  }, []);
  return (
    <div className="d-flex flex-wrap">
      <KTCard>
        {/* {
            handleUsers(projectData).map((data:any,idx:number)=>(

            ))
        } */}
        <div className="card-body d-flex flex-center flex-column pt-12 p-9">
          <div className="symbol symbol-65px symbol-circle mb-5">
            <img src="/media/avatars/300-2.jpg" alt="image" />
          </div>

          <a
            href="#"
            className="fs-4 text-gray-800 text-hover-primary fw-bold mb-0">
            Karina Clark
          </a>

          <div className="fw-semibold text-gray-500 mb-6">
            Art Director at Novica Co.
          </div>

          <div className="d-flex flex-center flex-wrap">
            <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
              <div className="fs-6 fw-bold text-gray-700">$14,560</div>
              <div className="fw-semibold text-gray-500">Earnings</div>
            </div>

            <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
              <div className="fs-6 fw-bold text-gray-700">23</div>
              <div className="fw-semibold text-gray-500">Tasks</div>
            </div>

            <div className="border border-gray-300 border-dashed rounded min-w-80px py-3 px-4 mx-2 mb-3">
              <div className="fs-6 fw-bold text-gray-700">$236,400</div>
              <div className="fw-semibold text-gray-500">Sales</div>
            </div>
          </div>
        </div>
      </KTCard>
    </div>
  );
};

export default UserList;
