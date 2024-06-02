import axios, { AxiosResponse } from "axios";
import { ID, Response } from "../../../../../../_metronic/helpers";
import { User, UsersQueryResponse } from "./_models";
import { ApiUrls } from "../../../../../utilities/ApiService";

const API_URL = ApiUrls.BASE_URL;

const getTaskList = (query: object): Promise<any> => {
  return axios
    .get(`${API_URL}${ApiUrls.GET_TASK_LIST}`, { params: query })
    .then((d: AxiosResponse<UsersQueryResponse>) => d.data);
};

const createProject = (query: object): Promise<any> => {
  return axios.post(`${API_URL}${ApiUrls.CREATE_PROJECT}`, query);
};

export { getTaskList, createProject };
