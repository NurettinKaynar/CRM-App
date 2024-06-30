import clsx from "clsx";
import { Field, Formik, useFormik } from "formik";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import Flatpickr from "react-flatpickr";
import { Turkish } from "flatpickr/dist/l10n/tr";
import axios, { AxiosError, AxiosResponse } from "axios";
import { createProject } from "../../../core/_requests";
import { toast } from "react-toastify";

const initVal = {
  title: "",
  description: "",
  detail: "",
  startingDate: "",
  endDate: "",
};

const validate = Yup.object().shape({
  title: Yup.string().required("Zorunlu Alan"),
  description: Yup.string().required("Zorunlu Alan"),
  detail: Yup.string().required("Zorunlu Alan"),
  startingDate: Yup.string().required("Zorunlu Alan"),
  endDate: Yup.string().required("Zorunlu Alan"),
});

const CreateAppModal = ({
  show,
  handleClose,
}: {
  show: any;
  handleClose: any;
}) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: initVal,
    enableReinitialize: true,
    validationSchema: validate,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);

      const request = {
        title: values.title,
        description: values.description,
        detail: values.detail,
        startingDate: values.startingDate,
        endDate: values.endDate,
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
    },
  });

  return (
    <Modal centered show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Proje Oluştur</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Uygulama Adı</Form.Label>
            <Form.Control
              placeholder="Uygulama Adı"
              {...formik.getFieldProps("title")}
              className={clsx(
                "form-control bg-transparent",
                { "is-invalid": formik.touched.title && formik.errors.title },
                {
                  "is-valid": formik.touched.title && !formik.errors.title,
                }
              )}
            />
            {formik.touched.title && formik.errors.title && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.title}</span>
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Uygulama Açıklaması</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Uygulama Açıklaması"
              {...formik.getFieldProps("description")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.description && formik.errors.description,
                },
                {
                  "is-valid":
                    formik.touched.description && !formik.errors.description,
                }
              )}
            />
            {formik.touched.description && formik.errors.description && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.description}</span>
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Uygulama Detayları</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Uygulama Detayları"
              {...formik.getFieldProps("detail")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid": formik.touched.detail && formik.errors.detail,
                },
                {
                  "is-valid": formik.touched.detail && !formik.errors.detail,
                }
              )}
            />
            {formik.touched.detail && formik.errors.detail && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.detail}</span>
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
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
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Vazgeç
        </Button>
        <Button variant="primary" onClick={formik.submitForm}>
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateAppModal;
