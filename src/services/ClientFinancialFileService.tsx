
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { ClientFinancialFileModel } from "../models/ClientFinancialFileModel";

const initialFieldValues: ClientFinancialFileModel = {
    ClientFinancialFileId: Guid.EMPTY,
    ClientFinancialId: '',
    FileName:'',
  
}

const url = '/ClientFinancialFile';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: ClientFinancialFileModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientFinancialFileModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

export const clientFinancialFileService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList
};