import React, { useEffect, useState } from "react";
import { KTCard, KTIcon } from "../../../_metronic/helpers";
import { deleteProductById, getProductList } from "../core/_requests";
import { AxiosError, AxiosResponse } from "axios";
import { Table } from "react-bootstrap";
import ActionButtons from "../../shared/ActionsButtons/ActionButtons";
import { toast } from "react-toastify";
import CustomPagination from "../../shared/pagination/Pagination";
import CreateModal from "../components/modals/CreateModal/CreateModal";

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productListData, setProductListData] = useState<any[]>([]);
  const [productId, setProductId] = useState<number>(0);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [state, setState] = useState<"Edit" | "Create">("Create");

  const handleSearchValue = (e: any) => {
    setSearchTerm(e.target.value);
    handleGetProductList(currentPage, searchTerm);
  };

  const handleChangePage = (e: number) => {
    setCurrentPage(e);
    handleGetProductList(currentPage, searchTerm);
  };

  const handleGetProductList = (currentPage: number, searchTerm: string) => {
    const requestBody = {
      page: currentPage,
      quantity: 15,
      word: searchTerm ? searchTerm : null,
    };
    getProductList(requestBody)
      .then((res: AxiosResponse) => {
        if (res.status === 200) {
          console.log("productList", res);

          setProductListData(res.data.list);
        }
      })
      .catch((err: AxiosError) => {
        console.error("Ürünler Getirilemedi", err);
        setProductListData([]);
      });
  };

  const handleOnHideModal = () => {
    setOpenModal(false);
    handleGetProductList(currentPage, searchTerm);
  };

  const handleEditProduct = (productId: number) => {
    console.log("Edit Product", productId);
    setOpenModal(true);
    setState("Edit");
    setProductId(productId);
  };
  const handleCreateProduct = () => {
    setOpenModal(true);
    setState("Create");
  };

  const handleDeleteProduct = (productId: number) => {
    deleteProductById(productId).then((res: AxiosResponse) => {
      if (res.status === 200) {
        toast.success("Ürün başarıyla silindi");
        handleGetProductList(currentPage, searchTerm);
      }
    });
  };

  const handleOpenInfoProductModal = (productId: number) => {
    console.log("openModal", productId);
  };

  useEffect(() => {
    handleGetProductList(currentPage, searchTerm);
  }, []);

  return (
    <KTCard>
      <div className="d-flex flex-column p-5">
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between">
          <div className="d-flex align-items-center position-relative py-5 my-1">
            <KTIcon
              iconName="magnifier"
              className="fs-1 position-absolute ms-6"
            />
            <input
              type="text"
              data-kt-user-table-filter="search"
              className="form-control form-control-solid w-250px ps-14"
              placeholder="Ürün Ara"
              value={searchTerm}
              onInput={(e) => handleSearchValue(e)}
            />
          </div>

          <div
            className="d-flex justify-content-end"
            data-kt-user-table-toolbar="base">
            <button type="button" className="btn btn-light-primary me-3">
              <KTIcon iconName="exit-up" className="fs-2" />
              Çıktı Al
            </button>

            <button
              onClick={() => handleCreateProduct()}
              type="button"
              className="btn btn-primary">
              <KTIcon iconName="plus" className="fs-2" />
              Ürün Ekle
            </button>
          </div>
        </div>
        <div className="table-responsive-md ">
          <Table className="table table-striped gs-7 gy-7 gx-7 ">
            <thead>
              <tr className="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                <th>Ürün Adı</th>
                <th>Markası</th>
                <th>Satıcı</th>
                <th>Stok Adedi</th>
                <th>Normal Satış Fiyatı</th>
                <th>Satış Fiyatı</th>
                <th>Not</th>
                <th>İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {productListData.length > 0 ? (
                productListData.map((product: any, idx: number) => (
                  <tr key={idx}>
                    <td>{product.name}</td>
                    <td>{product.brand}</td>
                    <td>{product.seller}</td>
                    <td>{product.piece}</td>
                    <td>{product.normalPrice}</td>
                    <td>{product.salePrice}</td>
                    <td>{product.note}</td>
                    <td className="d-flex align-items-center gap-2">
                      <ActionButtons
                        onClickEdit={() => handleEditProduct(product.id)}
                        onClickDelete={() => handleDeleteProduct(product.id)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-center fs-1" colSpan={8}>
                    Ürün Bulunamadı
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {productListData.length >= 15 ? (
          <CustomPagination
            total={productListData.length}
            current={currentPage}
            onChangePage={handleChangePage}
          />
        ) : null}
        <CreateModal
          show={openModal}
          productId={productId}
          onHide={handleOnHideModal}
          state={state}
        />
      </div>
    </KTCard>
  );
};

export default ProductList;
