import React, { useEffect, useState } from "react";

import { OverlayTrigger, Table, Tooltip } from "react-bootstrap";
import moment from "moment";

import Swal from "sweetalert2";

import { AxiosResponse } from "axios";
import { KTCard, KTIcon } from "../../../../_metronic/helpers";
import ActionButtons from "../../../shared/ActionsButtons/ActionButtons";
import CustomPagination from "../../../shared/pagination/Pagination";
import AddEditTaskModal from "../../../task-management/components/AddEditTaskModal";
import {
  getTaskList,
  deleteTaskById,
} from "../../../task-management/core/_requests";
import { TaskStatus } from "../../../utilities/enums";

const TaskList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [taskListData, setTaskListData] = useState<any[]>([]);
  const [showAddEditTaskModal, setShowAddEditTaskModal] =
    useState<boolean>(false);
  const [taskId, setTaskId] = useState<number>(0);
  const [state, setState] = useState<"Create" | "Edit">("Create");

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

  const handleSearchValue = (e: any) => {
    setSearchTerm(e.target.value);
    handleGetTaskList(currentPage, searchTerm);
  };

  const handleGetTaskList = (currentPage: number, searchTerm: string) => {
    const requestBody = {
      page: currentPage,
      quantity: 15,
      word: searchTerm ? searchTerm : null,
    };
    getTaskList(requestBody)
      .then((res: AxiosResponse<any>) => {
        if (res.status === 200 || res.status === 201) {
          setTaskListData(res.data.list);
        }
      })
      .catch((err) => {
        console.error("GÖrev Listesi Getirilemedi", err);
        setTaskListData([]);
      });
  };

  const handleChangePage = (e: number) => {
    setCurrentPage(e);
    handleGetTaskList(e, searchTerm);
  };

  const handleEditTask = (taskId: number) => {
    setShowAddEditTaskModal(true);
    setState("Edit");
    setTaskId(taskId);
  };

  const handleCloseModal = () => {
    setShowAddEditTaskModal(false);
    handleGetTaskList(currentPage, searchTerm);
  };

  const handleCreateOpenAddEditModal = () => {
    setState("Create");
    setShowAddEditTaskModal(true);
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

  const handleDeleteTask = (taskId: number) => {
    Swal.fire({
      title: "Görevi silmek istediğinizden emin misiniz",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText: "Hayır",
      customClass: {
        confirmButton: "btn fw-bold btn-danger",
        cancelButton: "btn fw-bold btn-light btn-active-light-primary",
      },
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTaskById(taskId).then((res: AxiosResponse<any>) => {
          if (res.status === 200) {
            handleGetTaskList(currentPage, searchTerm);
            Swal.fire({
              title: "Görev Silindi!",
              icon: "success",
              confirmButtonText: "Tamam",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            });
          }
        });
      } else if (result.isDismissed) {
        Swal.fire({
          title: "İptal Edildi",
          icon: "info",
          confirmButtonText: "Tamam",
          customClass: {
            confirmButton: "btn fw-bold btn-primary",
          },
        });
      }
    });
  };
  useEffect(() => {
    handleGetTaskList(currentPage, searchTerm);
  }, []);

  return (
    <>
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
                placeholder="Görev Ara"
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
                onClick={() => handleCreateOpenAddEditModal()}>
                <KTIcon iconName="plus" className="fs-2" />
                Görev Ekle
              </button>
            </div>
          </div>
          {/* Header End */}
          <div className="table-responsive">
            <Table className="table table-striped gy-7 gs-7">
              <thead>
                <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                  <th>Görev Adı</th>
                  <th>Açıklaması</th>
                  <th>Başlangıç Tarihi</th>
                  <th>Bitiş Tarihi</th>
                  <th>Görev Durumu</th>
                  <th>Sorumlu Kişiler</th>
                  <th>İşlemler</th>
                </tr>
              </thead>
              <tbody>
                {taskListData.length > 0 ? (
                  taskListData.map((task, index) => (
                    <tr key={index}>
                      <td>{task.tite}</td>
                      <td>{task.description}</td>
                      <td>{moment(task.startingDate).format("DD/MM/YYYY")}</td>
                      <td>{moment(task.endDate).format("DD/MM/YYYY")}</td>
                      <td>
                        <span
                          className={`badge fw-bold me-auto ${
                            task.isCompleted === TaskStatus.NotCompleted
                              ? "badge-light-primary"
                              : "badge-light-success"
                          }`}>
                          {task.isCompleted === TaskStatus.NotCompleted
                            ? "Tamamlanmadı"
                            : "Tamamlandı"}
                        </span>
                      </td>

                      <td>
                        {" "}
                        <div className="symbol-group symbol-hover mb-3">
                          {handleUsers(task).length > 0 ? (
                            handleUsers(task).map((user, idx) => (
                              <UserAvatar user={user} key={idx} />
                            ))
                          ) : (
                            <span className="text-gray-900">
                              Sorumlu Bulunamadı
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="d-flex align-items-center gap-2">
                        <ActionButtons
                          onClickEdit={() => handleEditTask(task.id)}
                          onClickDelete={() => handleDeleteTask(task.id)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center fs-1" colSpan={5}>
                      Görev Bulunamadı
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
          {taskListData.length >= 15 ? (
            <CustomPagination
              total={taskListData.length}
              current={currentPage}
              onChangePage={handleChangePage}
            />
          ) : null}
        </div>
      </KTCard>
      <AddEditTaskModal
        show={showAddEditTaskModal}
        taskId={taskId}
        state={state}
        handleClose={handleCloseModal}
      />
    </>
  );
};

export default TaskList;
