import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { CompanyOpportunityModel } from "../models/CompanyOpportunityModel";

const initialFieldValues: CompanyOpportunityModel = {
    Id: Guid.EMPTY,
    Name: "",
    Description: "",
    Sequence: null,
    BusinessSegmentId: "",
    CompanyId: "",
    Active: true,
}

const url = '/CompanyOpportunity';

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: CompanyOpportunityModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: CompanyOpportunityModel) {
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

export const companyOpportunityService = {
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