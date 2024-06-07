import axios from "axios";
import { ApiUrls } from "../../utilities/ApiService";

const API_URL = ApiUrls.BASE_URL;

const getEmployeeList = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_EMPLOYEE_LIST}`);
};
const createPersonnel = (object: Object): Promise<any> => {
  return axios.post(`${API_URL}${ApiUrls.CREATE_PERSONNEL}`, object);
};
const deletePersonnel = (personnelId: number): Promise<any> => {
  return axios.delete(`${API_URL}${ApiUrls.DELETE_PERSONNEL}`, {
    params: { id: personnelId },
  });
};
const editPersonnel = (object: Object): Promise<any> => {
  return axios.put(`${API_URL}${ApiUrls.EDIT_PERSONNEL}`, object);
};

export { getEmployeeList, createPersonnel, deletePersonnel, editPersonnel };
