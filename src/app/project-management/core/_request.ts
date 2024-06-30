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
  return axios.put(`${API_URL}${ApiUrls.UPDATE_PROJECT}`, query);
};
const deleteProject = (id: number): Promise<any> => {
  return axios.delete(`${API_URL}${ApiUrls.DELETE_PROJECT}`, {
    params: { id: id },
  });
};

const getAdminsData = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_ADMIN_LIST}`);
};

const getEmployeeList = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_EMPLOYEE_LIST}`);
};

const getTotalActiveProjectList = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_TOTAL_ACTIVE_PROJECT_LIST}`);
};
const getAllProjects = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_ALL_PROJECT}`);
};
const getProjectById = (projectId: number): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_PROJECT_BY_ID}`, {
    params: {
      projectId: projectId,
    },
  });
};

const getCompletedTasks = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_COMPLETED_TASKS_BY_MONTHLY}`);
};
const getInProgressTasks = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_IN_PROGRESS_TASKS_BY_MONTHLY}`);
};

const getProjectByDate = (dateTime: string): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_PROJECT_BY_DATE}`, {
    params: { dateTime: dateTime },
  });
};

const getLastedFiles = (): Promise<any> => {
  return axios.get(`${API_URL}${ApiUrls.GET_LASTED_FILES}`);
};

const deleteFile = (fileId: number): Promise<any> => {
  return axios.delete(`${API_URL}${ApiUrls.DELETE_FILE_BY_ID}`, {
    params: { id: fileId },
  });
};

const uploadFile = (file: File, projectId: number): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);
  return axios.post(`${API_URL}${ApiUrls.UPLOAD_FILE_BY_ID}`, formData, {
    params: { approjectid: projectId },
  });
};

export {
  createProject,
  getProjectList,
  editProject,
  deleteProject,
  getAdminsData,
  getEmployeeList,
  getTotalActiveProjectList,
  getAllProjects,
  getProjectById,
  getCompletedTasks,
  getInProgressTasks,
  getProjectByDate,
  getLastedFiles,
  deleteFile,
  uploadFile,
};
