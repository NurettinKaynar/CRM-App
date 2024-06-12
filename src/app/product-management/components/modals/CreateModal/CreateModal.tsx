import { FormikValues, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "../../../core/_requests";
import { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import clsx from "clsx";
import { getAdminsData } from "../../../../project-management/core/_request";
import { KTIcon } from "../../../../../_metronic/helpers";
interface CreateProduct {
  show: boolean;
  onHide: () => void;
  productId: number;
  state: "Edit" | "Create";
}

const productFormValidation = Yup.object().shape({
  name: Yup.string().required("Zorunlu alan"),
  brand: Yup.string().required("Zorunlu alan"),
  seller: Yup.string().required("Zorunlu alan"),
  piece: Yup.number().required("Zorunlu alan"),
  normalPrice: Yup.number().required("Zorunlu alan"),
  salePrice: Yup.number().required("Zorunlu alan"),
  note: Yup.string().required("Zorunlu alan"),
  adminId: Yup.string().required("Zorunlu alan"),
});

const CreateModal = ({ show, onHide, productId, state }: CreateProduct) => {
  const [initialValues, setInitialValues] = useState({
    name: "",
    brand: "",
    seller: "",
    piece: 0,
    normalPrice: 0,
    salePrice: 0,
    note: "",
    adminId: "",
  });
  const [adminListData, setAdminListData] = useState<any[]>([]);

  const productForm = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: productFormValidation,
    onSubmit: (values: FormikValues, actions: any) => {
      if (state === "Create") {
        handleCreateProduct(values);
      } else if (state === "Edit") {
        handleUpdateProduct(values);
      }
    },
  });

  const handleCreateProduct = (formValues: any) => {
    createProduct(formValues)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          toast.success("Ürün başarıyla eklendi");
          onHide();
        }
      })
      .catch((err: AxiosError) => {
        console.error("ürün ekleme sorunu", err);

        toast.error("Ürün eklenirken hata oluştu");
        onHide();
      });
  };

  const handleUpdateProduct = (formValues: any) => {
    formValues.id = productId;
    updateProduct(formValues)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          toast.success("Ürün başarıyla güncellendi");
          onHide();
        }
      })
      .catch((err: AxiosError) => {
        console.error("ürün güncelleme sorunu", err);
        toast.error("Ürün güncellenirken hata oluştu");
      });
  };

  const handleGetProductById = (productId: number) => {
    getProductById(productId).then((res: AxiosResponse) => {
      if (res.status === 200) {
        const product = res.data;
        productForm.resetForm();
        productForm.setValues({
          name: product.name,
          brand: product.brand,
          seller: product.seller,
          piece: product.piece,
          normalPrice: product.normalPrice,
          salePrice: product.salePrice,
          note: product.note,
          adminId: product.adminId,
        });
        setInitialValues({
          name: product.name,
          brand: product.brand,
          seller: product.seller,
          piece: product.piece,
          normalPrice: product.normalPrice,
          salePrice: product.salePrice,
          note: product.note,
          adminId: product.adminId,
        });
      }
    });
  };

  const handleGetAdminList = () => {
    getAdminsData()
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          setAdminListData(res.data);
        }
      })
      .catch((err: AxiosError) => {
        console.error("admin listesi getirme sorunu", err);
        toast.error("Yöneticiler getirilemedi");
      });
  };

  useEffect(() => {
    handleGetAdminList();
    // productForm.resetForm();
    if (state === "Edit") {
      handleGetProductById(productId);
    } else {
      setInitialValues({
        name: "",
        brand: "",
        seller: "",
        piece: 0,
        normalPrice: 0,
        salePrice: 0,
        note: "",
        adminId: "",
      });
      productForm.resetForm();
    }
  }, [state, productId]);

  return (
    <Modal centered show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>
          {state === "Create" ? "Ürün Oluştur" : "Ürünü Düzenle"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-3">
        <Form className="row">
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Ürün Adı</Form.Label>
            <Form.Control
              placeholder="Ürün Adı"
              {...productForm.getFieldProps("name")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.name && productForm.errors.name,
                },
                {
                  "is-valid":
                    productForm.touched.name && !productForm.errors.name,
                }
              )}
            />
            {productForm.touched.name && productForm.errors.name && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{productForm.errors.name}</div>
              </div>
            )}
          </Form.Group>
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Ürün Markası</Form.Label>
            <Form.Control
              placeholder="Ürün Markası"
              {...productForm.getFieldProps("brand")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.brand && productForm.errors.brand,
                },
                {
                  "is-valid":
                    productForm.touched.brand && !productForm.errors.brand,
                }
              )}
            />
            {productForm.touched.brand && productForm.errors.brand && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{productForm.errors.brand}</div>
              </div>
            )}
          </Form.Group>
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Ürün Satıcısı</Form.Label>
            <Form.Control
              placeholder="Ürün Satıcısı"
              {...productForm.getFieldProps("seller")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.seller && productForm.errors.seller,
                },
                {
                  "is-valid":
                    productForm.touched.seller && !productForm.errors.seller,
                }
              )}
            />
            {productForm.touched.seller && productForm.errors.seller && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{productForm.errors.seller}</div>
              </div>
            )}
          </Form.Group>
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Stok Adedi</Form.Label>
            <Form.Control
              type="number"
              placeholder="Stok Adedi"
              {...productForm.getFieldProps("piece")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.piece && productForm.errors.piece,
                },
                {
                  "is-valid":
                    productForm.touched.piece && !productForm.errors.piece,
                }
              )}
            />
            {productForm.touched.piece && productForm.errors.piece && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{productForm.errors.piece}</div>
              </div>
            )}
          </Form.Group>
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Alış Fiyatı</Form.Label>
            <Form.Control
              type="number"
              placeholder="Alış Fiyatı"
              {...productForm.getFieldProps("normalPrice")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.normalPrice &&
                    productForm.errors.normalPrice,
                },
                {
                  "is-valid":
                    productForm.touched.normalPrice &&
                    !productForm.errors.normalPrice,
                }
              )}
            />
            {productForm.touched.normalPrice &&
              productForm.errors.normalPrice && (
                <div className="fv-plugins-message-container">
                  <div className="fv-help-block">
                    {productForm.errors.normalPrice}
                  </div>
                </div>
              )}
          </Form.Group>
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Satış Fiyatı</Form.Label>
            <Form.Control
              type="number"
              placeholder="Alış Fiyatı"
              {...productForm.getFieldProps("salePrice")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.salePrice &&
                    productForm.errors.salePrice,
                },
                {
                  "is-valid":
                    productForm.touched.salePrice &&
                    !productForm.errors.salePrice,
                }
              )}
            />
            {productForm.touched.salePrice && productForm.errors.salePrice && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">
                  {productForm.errors.salePrice}
                </div>
              </div>
            )}
          </Form.Group>
          <Form.Group className=" col-12 mb-3">
            <Form.Label>Not</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Not"
              {...productForm.getFieldProps("note")}
              className={clsx(
                "form-control bg-transparent",
                {
                  "is-invalid":
                    productForm.touched.note && productForm.errors.note,
                },
                {
                  "is-valid":
                    productForm.touched.note && !productForm.errors.note,
                }
              )}
            />
            {productForm.touched.note && productForm.errors.note && (
              <div className="fv-plugins-message-container">
                <div className="fv-help-block">{productForm.errors.note}</div>
              </div>
            )}
          </Form.Group>
          <Form.Group className="col-12 mb-3">
            <Form.Label>Yönetici seçin</Form.Label>
            <Form.Select
              aria-label="Seçin"
              {...productForm.getFieldProps("adminId")}>
              {adminListData.map((admin, idx) => (
                <option key={idx} value={admin.id}>
                  {admin.name} {admin.surname}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <button
            type="button"
            disabled={!productForm.isValid}
            className="btn btn-lg btn-primary"
            onClick={productForm.submitForm}>
            {state === "Create" ? "Gönder" : "Düzenle"}
            <KTIcon iconName="send" className="fs-3 ms-2 me-0" />
          </button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateModal;
