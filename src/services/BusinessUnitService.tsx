import { Guid } from "guid-typescript";
import { BusinessUnitModel } from "../models/BusinessUnitModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const url = '/BusinessUnit';

const initialFieldValues: BusinessUnitModel = {
    Id: Guid.EMPTY,
    Name: "",
    Code: "",
    Active: true,
    CompanyId: "",
    ParentId: "",
};

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: BusinessUnitModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: BusinessUnitModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getAllByCompanyId(companyId: string) {
    return customAxios.get( `${url}/GetAllByCompanyId/${companyId}`,axiosRetryConfig
    );
  }
  function getParentBusinessUnitSelectList(id: string, companyId: string) {
    if (id) {
        return customAxios.get(`${url}/GetParentBusinessUnitSelectList?id=${id}&companyId=${companyId}`, axiosRetryConfig);
    } else {
        return customAxios.get(`${url}/GetParentBusinessUnitSelectList?companyId=${companyId}`, axiosRetryConfig);
    }
  }

export const businessUnitService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getAllByCompanyId,
    getParentBusinessUnitSelectList,
};