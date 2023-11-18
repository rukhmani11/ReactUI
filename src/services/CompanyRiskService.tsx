import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { CompanyRiskModel } from "../models/CompanyRiskModel";

const initialFieldValues: CompanyRiskModel = {
    Id: Guid.EMPTY,
    Name: "",
    Description: "",
    Sequence: null,
    BusinessSegmentId: "",
    CompanyId: "",
    Active: true,
}

const url = '/CompanyRisk';

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: CompanyRiskModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: CompanyRiskModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getAllByCompanyId(companyId: string) {
    return customAxios.get(`${url}/GetAllByCompanyId/${companyId}`, axiosRetryConfig
    );
}

function getByClientEmployeeId(clientEmployeeId: string) {
    return customAxios.get(`${url}/GetByClientEmployeeId/${clientEmployeeId}`, axiosRetryConfig
    );
}

export const companyRiskService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getAllByCompanyId,
    getByClientEmployeeId
};