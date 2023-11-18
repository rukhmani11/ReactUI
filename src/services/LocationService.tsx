import { Guid } from "guid-typescript";
import { LocationsModel } from "../models/LocationsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const url = '/Location';

const initialFieldValues: LocationsModel = {
    Id: Guid.EMPTY,
    Name: "",
    Code: "", 
    CompanyId: "", 
    ParentId :"",
    Active: true
};

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: LocationsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: LocationsModel) {
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

  function getParentLocationSelectList(id: string, companyId: string) {
    if (id) {
        return customAxios.get(`${url}/GetParentLocationSelectList?id=${id}&companyId=${companyId}`, axiosRetryConfig);
    } else {
        return customAxios.get(`${url}/GetParentLocationSelectList?companyId=${companyId}`, axiosRetryConfig);
    }
  }

export const locationService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getAllByCompanyId,
    getParentLocationSelectList
};