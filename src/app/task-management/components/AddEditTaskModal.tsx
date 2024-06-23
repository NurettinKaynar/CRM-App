import React, { useCallback, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { createTask, getTaskById, updateTask } from "../core/_requests";
import { AxiosError, AxiosResponse } from "axios";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Flatpickr from "react-flatpickr";
import { Turkish } from "flatpickr/dist/l10n/tr";
import { KTIcon } from "../../../_metronic/helpers";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { TaskStatus } from "../../utilities/enums";
import StepperComp, { Step } from "../../shared/StepperComp/StepperComp";
import { steps } from "../helpers/steps";
import ProjectDropdown from "../../shared/ProjectDropdown/ProjectDropdown";
import Dropzone, { useDropzone } from "react-dropzone";
import { getAdminsData, getEmployeeList } from "../../project-management/core/_request";
interface AddEditModalProps {
  show: boolean;
  handleClose: (e: boolean) => void;
  state: "Edit" | "Create";
  taskId: number;
}

const validation = Yup.object().shape({
  tite: Yup.string().required("Zorunlu Alan"),
  description: Yup.string().required("Zorunlu Alan"),
  isCompleted: Yup.number().required("Zorunlu Alan"),
  startingDate: Yup.date().required("Zorunlu Alan"),
  endDate: Yup.date().required("Zorunlu Alan"),
});

const AddEditTaskModal = ({
  show,
  handleClose,
  state,
  taskId,
}: AddEditModalProps) => {
  const [adminListData, setAdminListData] = useState<any[]>([]);
  const [employeeListData, setEmployeeListData] = useState<any[]>([]);
  const [files, setFiles] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState({
    tite: "",
    description: "",
    isCompleted: TaskStatus.NotCompleted,
    startingDate: new Date(),
    endDate: new Date(),
    relateds: [],
  });
  const [activeStep, setActiveStep] = useState(1);

  const handleDrop = (e: File[]) => {
    console.log("gelen dosya", e);
    const final: any[] = [];

    e.forEach((file: any) => {
      file.url = URL.createObjectURL(file);
      final.push(file);
    });
    setFiles(final);
  };
  const handleDeleteFile = (file: any) => {
    setFiles(files.filter((x) => x !== file));
  };
  const prevStep = useCallback(() => {
    setActiveStep(activeStep - 1);

    const step: Step[] = steps.stepData;
    step.forEach((step) => {
      if (step.step === activeStep) {
        step.active = true;
      }
      if (step.step < activeStep) {
        step.active = false;
        step.completed = true;
      }
    });
    steps.stepData = step;
  }, [activeStep]);

  const nextStep = useCallback(() => {
    setActiveStep(activeStep + 1);
    const step: Step[] = steps.stepData;
    step.forEach((step) => {
      if (step.step === activeStep) {
        step.active = true;
      }
      if (step.step < activeStep) {
        step.active = false;
        step.completed = true;
      }
    });
    steps.stepData = step;
  }, [activeStep]);

  const taskForm = useFormik({
    initialValues: initialValues,
    validationSchema: validation,
    enableReinitialize: true,
    onSubmit(values) {
      console.log("gönderildi", values);
      if (state == "Create") {
        handleCreateTask();
      }
      if (state === "Edit") {
        handleEditTask();
      }
    },
  });

  const handleCloseState = () => {
    handleClose(true);
    setActiveStep(1);
    setAdminListData([]);
    setEmployeeListData([]);
 AdminDataForm.resetForm();
    employeeDataForm.resetForm();
  };
  // TODO: Seçilen Bağlı Proje Eklenecek
  const handleSelectedProject = (e: any) => {
    console.log("seçilen proje", e);
  };

  const handleGetTaskById = () => {
    if (state === "Edit" && taskId) {
      getTaskById(taskId).then((res: AxiosResponse<any>) => {
        if (res.status === 200) {
          console.log("editlenecek", res.data);
          setInitialValues({
            tite: res.data.tite,
            description: res.data.description,
            isCompleted: res.data.isCompleted,
            startingDate: new Date(res.data.startingDate),
            endDate: new Date(res.data.endDate),
            relateds: res.data.relateds,
          });
          taskForm.setFieldValue("tite", res.data.tite);
          taskForm.setFieldValue("description", res.data.description);
          taskForm.setFieldValue("isCompleted", res.data.isCompleted);
          taskForm.setFieldValue("startingDate", res.data.startingDate);
          taskForm.setFieldValue("endDate", res.data.endDate);

          console.log("formValue", taskForm.values);
        }
      });
    }
  };

  const handleCreateTask = () => {
    Swal.fire({
      title: "Görev Oluşturulacaktır onaylıyor musunuz?",
      showCancelButton: true,
      confirmButtonText: "Kaydet",
      cancelButtonText: "Vazgeç",
      customClass: {
        confirmButton: "btn fw-bold btn-primary",
        cancelButton: "btn btn-text fw-bold btn-active-light-primary",
      },
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        const request: any = taskForm.values;
        request.isCompleted = Number(request.isCompleted);
        createTask(request)
          .then((res: AxiosResponse<any>) => {
            if (res.status === 200) {
              toast.success("Görev Başarıyla Oluşturuldu");
              Swal.fire({
                title: "Görev Oluşturuldu!",
                icon: "success",
                confirmButtonText: "Tamam",
                customClass: {
                  confirmButton: "btn fw-bold btn-primary",
                },
              }).then(() => {
                handleClose(true);
              });
            }
          })
          .catch((err) => {
            toast.error("Görev Oluşturulamadı!");
            Swal.fire({
              title: "Görev Oluşturulamadı!",
              icon: "error",
              confirmButtonText: "Tamam",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            }).then(() => {
              handleClose(true);
            });
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

  const handleEditTask = () => {
    Swal.fire({
      title: "Görev Düzenlenecektir onaylıyor musunuz?",
      showCancelButton: true,
      confirmButtonText: "Kaydet",
      cancelButtonText: "Vazgeç",
      customClass: {
        confirmButton: "btn fw-bold btn-primary",
        cancelButton: "btn btn-text fw-bold btn-active-light-primary",
      },
      icon: "question",
    }).then((result) => {
      if (result.isConfirmed) {
        const request: any = taskForm.values;
        request.isCompleted = Number(request.isCompleted);
        request.id = taskId;
        updateTask(request)
          .then((res: AxiosResponse<any>) => {
            if (res.status === 200) {
              toast.success("Görev Düzenlendi");
              Swal.fire({
                title: "Görev Düzenlendi!",
                icon: "success",
                confirmButtonText: "Tamam",
                customClass: {
                  confirmButton: "btn fw-bold btn-primary",
                },
              }).then(() => {
                handleClose(true);
              });
            }
          })
          .catch((err) => {
            console.error("Görev Düzenlenemedi", err);
            toast.success("Görev Düzenlenemedi");
            Swal.fire({
              title: "Görev Düzenlenemedi!",

              icon: "error",
              confirmButtonText: "Tamam",
              customClass: {
                confirmButton: "btn fw-bold btn-primary",
              },
            }).then(() => {
              handleClose(true);
            });
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

  const AdminDataForm = useFormik({
    initialValues: {
      adminId: null,
      name: "",
      surname: "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const selectedAdmin = adminListData.find(
        (x) => x.id === Number(values.adminId)
      );
      if (selectedAdmin) {
        values.adminId = selectedAdmin.id;
        values.name = selectedAdmin.name;
        values.surname = selectedAdmin.surname;
      }
      const relateds: any[] = taskForm.values.relateds
        ? [...taskForm.values.relateds]
        : [];
      relateds.push(values);
      taskForm.setFieldValue("relateds", relateds);
     
    },
  });

  const employeeDataForm = useFormik({
    initialValues: {
      employeeId: null,
      name: "",
      surname: "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const selectedEmployee = employeeListData.find(
        (x) => x.id === Number(values.employeeId)
      );
      if (selectedEmployee) {
        values.employeeId = selectedEmployee.id;
        values.name = selectedEmployee.name;
        values.surname = selectedEmployee.surname;
      }
      const relateds: any[] = taskForm.values.relateds
        ? [...taskForm.values.relateds]
        : [];
      relateds.push(values);
      taskForm.setFieldValue("relateds", relateds);
    },
  });



  const handleDeleteAdmin = (related: any) => {
    let admin: any[] = taskForm.values.relateds;
    admin = admin.filter((x) => x !== related);
    taskForm.setFieldValue("relateds", admin);
  };
  const handleDeleteEmployee = (related: any) => {
    let employee: any[] = taskForm.values.relateds;
    employee = employee.filter((x) => x !== related);
    taskForm.setFieldValue("relateds", employee);
  };


  const handleGetAdminList = () => {
    getAdminsData()
      .then((res: AxiosResponse<any[]>) => {
        if (res.status === 200) {
          console.log("admin Data Geldi", res.data);
          setAdminListData(res.data);
        }
      }).catch((err: AxiosError) => {
        console.error("adminData gelmedi", err);
        setAdminListData([]);
      });
  };
  const handleGetGetEmployeeList = () => {
    getEmployeeList()
      .then((res: AxiosResponse<any[]>) => {
        if (res.status === 200) {
          console.log("employee Geldi", res.data);
          setEmployeeListData(res.data);
        }
      }).catch((err: AxiosError) => {
        console.error("adminData gelmedi", err);
        setEmployeeListData([]);
      });
  };

  useEffect(() => {
    if (state === "Edit") {
      handleGetTaskById();
    }
  }, [state]);
  useEffect(() => {
    if(activeStep===3){
      handleGetAdminList()
    }
    if(activeStep===4){
      handleGetGetEmployeeList()
    }
    
  }, [activeStep]);

  return (
    <Modal
      centered
      show={show}
      onHide={() => handleCloseState()}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px">
      <Modal.Header closeButton>
        <Modal.Title>
          {state === "Create" ? "Görev Oluştur" : "Görevi Düzenle"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body py-lg-10 px-lg-10">
        {/*begin::Stepper */}
        <div
          className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid w-100"
          id="kt_modal_create_app_stepper">
          {/* begin::Aside*/}
          <div className="d-flex justify-content-center  justify-content-xl-start flex-row-auto w-100 w-xl-300px">
            {/* begin::Nav*/}
            <StepperComp currentStep={activeStep} stepData={steps.stepData} />
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className="flex-row-fluid py-lg-5 px-lg-15">
            {/*begin::Form */}
            <form noValidate id="kt_modal_create_app_form">
              {activeStep === 1 && (
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
                          {...taskForm.getFieldProps("tite")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                taskForm.touched.tite && taskForm.errors.tite,
                            },
                            {
                              "is-valid":
                                taskForm.touched.tite && !taskForm.errors.tite,
                            }
                          )}
                        />
                        {taskForm.touched.tite && taskForm.errors.tite && (
                          <div className="fv-plugins-message-container">
                            <div className="fv-help-block">
                              {taskForm.errors.tite}
                            </div>
                          </div>
                        )}
                      </Form.Group>
                      <Form.Group className="fv-row mb-7">
                        <Form.Label>Görev Açıklaması</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Görev Açıklaması"
                          {...taskForm.getFieldProps("description")}
                          className={clsx(
                            "form-control bg-transparent",
                            {
                              "is-invalid":
                                taskForm.touched.description &&
                                taskForm.errors.description,
                            },
                            {
                              "is-valid":
                                taskForm.touched.description &&
                                !taskForm.errors.description,
                            }
                          )}
                        />
                        {taskForm.touched.description &&
                          taskForm.errors.description && (
                            <div className="fv-plugins-message-container">
                              <div className="fv-help-block">
                                {taskForm.errors.description}
                              </div>
                            </div>
                          )}
                      </Form.Group>
                      <div className="row">
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
                                taskForm.setFieldValue(
                                  "startingDate",
                                  new Date(value)
                                );
                              }}
                              type="date"
                              className="form-control"
                              placeholder="Bitiş Tarihi Giriniz"
                            />
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
                                taskForm.setFieldValue(
                                  "endDate",
                                  new Date(value)
                                );
                              }}
                              type="date"
                              className="form-control"
                              placeholder="Bitiş Tarihi Giriniz"
                            />
                          </Form.Group>
                        </div>
                        <div className="row">
                          <Form.Label className="col-12">
                            Görev Durumu
                          </Form.Label>

                          <Form.Group className="col">
                            <label className="btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6">
                              <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                <Form.Control
                                  {...taskForm.getFieldProps("isCompleted")}
                                  type="radio"
                                  checked={
                                    taskForm.values.isCompleted ===
                                    TaskStatus.Completed
                                  }
                                  className="form-check-input"
                                  value={TaskStatus.Completed}
                                  onChange={(e) =>
                                    taskForm.setFieldValue(
                                      "isCompleted",
                                      TaskStatus.Completed
                                    )
                                  }></Form.Control>
                              </span>
                              <span className="ms-5">
                                <span className="fs-4 fw-bold text-gray-800 d-block">
                                  Tamamlandı
                                </span>
                              </span>
                            </label>
                          </Form.Group>

                          <Form.Group className="col">
                            <label className="btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6">
                              <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                                <Form.Control
                                  {...taskForm.getFieldProps("isCompleted")}
                                  type="radio"
                                  checked={
                                    taskForm.values.isCompleted ===
                                    TaskStatus.NotCompleted
                                  }
                                  onChange={(e) =>
                                    taskForm.setFieldValue(
                                      "isCompleted",
                                      TaskStatus.NotCompleted
                                    )
                                  }
                                  className="form-check-input"
                                  value={
                                    TaskStatus.NotCompleted
                                  }></Form.Control>
                              </span>
                              <span className="ms-5">
                                <span className="fs-4 fw-bold text-gray-800 d-block">
                                  Tamamlanmadı
                                </span>
                              </span>
                            </label>
                          </Form.Group>
                        </div>
                        <Form.Group className="row">
                          <Form.Label>Bağlı Proje Seçin</Form.Label>

                          <ProjectDropdown
                            selectedValue={handleSelectedProject}
                          />
                        </Form.Group>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
              {activeStep === 2 && (
                <Dropzone
                  multiple={true}
                  onDrop={handleDrop}
                  maxFiles={5}
                  accept={{
                    "image/*": [".jpeg", ".png", ".jpg"],
                  }}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps({})} className="dropzone">
                      {files.length > 0 ? (
                        <div className="d-flex flex-wrap">
                          {files.map((file, index) => (
                            <div
                              key={index}
                              className="dz-preview  dz-image-preview  position-relative shadow-lg w-75px bg-white rounded">
                              <div className="dz-image rounded">
                                <img
                                  className="w-75px"
                                  src={file.url}
                                  alt={file.name}
                                />
                              </div>
                              <span
                                onClick={() => handleDeleteFile(file)}
                                className="dz-remove position-absolute"></span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className="dz-message needsclick">
                            <KTIcon
                              iconName="file-up"
                              className="fs-3x text-primary"
                            />
                          </div>
                          <div className="ms-4 d-flex flex-column">
                            <h3 className="fs-5 fw-bold text-gray-900 mb-1">
                              Sürükle-bırak yada yükle
                            </h3>
                            <span className="fs-7 fw-semibold text-gray-500">
                              Sadece 5 dosya yükleyebilirsiniz
                            </span>
                            <span className="fs-7 fw-semibold text-gray-500">
                              İzin verilen dosya türleri: .jpg, .jpeg, .png
                            </span>
                          </div>
                        </>
                      )}
                      <input {...getInputProps({ multiple: true })} />
                    </div>
                  )}
                </Dropzone>
              )}
              { activeStep===3&&(
                  <div className="row">
                  <div className="col-12">
                    <Form className="row">
                      <Form.Group className="col-12 mb-3">
                        <Form.Label>Yönetici seçin ve ekleyin</Form.Label>
                        <Form.Select
                          aria-label="Seçin"
                          {...AdminDataForm.getFieldProps("adminId")}>
                          {adminListData.map((admin, idx) => (
                            <option key={idx} value={admin.id}>
                              {admin.name} {admin.surname}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <button
                        type="button"
                        className="btn btn-lg btn-light-primary me-3"
                        onClick={()=>AdminDataForm.submitForm()}>
                        <KTIcon iconName="plus" className="fs-3 me-1" /> Ekle
                      </button>
                    </Form>
                  </div>
                  <div className="col-12">
                    <div className="row">
                      {taskForm.values.relateds &&
                        taskForm.values.relateds.map(
                          (related: any, idx: number) =>
                            related.admin||related.adminId ? (
                              <div
                                key={idx}
                                className="col-12 card d-flex flex-row align-items-center justify-content-between p-3 m-2">
                                <div className="d-flex flex-column gap-2">
                                  <h3>
                                    {state === "Edit" && related.admin
                                      ? related.admin.name
                                      : related.name}{" "}
                                    -{" "}
                                    {state === "Edit" && related.admin
                                      ? related.admin.surname
                                      : related.surname}
                                  </h3>
                                </div>

                                <button
                                  onClick={() => handleDeleteAdmin(related)}
                                  type="button"
                                  className="btn btn-sm btn-light-danger ">
                                  <KTIcon iconName="trash" className="fs-3" />
                                </button>
                              </div>
                            ) : null
                        )}
                    </div>
                  </div>
                </div>
              )}
              {activeStep===4&&(
                <div className="row">
                <div className="col-12">
                  <Form className="row">
                    <Form.Group className="col-12 mb-3">
                      <Form.Label>Çalışan Seçin</Form.Label>
                      <Form.Select
                        aria-label="Seçin"
                        {...employeeDataForm.getFieldProps("employeeId")}>
                        {employeeListData.map((admin, idx) => (
                          <option key={idx} value={admin.id}>
                            {admin.name} {admin.surname}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    <button
                      type="button"
                      className="btn btn-lg btn-light-primary me-3"
                      onClick={employeeDataForm.submitForm}>
                      <KTIcon iconName="plus" className="fs-3 me-1" /> Ekle
                    </button>
                  </Form>
                </div>
                <div className="col-12">
                  <div className="row">
                    {taskForm.values.relateds &&
                      taskForm.values.relateds.map(
                        (related: any, idx: number) => (
                          <div key={idx} className="col-12">
                            <div className="row">
                              {related.employeeId ? (
                                <div
                                  key={idx}
                                  className="col-12 card d-flex flex-row align-items-center justify-content-between p-3 m-2">
                                  <div className="d-flex flex-column gap-2">
                                    <h3>
                                      {state === "Edit" && related.employee
                                        ? related.employee.name
                                        : related.name}{" "}
                                      -{" "}
                                      {state === "Edit" && related.employee
                                        ? related.employee.surname
                                        : related.surname}
                                    </h3>
                                  </div>

                                  <button
                                    onClick={() => handleDeleteEmployee(related)}
                                    type="button"
                                    className="btn btn-sm btn-light-danger ">
                                    <KTIcon
                                      iconName="trash"
                                      className="fs-3"
                                    />
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
              )}
              {activeStep===5&&(
                <Form.Group>
                    <Form.Label>Yorum Giriniz</Form.Label>
                  <Form.Control
                  as="textarea"
                  
                  />
                  
                </Form.Group>
              )}
              <div className="d-flex flex-stack pt-10">
                <div className="me-2">
                  {activeStep !== steps.totalSteps && activeStep > 1 ? (
                    <button
                      type="button"
                      className="btn btn-lg btn-light-primary me-3"
                      onClick={prevStep}>
                      <KTIcon iconName="arrow-left" className="fs-3 me-1" />{" "}
                      Önceki Adım
                    </button>
                  ) : null}
                </div>
                <div>
                  {activeStep === steps.totalSteps ? (
                    <button
                      type="button"
                      className="btn btn-lg btn-primary"
                      onClick={taskForm.submitForm}>
                      Gönder
                      <KTIcon
                        iconName="arrow-right"
                        className="fs-3 ms-2 me-0"
                      />
                    </button>
                  ) : null}
                  {activeStep < steps.totalSteps ? (
                    <button
                      type="button"
                      className="btn btn-lg btn-primary"
                      onClick={nextStep}>
                      Sonraki Adım{" "}
                      <KTIcon
                        iconName="arrow-right"
                        className="fs-3 ms-1 me-0"
                      />
                    </button>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AddEditTaskModal;
