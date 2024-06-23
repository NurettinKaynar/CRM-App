import React, { useEffect, useState } from "react";
import { KTCard, KTIcon } from "../../../../_metronic/helpers";
import { Table } from "react-bootstrap";
import CustomPagination from "../../../shared/pagination/Pagination";
import {
  deletePersonnel,
  editPersonnel,
  getEmployeeList,
} from "../../core/_requests";
import { AxiosResponse } from "axios";
import ActionButtons from "../../../shared/ActionsButtons/ActionButtons";
import AddPersonnel from "../../components/AddPersonnelModal/AddPersonnel";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [showCreateAppModal, setShowCreateAppModal] = useState<boolean>(false);
  const [editEmployeeId, setEditEmployeeId] = useState<number>(0);
  const [state, setState] = useState<"Create" | "Edit">("Create");
  const handleCreateProjectOpenModal = () => {
    setShowCreateAppModal(true);
    setState("Create");
  };

  const handleAddPersonnel = () => {
    handleGetEmployeeList();
    setShowCreateAppModal(false);
  };

  const handleGetEmployeeList = () => {
    getEmployeeList().then((res: AxiosResponse) => {
      if (res.status === 200) {
        setEmployeeList(res.data);
        console.log("data", res.data);
      }
    });
  };

  const handleDeletePersonnel = (personnelId: number) => {

    Swal.fire({
      title: "Personel Silinecektir Onaylıyor Musunuz?",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText:"Hayır",
      customClass:{
        confirmButton:"btn fw-bold btn-danger",
        cancelButton:"btn btn-text fw-bold btn-active-light-primary",
      },
      icon:"question",

    }).then((result) => {
     
      if (result.isConfirmed) {
        
        deletePersonnel(personnelId).then((res:AxiosResponse<any>)=>{
          if(res.status===200){
            toast.success("Personel Silindi!");
            Swal.fire({
              title:"Personel Silindi!",
              icon:"success",
              confirmButtonText:"Tamam",
              customClass:{
                confirmButton:"btn fw-bold btn-primary",
              }
            }).then(()=>{
              handleGetEmployeeList()
            })
          }
        }).catch((err:any)=>{
          toast.error("Personel Silinemedi!");
          Swal.fire({
            title:"Personel Silinemedi!",
            icon:"error",
            confirmButtonText:"Tamam",
            customClass:{
              confirmButton:"btn fw-bold btn-primary",
            }
          })
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
  };
  const handleEditEmployee = (employeeId: number) => {
    setState("Edit");
    setEditEmployeeId(employeeId);
    setShowCreateAppModal(true);
  };

  useEffect(() => {
    handleGetEmployeeList();
  }, []);

  return (
    <KTCard>
      <div className="d-flex flex-column p-5">
        {/* Header */}
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-end">
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
              Personel Ekle
            </button>
          </div>
        </div>
        {/* Header End */}
        <div className="table-responsive">
          <Table className="table table-striped gy-7 gs-7">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Adı </th>
                <th>Soyadı</th>
                <th>E-posta Adresi</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {employeeList.length > 0 ? (
                employeeList.map((employee: any, idx: number) => (
                  <tr key={idx}>
                    <td>{employee.name}</td>
                    <td>{employee.surname}</td>
                    <td>{employee.email}</td>

                    <td>
                      <ActionButtons
                        onClickEdit={() => handleEditEmployee(employee.id)}
                        onClickDelete={() => handleDeletePersonnel(employee.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center fs-1" colSpan={5}>
                    Personel Bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        <AddPersonnel
          state={state}
          show={showCreateAppModal}
          handleClose={() => handleAddPersonnel()}
          personnelId={editEmployeeId}
        />
      </div>
    </KTCard>
  );
};

export default EmployeeList;
