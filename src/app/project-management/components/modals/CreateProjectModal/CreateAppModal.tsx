import { AxiosError, AxiosResponse } from "axios";
import clsx from "clsx";
import { Turkish } from "flatpickr/dist/l10n/tr";
import { useFormik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { KTIcon } from "../../../../../_metronic/helpers";
import {
  createProject,
  editProject,
  getAdminsData,
  getEmployeeList,
  getProjectById,
} from "../../../core/_request";

import StepperComp, { Step } from "../../../../shared/StepperComp/StepperComp";
import { steps } from "../../helpers/steps";

interface CreateAppModalProps {
  show: boolean;
  handleClose: (e: boolean) => void;
  state: "Edit" | "Create";
  projectId: number;
}

const validate = Yup.object().shape({
  title: Yup.string().required("Zorunlu Alan"),
  description: Yup.string().required("Zorunlu Alan"),
  detail: Yup.string().required("Zorunlu Alan"),
  startingDate: Yup.string().required("Zorunlu Alan"),
  endDate: Yup.string().required("Zorunlu Alan"),
  isCompleted: Yup.bool().required("Zorunlu Alan"),
});


const CreateAppModal = ({
  show,
  handleClose,
  state,
  projectId,
}: CreateAppModalProps) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    detail: "",
    startingDate: "",
    endDate: "",
    isCompleted:false,
    stages: [],
    relateds: [],
  });

  const [activeStep, setActiveStep] = useState(1);
  const [adminListData, setAdminListData] = useState<any[]>([]);
  const [employeeListData, setEmployeeListData] = useState<any[]>([]);

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

  const handleGetProject = () => {
    getProjectById(projectId).then((res: AxiosResponse) => {
      console.log("PROJE DATASI", res.data);

      const reqData = res.data;
      setInitialValues({
        title: reqData.tite || "",
        description: reqData.description || "",
        startingDate: reqData.startingDate || "",
        endDate: reqData.endDate || "",
        detail: reqData.detail || "",
        stages: reqData.stages || "",
        isCompleted: reqData.isCompleted || "",
        relateds: reqData.relateds || [],
      });
    });
  };

  useEffect(() => {
    if (state === "Edit"&&projectId!==0) {
      handleGetProject();
    } else {
      setInitialValues({
        title: "",
        description: "",
        startingDate: "",
        endDate: "",
        detail: "",
        isCompleted: false,
        stages: [],
        relateds: [],
      });
    }
  }, [state, projectId, show]);

  useEffect(() => {
    if (activeStep === 2) {
      handleGetAdminList();
    }
    if (activeStep === 3) {
      handleGetEmployeeList();
    }
  }, [activeStep]);

  const handleGetEmployeeList = () => {
    getEmployeeList()
      .then((res: AxiosResponse<any[]>) => {
        if (res.status === 200) {
          setEmployeeListData(res.data);
        }
      })
      .catch((err: AxiosResponse) => {
        console.error("err:", err);

        setEmployeeListData([]);
      });
  };

  const handleCloseState = () => {
    handleClose(true);
    setActiveStep(1);
    setAdminListData([]);
    setEmployeeListData([]);
    formik.resetForm();
    AdminDataForm.resetForm();
    employeeDataForm.resetForm();
  };

  const handleGetAdminList = () => {
    getAdminsData()
      .then((res: AxiosResponse<any[]>) => {
        if (res.status === 200) {
          console.log("admin Data Geldi", res.data);
          setAdminListData(res.data);
        }
      })
      .catch((err: AxiosError) => {
        console.error("adminData gelmedi", err);
        setAdminListData([]);
      });
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: validate,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      if (state === "Create") {
        handleCreateObject(values);
      } else {
        handleEditProject(values);
      }
    },
  });



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
      const relateds: any[] = formik.values.relateds
        ? [...formik.values.relateds]
        : [];
      relateds.push(values);
      formik.setFieldValue("relateds", relateds);
      console.log(formik.values.relateds);
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
      const relateds: any[] = formik.values.relateds
        ? [...formik.values.relateds]
        : [];
      relateds.push(values);
      formik.setFieldValue("relateds", relateds);
    },
  });



  const handleDeleteAdmin = (related: any) => {
    let admin: any[] = formik.values.relateds;
    admin = admin.filter((x) => x !== related);
    formik.setFieldValue("relateds", admin);
  };

  const handleCreateObject = (formValues: any) => {
    const request = {
      tite: formValues.title,
      description: formValues.description,
      detail: formValues.detail,
      startingDate: formValues.startingDate,
      endDate: formValues.endDate,
      isCompleted: formValues.isCompleted,
      relateds: formValues.relateds,

    };
    createProject(request)
      .then((res: AxiosResponse<any>) => {
        toast.success("Proje Başarıyla Eklendi");
        handleCloseState();
      })
      .catch((err: AxiosError) => {
        toast.error("Proje Eklenemedi");
        console.error("Proje Eklenme Sorunu", err);
      });
  };

  const handleEditProject = (formValues: any) => {
    const request = {
      id: projectId,
      tite: formValues.title,
      description: formValues.description,
      detail: formValues.detail,
      startingDate: formValues.startingDate,
      endDate: formValues.endDate,
      isCompleted: formValues.isCompleted,
   
      relateds: formValues.relateds,
    };

    editProject(request)
      .then((res: AxiosResponse<any>) => {
        toast.success("Proje Başarıyla Güncellendi");
        handleCloseState();
      })
      .catch((err: AxiosError) => {
        toast.error("Proje Güncellenemedi");
        console.error("Proje Güncellenme Sorunu", err);
      });
  };

  return (
    <Modal
      centered
      show={show}
      onHide={() => handleCloseState()}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px">
      <Modal.Header closeButton>
        <Modal.Title>
          {state === "Create" ? "Proje Oluştur" : "Projeyi Düzenle"}
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
            <StepperComp
              currentStep={activeStep}
              stepData={steps.stepData}
            />
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className="flex-row-fluid py-lg-5 px-lg-15">
            {/*begin::Form */}
            <form noValidate id="kt_modal_create_app_form">
              {/* Step 1 */}
              {activeStep === 1 ? (
                <Form className="row">
                  <Form.Group
                    className=" col-12 mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Label>Uygulama Adı</Form.Label>
                    <Form.Control
                      placeholder="Uygulama Adı"
                      {...formik.getFieldProps("title")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.title && formik.errors.title,
                        },
                        {
                          "is-valid":
                            formik.touched.title && !formik.errors.title,
                        }
                      )}
                    />
                    {formik.touched.title && formik.errors.title && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.title}
                        </div>
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group className="col-12 mb-3">
                    <Form.Label>Uygulama Açıklaması</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Uygulama Açıklaması"
                      {...formik.getFieldProps("description")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.description &&
                            formik.errors.description,
                        },
                        {
                          "is-valid":
                            formik.touched.description &&
                            !formik.errors.description,
                        }
                      )}
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div className="fv-plugins-message-container">
                          <div className="fv-help-block">
                            {formik.errors.description}
                          </div>
                        </div>
                      )}
                  </Form.Group>
                  <Form.Group className="col-12 mb-3">
                    <Form.Label>Uygulama Detayları</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Uygulama Detayları"
                      {...formik.getFieldProps("detail")}
                      className={clsx(
                        "form-control bg-transparent",
                        {
                          "is-invalid":
                            formik.touched.detail && formik.errors.detail,
                        },
                        {
                          "is-valid":
                            formik.touched.detail && !formik.errors.detail,
                        }
                      )}
                    />
                    {formik.touched.detail && formik.errors.detail && (
                      <div className="fv-plugins-message-container">
                        <div className="fv-help-block">
                          {formik.errors.detail}
                        </div>
                      </div>
                    )}
                  </Form.Group>
                  <Form.Group
                    className="col-md-6 col-12 mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Label>Başlangıç Tarihi</Form.Label>

                    <Flatpickr
                      translate="yes"
                      options={{
                        locale: Turkish,
                      }}
                      {...formik.getFieldProps("startingDate")}
                      className="form-control"
                      placeholder="Başlangıç Tarihi Giriniz"
                      type="date"
                      onChange={(value: any) => {
                        formik.setFieldValue("startingDate", new Date(value));
                      }}
                    />
                  </Form.Group>
                  <Form.Group
                    className="col-md-6 col-12 mb-3"
                    controlId="exampleForm.ControlInput1">
                    <Form.Label>Bitiş Tarihi</Form.Label>

                    <Flatpickr
                      translate="yes"
                      options={{
                        locale: Turkish,
                      }}
                      {...formik.getFieldProps("endDate")}
                      onChange={(value: any) => {
                        formik.setFieldValue("endDate", new Date(value));
                      }}
                      type="date"
                      className="form-control"
                      placeholder="Bitiş Tarihi Giriniz"
                    />
                  </Form.Group>
                  <div className="row">
                <Form.Label className='col-12'>Proje Durumu</Form.Label>
          
                <Form.Group className='col'>
                <label className="btn btn-outline btn-outline-dashed btn-active-light-primary  d-flex text-start p-6">
                     
                        <span className="form-check form-check-custom form-check-solid form-check-sm align-items-start mt-1">
                          <Form.Control
                           {...formik.getFieldProps("isCompleted")}
                          type="radio"
                          checked={formik.values.isCompleted}
                          className="form-check-input"
                          value={true}
                          onChange={(e)=>formik.setFieldValue("isCompleted",true)}
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
                           {...formik.getFieldProps("isCompleted")}
                          type="radio"
                          checked={!formik.values.isCompleted}
                          onChange={(e)=>formik.setFieldValue("isCompleted",false)}
                          className="form-check-input"
                          value={false}
                          >

                          </Form.Control>
                        </span>
                        <span className="ms-5">
                            <span className="fs-4 fw-bold text-gray-800 d-block">Tamamlanmadı</span>
                        </span>
                     
                    </label>

                </Form.Group>
           
              </div>
                </Form>
              ) : null}
              {activeStep === 2 ? (
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
                      {formik.values.relateds &&
                        formik.values.relateds.map(
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
              ) : null}
              {activeStep === 3 ? (
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
                      {formik.values.relateds &&
                        formik.values.relateds.map(
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
                                      onClick={() => handleDeleteAdmin(related)}
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
              ) : null}

              {/*begin::Actions */}
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
                      onClick={formik.submitForm}>
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
              {/*end::Actions */}
            </form>
            {/*end::Form */}
          </div>
          {/*end::Content */}
        </div>
        {/* end::Stepper */}
      </Modal.Body>
    </Modal>
  );
};

export default CreateAppModal;
