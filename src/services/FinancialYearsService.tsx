import { Guid } from "guid-typescript";
import { FinancialYearsModel } from "../models/FinancialYearsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: FinancialYearsModel = {
  Id: Guid.EMPTY,
  Abbr: "",
  FromDate: null,
  ToDate: null,
};

const url = "/FinancialYear";

function getAll() {
  return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function post(payload: FinancialYearsModel) {
  return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: FinancialYearsModel) {
  
  return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
  return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}
function getById(id: number) {
  return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
function getSelectList() {
  return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function getMaxOfToDate() {
  return customAxios.get(`${url}/GetMaxOfToDate`, axiosRetryConfig);
}
export const financialYearsService = {
  initialFieldValues,
  getAll,
  post,
  put,
  remove,
  getById,
  getSelectList,
  getMaxOfToDate
};
