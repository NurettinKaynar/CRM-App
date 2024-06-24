import axios from "axios";
import { ApiUrls } from "../../utilities/ApiService";

const API_URL = ApiUrls.BASE_URL;

const uploadImage = (query: Object, file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}${ApiUrls.UPLOAD_IMAGE}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: query,
  });
};

export { uploadImage };
