import React, { useEffect, useState } from 'react'
import { KTCard, KTIcon } from '../../../_metronic/helpers'
import { Table } from 'react-bootstrap';
import moment from 'moment';
import CustomPagination from '../../shared/pagination/Pagination';
import ActionButtons from '../../shared/ActionsButtons/ActionButtons';
import Swal from 'sweetalert2';
import { deleteTaskById, getTaskList } from '../core/_requests';
import { AxiosResponse } from 'axios';
import AddEditTaskModal from '../components/AddEditTaskModal';

const TaskList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [taskListData, setTaskListData] = useState<any[]>([]);
  const [showAddEditTaskModal, setShowAddEditTaskModal] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<number>(0);
  const [state, setState] = useState<"Create" | "Edit">("Create");
  
  const handleSearchValue = (e: any) => {
    setSearchTerm(e.target.value);
    handleGetTaskList(currentPage, searchTerm);
  };

  const handleGetTaskList = (currentPage: number, searchTerm:string)=>{
    const requestBody={
      page:currentPage,
      quantity:15,
      word:searchTerm?searchTerm:null,
    }
    getTaskList(requestBody).then((res:AxiosResponse<any>)=>{
      if(res.status===200||res.status===201){

        setTaskListData(res.data)
      }
    }).catch(err=>{
      console.error("GÖrev Listesi Getirilemedi",err);
      setTaskListData([])
    })
  }

  const handleChangePage = (e: number) => {
    setCurrentPage(e);
    handleGetTaskList(e, searchTerm);
  };

  const handleEditTask=(taskId:number)=>{
    setShowAddEditTaskModal(true)
    setState("Edit")
    setTaskId(taskId)
    
  }

  const handleCloseModal=()=>{
   setShowAddEditTaskModal(false);
   handleGetTaskList(currentPage,searchTerm)
  }

  const handleCreateOpenAddEditModal=()=>{
    setState("Create")
    setShowAddEditTaskModal(true)
  }

  const handleDeleteTask=(taskId:number)=>{
    Swal.fire({

      title: "Görevi silmek istediğinizden emin misiniz",
      showCancelButton: true,
      confirmButtonText: "Kaydet",
      cancelButtonText:"Vazgeç",
      customClass:{
        confirmButton:"btn fw-bold btn-danger",
        cancelButton:"btn fw-bold btn-active-light-primary",
      },
      icon:"question",

    }).then((result) => {
      if (result.isConfirmed) {
      deleteTaskById(taskId).then((res:AxiosResponse<any>)=>{
        if(res.status === 200){
          handleGetTaskList(currentPage,searchTerm)
          Swal.fire({
            title:"Görev Silindi!",
            icon:"success",
            confirmButtonText:"Tamam",
            customClass:{
              confirmButton:"btn fw-bold btn-primary",
            }
          })
        }
      })
      
      } else if (result.isDismissed) {
        Swal.fire({
          title:"İptal Edildi",
          icon:"info",
          confirmButtonText:"Tamam",
          customClass:{
            confirmButton:"btn fw-bold btn-primary",
          }
        })
      }
    });

    
  }
  useEffect(() => {
  handleGetTaskList(currentPage,searchTerm)

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
              onClick={()=>handleCreateOpenAddEditModal()}
              >
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
  )
}

export default TaskList