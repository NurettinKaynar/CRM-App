import React, { useState, useEffect } from "react";
import { KTCard, KTIcon } from "../../../../_metronic/helpers";
import CreateAppModal from "../../components/modals/CreateProjectModal/CreateAppModal";
import CustomPagination from "../../../shared/pagination/Pagination";
import { Table } from "react-bootstrap";
import { getProjectList, deleteProject } from "../../core/_request";
import { AxiosError, AxiosResponse } from "axios";
import ActionButtons from "../../../shared/ActionsButtons/ActionButtons";
import { toast } from "react-toastify";
import moment from "moment";
import AppInfoModal from "../../components/modals/AppInfoModal/AppInfoModal";
const ProjectList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [editProjectId, setEditProjectId] = useState<number>(0);
  const [state, setState] = useState<"Create" | "Edit">("Create");
  const [projects, setProjects] = useState<any[]>([]);
  const [handleOpenDetailsModal, setHandleOpenDetailsModal] =
    useState<boolean>(false);
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);

  const handleChangePage = (e: number) => {
    setCurrentPage(e);
    getProjectData(e, searchTerm);
  };
  const handleOpenInfoModal = (projectId: number) => {
    setEditProjectId(projectId);
    setHandleOpenDetailsModal(true);
  };
  const handleCloseInfoModal = () => {
    setHandleOpenDetailsModal(false);
  };

  const handleSearchValue = (e: any) => {
    setSearchTerm(e.target.value);
    getProjectData(currentPage, searchTerm);
  };

  const handleCreateProject = () => {
    setShowCreateAppModal(false);
    getProjectData(currentPage, searchTerm);
  };

  const getProjectData = (currentPage: number, searchTerm: string) => {
    const queryData = {
      page: currentPage,
      quantity: 15,
      word: searchTerm ? searchTerm : null,
    };
    getProjectList(queryData)
      .then((res: AxiosResponse) => {
        console.log("res.data", res.data);
        setProjects(res.data.list);
      })
      .catch((err: AxiosError) => {
        console.error("Data Getirilemedi", err);
        setProjects([]);
      });
  };

  const handleEditProject = (projectId: number) => {
    setEditProjectId(projectId);
    setState("Edit");
    setShowCreateAppModal(true);
  };

  const deleteProjectOnList = (project: any) => {
    console.log("silinecek", project);
    deleteProject(project.id)
      .then((res: AxiosResponse) => {
        toast.success("Proje Başarıyla Silindi");
        getProjectData(currentPage, searchTerm);
      })
      .catch((err: AxiosError<any>) => {
        toast.error("Proje Silinemedi");
      });
  };
  const handleCreateProjectOpenModal = () => {
    setShowCreateAppModal(true);
    setState("Create");
  };

  useEffect(() => {
    getProjectData(currentPage, searchTerm);
  }, []);
  return (
    <KTCard>
      <div className="d-flex flex-column p-5">
        {/* Header */}
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
          <div className="d-flex align-items-center position-relative py-5 my-1">
            <KTIcon
              iconName="magnifier"
              className="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              data-kt-user-table-filter="search"
              className="form-control form-control-solid w-250px ps-14"
              placeholder="Proje Ara"
              value={searchTerm}
              onInput={(e) => handleSearchValue(e)}
            />
          </div>

          <div
            className="d-flex justify-content-end"
            data-kt-user-table-toolbar="base">
            <button type="button" className="btn btn-light-primary me-3">
              <KTIcon iconName="exit-up" className="fs-2" />
              Çıktı Al
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleCreateProjectOpenModal}>
              <KTIcon iconName="plus" className="fs-2" />
              Proje Ekle
            </button>
          </div>
        </div>
        {/* Header End */}
        <div className="table-responsive">
          <Table className="table table-striped gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Proje Adı</th>
                <th>Açıklaması</th>
                <th>Başlangıç Tarihi</th>
                <th>Bitiş Tarihi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {projects.length > 0 ? (
                projects.map((project, index) => (
                  <tr key={index}>
                    <td>{project.tite}</td>
                    <td>{project.description}</td>
                    <td>{moment(project.startingDate).format("DD/MM/YYYY")}</td>
                    <td>{moment(project.endDate).format("DD/MM/YYYY")}</td>
                    <td className="d-flex align-items-center gap-2">
                      <ActionButtons
                        onClickEdit={() => handleEditProject(project.id)}
                        onClickDelete={() => deleteProjectOnList(project)}
                      />
                      <button
                        onClick={() => handleOpenInfoModal(project.id)}
                        type="button"
                        className="btn btn-active-light-primary btn-sm">
                        <KTIcon iconName="note-2" className="fs-2" />
                        Detaylar
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center fs-1" colSpan={5}>
                    Proje Bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        {projects.length >= 15 ? (
          <CustomPagination
            total={projects.length}
            current={currentPage}
            onChangePage={handleChangePage}
          />
        ) : null}
        <CreateAppModal
          state={state}
          projectId={editProjectId}
          show={showCreateAppModal}
          handleClose={() => handleCreateProject()}
        />
        <AppInfoModal
          show={handleOpenDetailsModal}
          projectId={editProjectId}
          handleClose={handleCloseInfoModal}
        />
      </div>
    </KTCard>
  );
};

export default ProjectList;
