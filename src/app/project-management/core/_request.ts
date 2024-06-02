import axios from "axios";
import { ApiUrls } from "../../utilities/ApiService";

const API_URL = ApiUrls.BASE_URL;

const getProjectList = (query: Object): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_PROJECT_LIST}`, { params: query });
};

const createProject = (query: object): Promise<any> => {
  return axios.post(`${API_URL}${ApiUrls.CREATE_PROJECT}`, query);
};

const editProject = (query: object): Promise<any> => {
  return axios.put(`${API_URL}${ApiUrls.UPDATE_PROJECT},`, query);
};
const deleteProject = (id: number): Promise<any> => {
  return axios.delete(`${API_URL}${ApiUrls.DELETE_PROJECT}`, {
    params: { id: id },
  });
};

export { createProject, getProjectList, editProject, deleteProject };
