import { Guid } from "guid-typescript";
import { StandardRisksModel } from "../models/StandardRisksModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues : StandardRisksModel ={
    Id: Guid.EMPTY,
    BusinessSegmentId: "",
    Name: "",
    Description: "",
    Sequence: null,
    Active: true,
}
const url ='/StandardRisk';

function getAll(){
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}
function post(payload: StandardRisksModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}
function put(payload: StandardRisksModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

export const standardRiskService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList
};