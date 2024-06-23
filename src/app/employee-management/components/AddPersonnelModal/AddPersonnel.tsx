import { AxiosResponse } from "axios";
import clsx from "clsx";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { KTIcon } from "../../../../_metronic/helpers";
import { createPersonnel, editPersonnel, getPersonnelById } from "../../core/_requests";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
interface PersonnelModalProps {
  show: boolean;
  handleClose: (e: boolean) => void;
  state: "Edit" | "Create";
  personnelId: number;
}

const personnelFormValidateScheme = Yup.object().shape({
  name: Yup.string().required("İsim zorunlu"),
  surname: Yup.string().required("Soyisim zorunlu"),
  email: Yup.string()
    .email("Hatalı e-posta formatı")
    .required("E-posta zorunlu"),
  password: Yup.string(),
});

const AddPersonnel = ({show, handleClose,state,personnelId}: PersonnelModalProps) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const personnelForm = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
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
    Swal.fire({
      title: "Personel Profili Kaydedilecektir Onaylıyor Musunuz?",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText:"Vazgeç",
      customClass:{
        confirmButton:"btn fw-bold btn-primary",
        cancelButton:"btn btn-text fw-bold btn-active-light-primary",
      },
      icon:"question",

    }).then((result) => {
     
      if (result.isConfirmed) {
        
        createPersonnel(formValues).then((res:AxiosResponse<any>)=>{
          if(res.status===200){
            toast.success("Personel Kaydedildi!");
            Swal.fire({
              title:"Personel Kaydedildi!",
              icon:"success",
              confirmButtonText:"Tamam",
              customClass:{
                confirmButton:"btn fw-bold btn-primary",
              }
            }).then(()=>{
              handleCloseState();
            })
          }
        }).catch((err:any)=>{
          toast.error("Personel Kaydedilemedi!");
          Swal.fire({
            title:"Personel Kaydedilemedi!",
            icon:"error",
            confirmButtonText:"Tamam",
            customClass:{
              confirmButton:"btn fw-bold btn-primary",
            }
          }).then(()=>{
            handleCloseState();
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

  const handleGetPersonnelById=()=>{
    getPersonnelById(personnelId).then((res: AxiosResponse) => {
      if(res.status === 200) {
        const perInfo=res.data
        setInitialValues({
          name:perInfo.name,
          surname:perInfo.surname,
          email:perInfo.email,
          password:perInfo.password,
        })
        personnelForm.setFieldValue("name",perInfo.name)
        personnelForm.setFieldValue("surname",perInfo.surname)
        personnelForm.setFieldValue("email",perInfo.email)
        personnelForm.setFieldValue("password",perInfo.password)
       
      }
    })
  }


  const handleUpdatePersonnel = (formValues: any) => {
    formValues.id = personnelId;
    updatePersonnel(formValues)
   
  };
  const updatePersonnel=(empInfo:any)=>{
    Swal.fire({
      title: "Personel Profili Güncellenecektir Onaylıyor Musunuz?",
      showCancelButton: true,
      confirmButtonText: "Evet",
      cancelButtonText:"Vazgeç",
      customClass:{
        confirmButton:"btn fw-bold btn-primary",
        cancelButton:"btn btn-text fw-bold btn-active-light-primary",
      },
      icon:"question",

    }).then((result) => {
     
      if (result.isConfirmed) {
        const request:any=empInfo
        editPersonnel(request).then((res:AxiosResponse<any>)=>{
          if(res.status===200){
            toast.success("Personel Güncellendi");
            Swal.fire({
              title:"Personel Güncellendi!",
              icon:"success",
              confirmButtonText:"Tamam",
              customClass:{
                confirmButton:"btn fw-bold btn-primary",
              }
            }).then(()=>{
              handleCloseState();
            })
          }
        }).catch((err:any)=>{
          toast.error("Personel Güncellenemedi!");
          Swal.fire({
            title:"Personel Güncellenemedi!",
            icon:"error",
            confirmButtonText:"Tamam",
            customClass:{
              confirmButton:"btn fw-bold btn-primary",
            }
          }).then(()=>{
            handleCloseState();
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
  const handleCloseState = () => {
    handleClose(true);
    personnelForm.resetForm();
  };

  useEffect(() => {
    if (state === "Edit"&& personnelId!==0) {
      handleGetPersonnelById()
    } else {
      setInitialValues({
        
        name: "",
        surname: "",
        email: "",
        password: "",
      });
    }
  }, [state, personnelId, show]);

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
          <div className="d-flex flex-column scroll-y me-n7 pe-7">
            <div className="fv-row mb-7">
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
            </div>

            <div className="text-center pt-15">
              <button
                type="reset"
                onClick={() => handleCloseState()}
                className="btn btn-light me-3"
                data-kt-users-modal-action="cancel"
                disabled={personnelForm.isSubmitting}>
                Vazgeç
              </button>

              <button
                type="submit"
                className="btn btn-primary"
                data-kt-users-modal-action="submit"
                disabled={
                  personnelForm.isSubmitting ||
                  !personnelForm.isValid ||
                  !personnelForm.touched
                }>
                <span className="indicator-label">Kaydet</span>
              </button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddPersonnel;
