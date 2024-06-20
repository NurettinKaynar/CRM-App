import React, { useEffect, useState } from 'react'
import { Form, Modal } from 'react-bootstrap'
import { createTask, getTaskById, updateTask } from '../core/_requests';
import { AxiosResponse } from 'axios';
import {  FormikProps, useFormik } from 'formik';
import * as Yup from "yup"
import clsx from 'clsx';
import Flatpickr from "react-flatpickr";
import { Turkish } from "flatpickr/dist/l10n/tr";
import { KTIcon } from '../../../_metronic/helpers';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
interface AddEditModalProps {
    show: boolean;
    handleClose: (e: boolean) => void;
    state: "Edit" | "Create";
    taskId: number;
  }

  const validation=Yup.object().shape({
    Tite: Yup.string().required("Zorunlu Alan"),
    Description: Yup.string().required("Zorunlu Alan"),
    isCompleted: Yup.number().required("Zorunlu Alan"),
    startingDate:Yup.date().required("Zorunlu Alan"),
    endDate:Yup.date().required("Zorunlu Alan")
  })
  
const AddEditTaskModal = ({show,handleClose,state,taskId}:AddEditModalProps) => {
        const [initialValues, setInitialValues] = useState({
            Tite:"",
            Description:"",
            isCompleted:0,
            startingDate:new Date(),
            endDate:new Date(),
        });


    const taskForm=useFormik({
            initialValues:initialValues,
            validationSchema:validation,
            enableReinitialize:true,
            onSubmit(values) {
                console.log("gönderildi",values);
                if(state=="Create"){
                  handleCreateTask()
                }
                if(state==="Edit"){
                  handleEditTask()
                }
            },

    })

    const handleCloseState=()=>{
        handleClose(true)
    }


    const handleGetTaskById=()=>{
        if(state==="Edit"&& taskId){
            getTaskById(taskId).then((res:AxiosResponse<any>)=>{
                    if(res.status===200){
                        console.log("editlenecek",res.data);
                        setInitialValues({
                          Tite:res.data.Tite,
                          Description:res.data.Description,
                          isCompleted:res.data.isCompleted,
                          startingDate:new Date(res.data.startingDate),
                          endDate:new Date(res.data.endDate),
                        })
                        taskForm.setFieldValue("Tite",res.data.Tite)
                        taskForm.setFieldValue("Description",res.data.Description)
                        taskForm.setFieldValue("isCompleted",res.data.isCompleted)
                        taskForm.setFieldValue("startingDate",res.data.startingDate)
                        taskForm.setFieldValue("endDate",res.data.endDate)

                    }
            })
        }
    }

    const handleCreateTask=()=>{
      Swal.fire({
        title: "Görev Oluşturulacaktır onaylıyor musunuz?",
        showCancelButton: true,
        confirmButtonText: "Kaydet",
        cancelButtonText:"Vazgeç",
        customClass:{
          confirmButton:"btn fw-bold btn-primary",
          cancelButton:"btn btn-text fw-bold btn-active-light-primary",
        },
        icon:"question",
  
      }).then((result) => {
       
        if (result.isConfirmed) {
          const request=taskForm.values
          request.isCompleted=Number(request.isCompleted)
          createTask(request).then((res:AxiosResponse<any>)=>{
            if(res.status===200){
              toast.success("Görev Başarıyla Oluşturuldu");
              Swal.fire({
                title:"Görev Oluşturuldu!",
                icon:"success",
                confirmButtonText:"Tamam",
                customClass:{
                  confirmButton:"btn fw-bold btn-primary",
                }
              }).then(()=>{
                handleClose(true)
              })
            }
          }).catch(err=>{
            toast.error("Görev Oluşturulamadı!");
            Swal.fire({
              title:"Görev Oluşturulamadı!",
              icon:"error",
              confirmButtonText:"Tamam",
              customClass:{
                confirmButton:"btn fw-bold btn-primary",
              }
            }).then(()=>{
              handleClose(true)
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
     
    }
    useEffect(()=>{
      if(state==="Edit"){
        handleGetTaskById()
      }
    },[state])

    const handleEditTask=()=>{
      Swal.fire({
        title: "Görev Düzenlenecektir onaylıyor musunuz?",
        showCancelButton: true,
        confirmButtonText: "Kaydet",
        cancelButtonText:"Vazgeç",
        customClass:{
          confirmButton:"btn fw-bold btn-primary",
          cancelButton:"btn btn-text fw-bold btn-active-light-primary",
        },
        icon:"question",
        
      }).then((result) => {
        
        if (result.isConfirmed) {
          const request:any=taskForm.values
          request.isCompleted=Number(request.isCompleted)
          request.id=taskId
          updateTask(request).then((res:AxiosResponse<any>)=>{
            if(res.status===200){
              toast.success("Görev Düzenlendi")
              Swal.fire({
                title:"Görev Düzenlendi!",
                icon:"success",
                confirmButtonText:"Tamam",
                customClass:{
                  confirmButton:"btn fw-bold btn-primary",
                }
              }).then(()=>{
                handleClose(true)
              })
            }
          }).catch((err)=>{
            console.error("Görev Düzenlenemedi",err);
            toast.success("Görev Düzenlenemedi")
            Swal.fire({
              title:"Görev Düzenlenemedi!",
              
              icon:"error",
              confirmButtonText:"Tamam",
              customClass:{
                confirmButton:"btn fw-bold btn-primary",
              }
            }).then(()=>{
              handleClose(true)
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
    }

  return (
    <Modal 
    centered
    show={show}
    onHide={() => handleCloseState()}
    dialogClassName="modal-dialog modal-dialog-centered mw-900px"
    >
        <Modal.Header closeButton>

    <Modal.Title>
        {state==="Create"?"Görev Oluştur":"Görevi Düzenle"}
    </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body py-lg-10 px-lg-10">
        <Form
          id="kt_modal_add_user_form"
          className="form"
          onSubmit={taskForm.handleSubmit}
          noValidate>
          <div className="d-flex flex-column scroll-y me-n7 pe-7">
            <div className="fv-row mb-7">
            <Form.Group className="fv-row mb-7">
                <Form.Label>Görev Adı</Form.Label>
                <Form.Control
                  placeholder="Görev Adı"
                  {...taskForm.getFieldProps("Tite")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        taskForm.touched.Tite && taskForm.errors.Tite,
                    },
                    {
                      "is-valid":
                        taskForm.touched.Tite &&
                        !taskForm.errors.Tite,
                    }
                  )}
                />
                {taskForm.touched.Tite && taskForm.errors.Tite && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {taskForm.errors.Tite}
                    </div>
                  </div>
                )}
              </Form.Group>
            <Form.Group className="fv-row mb-7">
                <Form.Label>Görev Açıklaması</Form.Label>
                <Form.Control
                as="textarea"
                  placeholder="Görev Açıklaması"
                  {...taskForm.getFieldProps("Description")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        taskForm.touched.Description && taskForm.errors.Description,
                    },
                    {
                      "is-valid":
                        taskForm.touched.Description &&
                        !taskForm.errors.Description,
                    }
                  )}
                />
                {taskForm.touched.Description && taskForm.errors.Description && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {taskForm.errors.Description}
                    </div>
                  </div>
                )}
              </Form.Group>
              <div className='row' >
                <div className="col-md-6 col-12">

            <Form.Group className="fv-row mb-7">
                <Form.Label>Görev Başlangıç Tarihi</Form.Label>
                <Flatpickr
                      translate="yes"
                      options={{
                        locale: Turkish,
                      }}
                      {...taskForm.getFieldProps("startingDate")}
                      onChange={(value: any) => {
                        taskForm.setFieldValue("startingDate", new Date(value));
                      }}
                      type="date"
                      className="form-control"
                      placeholder="Bitiş Tarihi Giriniz"
                    />
                {taskForm.touched.startingDate && taskForm.errors.startingDate && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {taskForm.errors.startingDate}
                    </div>
                  </div>
                )}
              </Form.Group>
                </div>
                <div className="col-md-6 col-12">

            <Form.Group className="fv-row mb-7">
                <Form.Label>Görev Bitiş Tarihi</Form.Label>
                <Flatpickr
                      translate="yes"
                      options={{
                        locale: Turkish,
                      }}
                      {...taskForm.getFieldProps("endDate")}
                      onChange={(value: any) => {
                        taskForm.setFieldValue("endDate", new Date(value));
                      }}
                      type="date"
                      className="form-control"
                      placeholder="Bitiş Tarihi Giriniz"
                    />
                {taskForm.touched.endDate && taskForm.errors.endDate && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {taskForm.errors.endDate}
                    </div>
                  </div>
                )}
              </Form.Group>
              </div>
              <div className="row">
                <Form.Label className='col-12'>Görev Durumu</Form.Label>
                <Form.Group className='col'>
                <label className="btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6">
                     
                        <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                          <Form.Control
                           {...taskForm.getFieldProps("isCompleted")}
                          type="radio"
                          className="form-check-input"
                          value={1}
                          >

                          </Form.Control>
                        </span>
                        <span className="ms-5">
                            <span className="fs-4 fw-bold text-gray-800 d-block">Tamamlandı</span>
                        </span>
                     
                    </label>

                </Form.Group>
           
                <Form.Group className='col'>
                <label className="btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6" >
                     
                        <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                          <Form.Control
                           {...taskForm.getFieldProps("isCompleted")}
                          type="radio"
                          className="form-check-input"
                          value={0}
                          >

                          </Form.Control>
                        </span>
                        <span className="ms-5">
                            <span className="fs-4 fw-bold text-gray-800 d-block">Tamamlanmadı</span>
                        </span>
                     
                    </label>

                </Form.Group>
           
              </div>
              </div>
                </div>
                </div>
                <button
                      type="submit"
                      className="btn btn-lg btn-primary w-100"
                      disabled={!taskForm.isValid}
                      >
                      Gönder
                      <KTIcon
                        iconName="arrow-right"
                        className="fs-3 ms-2 me-0"
                      />
                    </button>
                </Form>

        </Modal.Body>

    </Modal>
  )
}

export default AddEditTaskModal