import React, { useEffect, useState } from "react";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { KTIcon } from "../../../../../_metronic/helpers";
import { deleteProject, getProjectById } from "../../../core/_request";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import CreateAppModal from "../CreateProjectModal/CreateAppModal";

interface ModalProps {
  show: boolean;
  handleClose: (e: boolean) => void;
  projectId: number;
}

const AppInfoModal = ({ show, handleClose, projectId }: ModalProps) => {
  const [projectData, setProjectData] = useState<any>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const renderTooltip = (tooltipText: string) => (
    <Tooltip id="button-tooltip">{tooltipText}</Tooltip>
  );

  const handleGetProjectId = () => {
    getProjectById(projectId).then((res: AxiosResponse) => {
      console.log("PROJE DATASI", res.data);
      setProjectData(res.data);
    });
  };

  const handleDeleteProject = () => {
    deleteProject(projectId).then((res: AxiosResponse) => {
      toast.success("Proje Başarıyla Silindi");
      handleClose(true);
    });
  };

  const handleEditCloseModal = () => {
    setOpenEditModal(false);
    handleGetProjectId();
  };

  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };

  useEffect(() => {
    if (projectId) {
      handleGetProjectId();
    }
  }, [projectId]);
  return (
    <>
      <Modal centered show={show}>
        <Modal.Header className="modal-header border-0 justify-content-between">
          <h3>{projectData && projectData.tite}</h3>
          <div className="d-flex align-items-center gap-2">
            <OverlayTrigger
              placement="left"
              overlay={renderTooltip("Projeyi Sil")}>
              <button
                onClick={handleDeleteProject}
                type="button"
                name="edit"
                className="btn btn-icon btn-sm btn-color-gray-500 btn-active-icon-primary me-2">
                <KTIcon
                  iconName="ki-solid ki-trash"
                  iconType="solid"
                  className="fs-2"
                />
              </button>
            </OverlayTrigger>
            <OverlayTrigger
              placement="left"
              overlay={renderTooltip("Projeyi Düzenle")}>
              <button
                onClick={handleOpenEditModal}
                type="button"
                name="edit"
                className="btn btn-icon btn-sm btn-color-gray-500 btn-active-icon-primary me-2">
                <KTIcon
                  iconName="ki-solid ki-pencil"
                  iconType="solid"
                  className="fs-2"
                />
              </button>
            </OverlayTrigger>
            <OverlayTrigger placement="left" overlay={renderTooltip("Kapat")}>
              <button
                onClick={() => handleClose(true)}
                type="button"
                name="edit"
                className="btn btn-icon btn-sm btn-color-gray-500 btn-active-icon-primary me-2">
                <KTIcon
                  iconName="ki-solid ki-cross"
                  iconType="solid"
                  className="fs-2"
                />
              </button>
            </OverlayTrigger>
          </div>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column">
          {projectData && (
            <div className="d-flex flex-column gap-4">
              <div className="d-flex flex-column gap-2">
                <div className="d-flex align-items-center gap-3">
                  <KTIcon
                    iconName="ki-solid ki-file"
                    iconType="solid"
                    className="fs-2"
                  />
                  <span className="fs-2">Proje Bilgileri</span>
                </div>
                <span className="fs-4">{projectData.description}</span>
                <span className="fs-4">{projectData.detail}</span>
              </div>
              {/* Proje Tarihleri */}
              <div className="d-flex flex-column mt-7">
                <div className="d-flex align-items-center gap-2">
                  <KTIcon
                    iconName="ki-solid ki-calendar"
                    iconType="solid"
                    className="fs-2"
                  />
                  <span className=" fs-2">Proje Tarihleri</span>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <span className="fs-5">Başlangıç Tarihi:</span>
                  <span>
                    {moment(projectData.startingDate).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-3 mt-4">
                  <span className="fs-5">Bitiş Tarihi:</span>
                  <span>
                    {moment(projectData.endDate).format("DD/MM/YYYY")}
                  </span>
                </div>
              </div>
              {/* Proje Aşamaları */}
              <div className="d-flex flex-column mt-7">
                <div className="d-flex align-items-center gap-2">
                  <KTIcon
                    iconName="ki-solid ki-chart"
                    iconType="solid"
                    className="fs-2"
                  />
                  <span className=" fs-2">Proje Aşamaları</span>
                </div>

                {projectData.stages.length > 0 ? (
                  projectData.stages.map((stage: any, idx: number) => (
                    <div
                      key={idx}
                      className="col-12 card d-flex flex-row align-items-center justify-content-between p-3 m-2">
                      <div className="d-flex flex-column gap-2">
                        <h3>{stage.description}</h3>
                        <span>
                          {moment(stage.startingDate).format("DD/MM/YYYY")} -{" "}
                          {moment(stage.endDate).format("DD/MM/YYYY")}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="d-flex flex-column  align-items-center">
                    <KTIcon
                      iconName="ki-solid ki-cross"
                      className="text-danger fs-1"
                      iconType="solid"
                    />
                    <span className="fs-5">Aşama Bulunamadı</span>
                  </div>
                )}
              </div>
              {/* Proje Yöneticileri */}
              <div className="d-flex flex-column mt-7">
                <div className="d-flex align-items-center gap-2">
                  <KTIcon
                    iconName="ki-solid ki-briefcase"
                    iconType="solid"
                    className="fs-2"
                  />
                  <span className=" fs-2">Proje Yöneticileri</span>
                </div>

                {projectData.relateds.length > 0 ? (
                  projectData.relateds.map(
                    (related: any, idx: number) =>
                      related.admin && (
                        <div
                          key={idx}
                          className="col-12 card d-flex flex-row align-items-center justify-content-between p-3 m-2">
                          <div className="d-flex flex-column gap-2">
                            <h3>
                              {related.admin.name}-{related.admin.surname}
                            </h3>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="d-flex flex-column  align-items-center">
                    <KTIcon
                      iconName="ki-solid ki-cross"
                      className="text-danger fs-1"
                      iconType="solid"
                    />
                    <span className="fs-5">Yönetici Bulunamadı</span>
                  </div>
                )}
              </div>
              {/* Proje Çalışanları */}
              <div className="d-flex flex-column mt-7">
                <div className="d-flex align-items-center gap-2">
                  <KTIcon
                    iconName="ki-solid ki-user"
                    iconType="solid"
                    className="fs-2"
                  />
                  <span className=" fs-2">Proje Çalışanları</span>
                </div>

                {projectData.relateds.length > 0 ? (
                  projectData.relateds.map(
                    (related: any, idx: number) =>
                      related.employee && (
                        <div
                          key={idx}
                          className="col-12 card d-flex flex-row align-items-center justify-content-between p-3 m-2">
                          <div className="d-flex flex-column gap-2">
                            <h3>
                              {related.employee.name}-{related.employee.surname}
                            </h3>
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="d-flex flex-column  align-items-center">
                    <KTIcon
                      iconName="ki-solid ki-cross"
                      className="text-danger fs-1"
                      iconType="solid"
                    />
                    <span className="fs-5">Çalışan Bulunamadı</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <CreateAppModal
        show={openEditModal}
        projectId={projectId}
        handleClose={handleEditCloseModal}
        state="Edit"
      />
    </>
  );
};

export default AppInfoModal;
