import axios from "axios";
import { ApiUrls } from "../../utilities/ApiService";

const API_URL = ApiUrls.BASE_URL;

const getProductList = (query: Object): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_PRODUCT_LIST}`, {
    params: query,
  });
};

const getProductById = (productId: number): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_PRODUCT_BY_ID}`, {
    params: {
      productOfferId: productId,
    },
  });
};

const deleteProductById = (productId: number): Promise<any> => {
  return axios.delete(`${API_URL}${ApiUrls.DELETE_PRODUCT_BY_ID}`, {
    params: {
      id: productId,
    },
  });
};

const updateProduct = (product: Object): Promise<any> => {
  return axios.put(`${API_URL}${ApiUrls.UPDATE_PRODUCT}`, product);
};
const createProduct = (product: Object): Promise<any> => {
  return axios.post(`${API_URL}${ApiUrls.CREATE_PRODUCT}`, product);
};

export {
  getProductList,
  getProductById,
  deleteProductById,
  updateProduct,
  createProduct,
};
