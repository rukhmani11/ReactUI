
import { Guid } from "guid-typescript";
import { ClientBusinessUnitModel } from "../models/ClientBusinessUnitModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { ClientEmployeesModel } from "../models/ClientEmployeesModel";

const initialFieldValues: ClientEmployeesModel = {
    Id: Guid.EMPTY,
    ClientId: "",
    ClientBusinessUnitId:'',
    Name:"",
    Mobile: null,
    Email: "",
    Department :"",
    Location : "",
    Designation : "",
}

const url = '/ClientEmployee';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: ClientEmployeesModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientEmployeesModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getClientEmolyeeByClientId(clientId: string) { 
    
    return customAxios.get(`${url}/GetClientEmployeeByclientId/${clientId}`, axiosRetryConfig);
}

function getSelectClientEmployeeByclientId(clientId: string) { 
    
    return customAxios.get(`${url}/GetSelectClientEmployeeByclientId/${clientId}`, axiosRetryConfig);
}

export const clientEmployeeService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getClientEmolyeeByClientId,
    getSelectClientEmployeeByclientId
};