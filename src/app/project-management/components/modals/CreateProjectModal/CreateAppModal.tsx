import { AxiosError, AxiosResponse } from "axios";
import clsx from "clsx";
import { Turkish } from "flatpickr/dist/l10n/tr";
import { FormikErrors, useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import Flatpickr from "react-flatpickr";
import * as Yup from "yup";

import { toast } from "react-toastify";
import { createProject, editProject } from "../../../core/_request";
import { KTIcon } from "../../../../../_metronic/helpers";

import { Step5 } from "../../../../../_metronic/partials/modals/create-app-stepper/steps/Step5";
import { StepperComponent } from "../../../../../_metronic/assets/ts/components";
import {
  ICreateAppData,
  defaultCreateAppData,
} from "../../../../../_metronic/partials/modals/create-app-stepper/IAppModels";
import { Step1 } from "../../../../../_metronic/partials/modals/create-app-stepper/steps/Step1";
import { Step2 } from "../../../../../_metronic/partials/modals/create-app-stepper/steps/Step2";
import { Step3 } from "../../../../../_metronic/partials/modals/create-app-stepper/steps/Step3";
import { Step4 } from "../../../../../_metronic/partials/modals/create-app-stepper/steps/Step4";

interface CreateAppModalProps {
  show: boolean;
  handleClose: (e: boolean) => void;
  state: "Edit" | "Create";
  project: any;
}

const validate = Yup.object().shape({
  title: Yup.string().required("Zorunlu Alan"),
  description: Yup.string().required("Zorunlu Alan"),
  detail: Yup.string().required("Zorunlu Alan"),
  startingDate: Yup.string().required("Zorunlu Alan"),
  endDate: Yup.string().required("Zorunlu Alan"),
});

let initValues = {
  title: "",
  description: "",
  detail: "",
  startingDate: "",
  endDate: "",
};

const CreateAppModal = ({
  show,
  handleClose,
  state,
  project,
}: CreateAppModalProps) => {
  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    detail: "",
    startingDate: "",
    endDate: "",
  });

  const stepperRef = useRef<HTMLDivElement | null>(null);
  const [stepper, setStepper] = useState<StepperComponent | null>(null);
  const [data, setData] = useState<ICreateAppData>(defaultCreateAppData);
  const [hasError, setHasError] = useState(false);

  const loadStepper = () => {
    setStepper(
      StepperComponent.createInsance(stepperRef.current as HTMLDivElement)
    );
  };

  const updateData = (fieldsToUpdate: Partial<ICreateAppData>) => {
    const updatedData = { ...data, ...fieldsToUpdate };
    setData(updatedData);
  };

  const checkAppBasic = (): boolean => {
    if (!data.appBasic.appName || !data.appBasic.appType) {
      return false;
    }
    return true;
  };

  const checkAppDataBase = (): boolean => {
    if (!data.appDatabase.databaseName || !data.appDatabase.databaseSolution) {
      return false;
    }

    return true;
  };

  const prevStep = () => {
    if (!stepper) {
      return;
    }

    stepper.goPrev();
  };

  const nextStep = () => {
    setHasError(false);
    if (!stepper) {
      return;
    }

    if (stepper.getCurrentStepIndex() === 1) {
      if (!checkAppBasic()) {
        setHasError(true);
        return;
      }
    }

    if (stepper.getCurrentStepIndex() === 3) {
      if (!checkAppDataBase()) {
        setHasError(true);
        return;
      }
    }

    stepper.goNext();
  };

  const submit = () => {
    window.location.reload();
  };

  useEffect(() => {
    loadStepper();
    if (state === "Edit" && project) {
      setInitialValues({
        title: project.tite || "",
        description: project.description || "",
        startingDate: project.startingDate || "",
        endDate: project.endDate || "",
        detail: project.detail || "",
      });
    } else {
      setInitialValues({
        title: "",
        description: "",
        startingDate: "",
        endDate: "",
        detail: "",
      });
    }
  }, [state, project, show]);

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

  const handleCreateObject = (formValues: any) => {
    const request = {
      tite: formValues.title,
      description: formValues.description,
      detail: formValues.detail,
      startingDate: formValues.startingDate,
      endDate: formValues.endDate,
    };
    createProject(request)
      .then((res: AxiosResponse<any>) => {
        toast.success("Proje Başarıyla Eklendi");
        handleClose(true);
      })
      .catch((err: AxiosError) => {
        toast.error("Proje Eklenemedi");
        console.error("Proje Eklenme Sorunu", err);
      });
  };

  const handleEditProject = (formValues: any) => {
    const request = {
      id: project.id,
      tite: formValues.title,
      description: formValues.description,
      detail: formValues.detail,
      startingDate: formValues.startingDate,
      endDate: formValues.endDate,
    };

    editProject(request)
      .then((res: AxiosResponse<any>) => {
        toast.success("Proje Başarıyla Güncellendi");
        handleClose(true);
      })
      .catch((err: AxiosError) => {
        toast.error("Proje Güncellenemedi");
        console.error("Proje Güncellenme Sorunu", err);
      });
  };

  const renderError = (
    error:
      | string
      | string[]
      | FormikErrors<any>
      | FormikErrors<any>[]
      | undefined
  ) => {
    if (typeof error === "string") {
      return <span role="alert">{error}</span>;
    }
    return null;
  };

  return (
    <Modal
      centered
      show={show}
      onHide={() => handleClose(true)}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px">
      <Modal.Header closeButton>
        <Modal.Title>
          {state === "Create" ? "Proje Oluştur" : "Projeyi Düzenle"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body py-lg-10 px-lg-10">
        {/*begin::Stepper */}
        <div
          ref={stepperRef}
          className="stepper stepper-pills stepper-column d-flex flex-column flex-xl-row flex-row-fluid w-100"
          id="kt_modal_create_app_stepper">
          {/* begin::Aside*/}
          <div className="d-flex justify-content-center justify-content-xl-start flex-row-auto w-100 w-xl-300px">
            {/* begin::Nav*/}
            <div className="stepper-nav ps-lg-10">
              {/* begin::Step 1*/}
              <div
                className="stepper-item current"
                data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">1</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Proje Bilgileri</h3>

                    <div className="stepper-desc">
                      Proje bilgilerini giriniz
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 1*/}

              {/* begin::Step 2*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">2</span>
                  </div>
                  {/* begin::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Frameworks</h3>

                    <div className="stepper-desc">
                      Define your app framework
                    </div>
                  </div>
                  {/* begin::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 2*/}

              {/* begin::Step 3*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">3</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Database</h3>

                    <div className="stepper-desc">
                      Select the app database type
                    </div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 3*/}

              {/* begin::Step 4*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">4</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Storage</h3>

                    <div className="stepper-desc">Provide storage details</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}

                {/* begin::Line*/}
                <div className="stepper-line h-40px"></div>
                {/* end::Line*/}
              </div>
              {/* end::Step 4*/}

              {/* begin::Step 5*/}
              <div className="stepper-item" data-kt-stepper-element="nav">
                {/* begin::Wrapper*/}
                <div className="stepper-wrapper">
                  {/* begin::Icon*/}
                  <div className="stepper-icon w-40px h-40px">
                    <i className="stepper-check fas fa-check"></i>
                    <span className="stepper-number">5</span>
                  </div>
                  {/* end::Icon*/}

                  {/* begin::Label*/}
                  <div className="stepper-label">
                    <h3 className="stepper-title">Completed</h3>

                    <div className="stepper-desc">Review and Submit</div>
                  </div>
                  {/* end::Label*/}
                </div>
                {/* end::Wrapper*/}
              </div>
              {/* end::Step 5*/}
            </div>
            {/* end::Nav*/}
          </div>
          {/* begin::Aside*/}

          {/*begin::Content */}
          <div className="flex-row-fluid py-lg-5 px-lg-15">
            {/*begin::Form */}
            <form noValidate id="kt_modal_create_app_form">
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
                        {renderError(formik.errors.title)}
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
                  {formik.touched.description && formik.errors.description && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {renderError(formik.errors.description)}
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
                        {renderError(formik.errors.detail)}
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
              </Form>

              <Step2 data={data} updateData={updateData} hasError={hasError} />
              <Step3 data={data} updateData={updateData} hasError={hasError} />
              <Step4 data={data} updateData={updateData} hasError={hasError} />
              <Step5 />

              {/*begin::Actions */}
              <div className="d-flex flex-stack pt-10">
                <div className="me-2">
                  <button
                    type="button"
                    className="btn btn-lg btn-light-primary me-3"
                    data-kt-stepper-action="previous"
                    onClick={prevStep}>
                    <KTIcon iconName="arrow-left" className="fs-3 me-1" />{" "}
                    Önceki Adım
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-kt-stepper-action="submit"
                    onClick={submit}>
                    Submit{" "}
                    <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
                  </button>

                  <button
                    type="button"
                    className="btn btn-lg btn-primary"
                    data-kt-stepper-action="next"
                    onClick={nextStep}>
                    Sonraki Adım{" "}
                    <KTIcon iconName="arrow-right" className="fs-3 ms-1 me-0" />
                  </button>
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
