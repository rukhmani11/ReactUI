import { Guid } from "guid-typescript";
import { DesignationsModel } from "../models/DesignationsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const url = "/Designation";

const initialFieldValues: DesignationsModel = {
  Id: Guid.EMPTY,
  Name: "",
  Code: "",
  CompanyId: "",
  ParentId: "",
  Active: true,
};

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
  return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: DesignationsModel) {
  return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: DesignationsModel) {
  return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
  return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
  return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
function getAllByCompanyId(companyId: string) {
  return customAxios.get(
    `${url}/GetAllByCompanyId/${companyId}`,
    axiosRetryConfig
  );
}

function getParentDesignationsSelectList(id: string, companyId: string) {
  if (id) {
      return customAxios.get(`${url}/GetParentDesignationsSelectList?id=${id}&companyId=${companyId}`, axiosRetryConfig);
  } else {
      return customAxios.get(`${url}/GetParentDesignationsSelectList?companyId=${companyId}`, axiosRetryConfig);
  }
}
export const designationsService = {
  initialFieldValues,
  getAll,
  post,
  put,
  remove,
  getById,
  getSelectList,
  getAllByCompanyId,
  getParentDesignationsSelectList,
};
