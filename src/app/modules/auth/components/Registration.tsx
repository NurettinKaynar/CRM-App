import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { login, register } from "../core/_requests";
import { Link } from "react-router-dom";
import { PasswordMeterComponent } from "../../../../_metronic/assets/ts/components";
import { useAuth } from "../core/Auth";

const initialValues = {
  name: "",
  surname: "",
  email: "",
  password: "",
  changepassword: "",
  acceptTerms: false,
};

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "En az 3 karakter")
    .max(50, "En fazla 50 karakter")
    .required("Zorunlu alan"),
  email: Yup.string()
    .email("Yanlış e-posta formatı")
    .min(3, "En az 3 karakter")
    .max(50, "En fazla 50 karakter")
    .required("Zorunlu alan"),
  surname: Yup.string()
    .min(3, "En az 3 karakter")
    .max(50, "En fazla 50 karakter")
    .required("Zorunlu alan"),
  password: Yup.string()
    .min(3, "En az 3 karakter")
    .max(50, "En fazla 50 karakter")
    .required("Zorunlu alan"),
  changepassword: Yup.string()
    .min(3, "En az 3 karakter")
    .max(50, "En fazla 50 karakter")
    .required("Şifre onayı gereklidir")
    .oneOf([Yup.ref("password")], "Parola ve Parola Onayla eşleşmedi"),
  acceptTerms: Yup.bool().required("Şartları ve koşulları kabul etmelisiniz"),
});

export function Registration() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);
      try {
        register(
          values.email,
          values.name,
          values.surname,
          values.password
        ).then(async (res) => {
          const { data: loginData } = await login(
            values.email,
            values.password
          );
          saveAuth(loginData);
          setCurrentUser(loginData);
        });
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        setStatus("Kayıt bilgileri hatalı");
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    PasswordMeterComponent.bootstrap();
  }, []);

  return (
    <form
      className="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      noValidate
      id="kt_login_signup_form"
      onSubmit={formik.handleSubmit}>
      {/* begin::Heading */}
      <div className="text-center mb-11">
        {/* begin::Title */}
        <h1 className="text-gray-900 fw-bolder mb-3">Kayıt Ol</h1>
        {/* end::Title */}
      </div>
      {/* end::Heading */}

      {formik.status && (
        <div className="mb-lg-15 alert alert-danger">
          <div className="alert-text font-weight-bold">{formik.status}</div>
        </div>
      )}

      {/* begin::Form group name */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Adınız
        </label>
        <input
          placeholder="Adınız"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("name")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.name && formik.errors.name,
            },
            {
              "is-valid": formik.touched.name && !formik.errors.name,
            }
          )}
        />
        {formik.touched.name && formik.errors.name && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.name}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}
      <div className="fv-row mb-8">
        {/* begin::Form group surname */}
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Soyadınız
        </label>
        <input
          placeholder="Soyadınız"
          type="text"
          autoComplete="off"
          {...formik.getFieldProps("surname")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid": formik.touched.surname && formik.errors.surname,
            },
            {
              "is-valid": formik.touched.surname && !formik.errors.surname,
            }
          )}
        />
        {formik.touched.surname && formik.errors.surname && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.surname}</span>
            </div>
          </div>
        )}
        {/* end::Form group */}
      </div>

      {/* begin::Form group Email */}
      <div className="fv-row mb-8">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          E-posta
        </label>
        <input
          placeholder="E-posta"
          type="email"
          autoComplete="off"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            {
              "is-valid": formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className="fv-row mb-8" data-kt-password-meter="true">
        <div className="mb-1">
          <label className="form-label fw-bolder text-gray-900 fs-6">
            Şifre
          </label>
          <div className="position-relative mb-3">
            <input
              type="password"
              placeholder="Şifre"
              autoComplete="off"
              {...formik.getFieldProps("password")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    formik.touched.password && formik.errors.password,
                },
                {
                  "is-valid":
                    formik.touched.password && !formik.errors.password,
                }
              )}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  <span role="alert">{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>
          {/* begin::Meter */}
          <div
            className="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight">
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"></div>
            <div className="flex-grow-1 bg-secondary bg-active-success rounded h-5px"></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className="text-muted">
          Harf, rakam ve sembol karışımıyla 8 veya daha fazla karakter kullanın.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className="fv-row mb-5">
        <label className="form-label fw-bolder text-gray-900 fs-6">
          Şifrenizi Tekrar Giriniz
        </label>
        <input
          type="password"
          placeholder="Şifrenizi tekrar giriniz"
          autoComplete="off"
          {...formik.getFieldProps("changepassword")}
          className={clsx(
            "form-control bg-transparent",
            {
              "is-invalid":
                formik.touched.changepassword && formik.errors.changepassword,
            },
            {
              "is-valid":
                formik.touched.changepassword && !formik.errors.changepassword,
            }
          )}
        />
        {formik.touched.changepassword && formik.errors.changepassword && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.changepassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="fv-row mb-8">
        <label
          className="form-check form-check-inline"
          htmlFor="kt_login_toc_agree">
          <input
            className="form-check-input"
            type="checkbox"
            id="kt_login_toc_agree"
            {...formik.getFieldProps("acceptTerms")}
          />
          <span>Şartlar ve koşulları kabul ediyorum</span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className="text-center">
        <button
          type="submit"
          id="kt_sign_up_submit"
          className="btn btn-lg btn-primary w-100 mb-5"
          disabled={
            formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms
          }>
          {!loading && <span className="indicator-label">Kayıt Ol</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Lütfen bekleyin...{" "}
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
        <Link to="/auth/login">
          <button
            type="button"
            id="kt_login_signup_form_cancel_button"
            className="btn btn-lg btn-light-primary w-100 mb-5">
            Vazgeç
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  );
}
