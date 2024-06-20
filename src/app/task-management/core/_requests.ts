import axios, { Axios } from "axios";
import { ApiUrls } from "../../utilities/ApiService";


const API_URL = ApiUrls.BASE_URL;


const getTaskList=(query:Object):Promise<Axios>=>{
    return axios.get(`${API_URL}${ApiUrls.GET_TASK_LIST}`,{
        params:query
    })
}

const getTaskById=(taskId:number):Promise<Axios>=>{
    return axios.get(`${API_URL}${ApiUrls.GET_TASK_BY_ID}`,{
        params:{id:taskId}
    })
}
const createTask=(task:Object):Promise<Axios>=>{
    return axios.post(`${API_URL}${ApiUrls.CREATE_TASK}`,{task})
} 

const updateTask=(task:Object):Promise<Axios>=>{
    return axios.put(`${API_URL}${ApiUrls.UPDATE_TASK}`,{task})
}

const deleteTaskById=(taskId:number):Promise<Axios>=>{
    return axios.delete(`${API_URL}${ApiUrls.DELETE_TASK}`,{
        params:{id: taskId}
    })
}



export {
    getTaskList,
    getTaskById,
    createTask,
    updateTask,
    deleteTaskById
}