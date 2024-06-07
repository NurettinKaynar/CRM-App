import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { createPersonnel, editPersonnel } from "../../core/_requests";
import { AxiosResponse } from "axios";
interface PersonnelModalProps {
  show: boolean;
  handleClose: (e: boolean) => void;
  state: "Edit" | "Create";
  personnel: any;
}

const personnelFormValidateScheme = Yup.object().shape({
  name: Yup.string().required("İsim zorunlu"),
  surname: Yup.string().required("Soyisim zorunlu"),
  email: Yup.string()
    .email("Hatalı e-posta formatı")
    .required("E-posta zorunlu"),
  password: Yup.string(),
});

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
};

const AddPersonnel = ({
  show,
  handleClose,
  state,
  personnel,
}: PersonnelModalProps) => {
  const handleCloseState = () => {
    handleClose(true);
    personnelForm.resetForm();
  };
  console.log("personel bilgisi", personnel);

  const [isUserLoading, setIsUserLoading] = useState<boolean>();
  const [initialValues, setInitialValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });
  const blankImg = toAbsoluteUrl("media/svg/avatars/blank.svg");
  const userAvatarImg =
    state === "Edit" &&
    personnel.images &&
    personnel.images[0] &&
    personnel.images[0].path
      ? toAbsoluteUrl(`media/${personnel.images[0].path}`)
      : blankImg;

  const personnelForm = useFormik({
    initialValues: initialValues,
    validationSchema: personnelFormValidateScheme,
    onSubmit: async (values, actions) => {
      if (state === "Create") {
        handleCreatePersonnel(values);
      } else {
        handleUpdatePersonnel(values);
      }
    },
  });

  const handleCreatePersonnel = (formValues: any) => {
    setIsUserLoading(true);
    createPersonnel(formValues).then((res: AxiosResponse) => {
      if (res.status === 200) {
        setIsUserLoading(false);
        handleCloseState();
      }
    });
  };

  const handleUpdatePersonnel = (formValues: any) => {
    setIsUserLoading(true);
    formValues.id = personnel.id;
    editPersonnel(formValues).then((res: AxiosResponse) => {
      if (res.status === 200) {
        setIsUserLoading(false);
        handleCloseState();
      }
    });
  };

  useEffect(() => {
    console.log("state", state);

    if (state === "Edit" && personnel) {
      setInitialValues({
        name: personnel.name,
        surname: personnel.surname,
        email: personnel.email,
        password: personnel.password,
      });
    } else {
      setInitialValues({
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    }
  }, [state, personnel, show]);

  return (
    <Modal
      centered
      show={show}
      onHide={() => handleCloseState()}
      dialogClassName="modal-dialog modal-dialog-centered mw-900px">
      <Modal.Header className="modal-header">
        <h2 className="fw-bolder">Personel Ekle</h2>
        <div
          className="btn btn-icon btn-sm btn-active-icon-primary"
          data-kt-users-modal-action="close"
          onClick={handleCloseState}
          style={{ cursor: "pointer" }}>
          <KTIcon iconName="cross" className="fs-1" />
        </div>
      </Modal.Header>
      <Modal.Body>
        <Form
          id="kt_modal_add_user_form"
          className="form"
          onSubmit={personnelForm.handleSubmit}
          noValidate>
          <div
            className="d-flex flex-column scroll-y me-n7 pe-7"
            id="kt_modal_add_user_scroll"
            data-kt-scroll="true"
            data-kt-scroll-activate="{default: false, lg: true}"
            data-kt-scroll-max-height="auto"
            data-kt-scroll-dependencies="#kt_modal_add_user_header"
            data-kt-scroll-wrappers="#kt_modal_add_user_scroll"
            data-kt-scroll-offset="300px">
            <div className="fv-row mb-7">
              <label className="d-block fw-bold fs-6 mb-5">Profil</label>
              <div
                className="image-input image-input-outline"
                data-kt-image-input="true"
                style={{ backgroundImage: `url('${blankImg}')` }}>
                <div
                  className="image-input-wrapper w-125px h-125px"
                  style={{
                    backgroundImage: `url('${userAvatarImg}')`,
                  }}></div>
                <label
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Profil Değiştir">
                  <i className="bi bi-pencil-fill fs-7"></i>

                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                </label>

                <span
                  className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  title="Profili Kaldır">
                  <i className="bi bi-x fs-2"></i>
                </span>
              </div>
              <div className="form-text">
                İzin verilen dosya tipleri: png, jpg, jpeg.
              </div>

              <Form.Group className="fv-row mb-7">
                <Form.Label>Personel Adı</Form.Label>
                <Form.Control
                  placeholder="Personel Adı"
                  {...personnelForm.getFieldProps("name")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        personnelForm.touched.name && personnelForm.errors.name,
                    },
                    {
                      "is-valid":
                        personnelForm.touched.name &&
                        !personnelForm.errors.name,
                    }
                  )}
                />
                {personnelForm.touched.name && personnelForm.errors.name && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {personnelForm.errors.name}
                    </div>
                  </div>
                )}
              </Form.Group>
              <Form.Group className="fv-row mb-7">
                <Form.Label>Personel Soyadı</Form.Label>
                <Form.Control
                  placeholder="Personel Soyadı"
                  {...personnelForm.getFieldProps("surname")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        personnelForm.touched.surname &&
                        personnelForm.errors.surname,
                    },
                    {
                      "is-valid":
                        personnelForm.touched.surname &&
                        !personnelForm.errors.surname,
                    }
                  )}
                />
                {personnelForm.touched.surname &&
                  personnelForm.errors.surname && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {personnelForm.errors.surname}
                      </div>
                    </div>
                  )}
              </Form.Group>
              <Form.Group className="fv-row mb-7">
                <Form.Label>Personel E-posta Adresi</Form.Label>
                <Form.Control
                  as="input"
                  type="email"
                  placeholder="Personel E-posta Adresi"
                  {...personnelForm.getFieldProps("email")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        personnelForm.touched.email &&
                        personnelForm.errors.email,
                    },
                    {
                      "is-valid":
                        personnelForm.touched.email &&
                        !personnelForm.errors.email,
                    }
                  )}
                />
                {personnelForm.touched.email && personnelForm.errors.email && (
                  <div className="fv-plugins-message-container">
                    <div className="fv-help-block">
                      {personnelForm.errors.email}
                    </div>
                  </div>
                )}
              </Form.Group>

              <Form.Group className="fv-row mb-7">
                <Form.Label>Personel Şifresi</Form.Label>
                <Form.Control
                  as="input"
                  type="password"
                  placeholder="Personel Şifresi"
                  {...personnelForm.getFieldProps("password")}
                  className={clsx(
                    "form-control bg-transparent",
                    {
                      "is-invalid":
                        personnelForm.touched.password &&
                        personnelForm.errors.password,
                    },
                    {
                      "is-valid":
                        personnelForm.touched.password &&
                        !personnelForm.errors.password,
                    }
                  )}
                />
                {personnelForm.touched.password &&
                  personnelForm.errors.password && (
                    <div className="fv-plugins-message-container">
                      <div className="fv-help-block">
                        {personnelForm.errors.password}
                      </div>
                    </div>
                  )}
              </Form.Group>
              <div className="mb-7">
                <label className="required fw-bold fs-6 mb-5">Rolü</label>

                <div className="d-flex fv-row">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input me-3"
                      name="role"
                      type="radio"
                      value="Administrator"
                      id="kt_modal_update_role_option_0"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="kt_modal_update_role_option_0">
                      <div className="fw-bolder text-gray-800">Yönetici</div>
                      <div className="text-gray-600">
                        İşletme sahipleri ve şirket yöneticileri için en iyisi
                      </div>
                    </label>
                  </div>
                </div>

                <div className="separator separator-dashed my-5"></div>

                <div className="d-flex fv-row">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input me-3"
                      name="role"
                      type="radio"
                      value="Developer"
                      id="kt_modal_update_role_option_1"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="kt_modal_update_role_option_1">
                      <div className="fw-bolder text-gray-800">Geliştirici</div>
                      <div className="text-gray-600">
                        Geliştiriciler veya öncelikli olarak API kullanan
                        kişiler için en iyisi
                      </div>
                    </label>
                  </div>
                </div>

                <div className="separator separator-dashed my-5"></div>

                <div className="d-flex fv-row">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input me-3"
                      name="role"
                      type="radio"
                      value="Analyst"
                      id="kt_modal_update_role_option_2"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="kt_modal_update_role_option_2">
                      <div className="fw-bolder text-gray-800">Analist</div>
                      <div className="text-gray-600">
                        Analitik verilere tam erişime ihtiyaç duyan kişiler için
                        en iyisi, ancak iş ayarlarını güncellemenize gerek yok
                      </div>
                    </label>
                  </div>
                </div>

                <div className="separator separator-dashed my-5"></div>

                <div className="d-flex fv-row">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input me-3"
                      name="role"
                      type="radio"
                      value="Support"
                      id="kt_modal_update_role_option_3"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="kt_modal_update_role_option_3">
                      <div className="fw-bolder text-gray-800">Destek</div>
                      <div className="text-gray-600">
                        Ödemeleri düzenli olarak iade eden ve yanıt veren
                        çalışanlar için en iyisi anlaşmazlıklara
                      </div>
                    </label>
                  </div>
                </div>

                <div className="separator separator-dashed my-5"></div>

                <div className="d-flex fv-row">
                  <div className="form-check form-check-custom form-check-solid">
                    <input
                      className="form-check-input me-3"
                      name="role"
                      type="radio"
                      id="kt_modal_update_role_option_4"
                      value="Trial"
                    />

                    <label
                      className="form-check-label"
                      htmlFor="kt_modal_update_role_option_4">
                      <div className="fw-bolder text-gray-800">Deneme</div>
                      <div className="text-gray-600">
                        İçerik verilerini önizlemesi gereken ancak bunu yapmayan
                        kişiler için en iyisi herhangi bir güncelleme yapmanız
                        gerekiyor
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center pt-15">
              <button
                type="reset"
                onClick={() => handleCloseState()}
                className="btn btn-light me-3"
                data-kt-users-modal-action="cancel"
                disabled={personnelForm.isSubmitting || isUserLoading}>
                Vazgeç
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                data-kt-users-modal-action="submit"
                disabled={
                  isUserLoading ||
                  personnelForm.isSubmitting ||
                  !personnelForm.isValid ||
                  !personnelForm.touched
                }>
                <span className="indicator-label">Kaydet</span>
                {(personnelForm.isSubmitting || isUserLoading) && (
                  <span className="indicator-progress">
                    Lütfen bekleyin...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPersonnel;
