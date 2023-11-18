import { Guid } from "guid-typescript";
import { CompanyObservationModel } from "../models/CompanyObservationModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: CompanyObservationModel = {
    Id: Guid.EMPTY,
    Name: "",
    Description: "",
    Sequence :null,
    BusinessSegmentId :"",
    CompanyId : "", 
    Active: true,
}

const url = '/CompanyObservation';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: CompanyObservationModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: CompanyObservationModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
function getAllByCompanyId(companyId: string) {
    return customAxios.get(`${url}/GetAllByCompanyId/${companyId}`, axiosRetryConfig);
}


export const companyObservationService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getAllByCompanyId
};