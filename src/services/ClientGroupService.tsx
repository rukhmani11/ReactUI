
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { ClientGroupModel } from "../models/ClientGroupModel";

const initialFieldValues: ClientGroupModel = {
    Id: Guid.EMPTY,
    GroupCIFNo:"",
    Active: true,
    GroupName: "",
    CompanyId: "",
}

const url = '/ClientGroup';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectListByCompanyId(companyId: string) {
    return customAxios.get(`${url}/GetSelectListByCompanyId/${companyId}`, axiosRetryConfig);
}

function post(payload: ClientGroupModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientGroupModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getAllByCompanyId(companyId: string) { 
    return customAxios.get(`${url}/GetClientGroupByCompanyId/${companyId}`,axiosRetryConfig); }

export const clientGroupService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectListByCompanyId,
    getAllByCompanyId
};