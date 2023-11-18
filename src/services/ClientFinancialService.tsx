
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { ClientFinancialsModel } from "../models/ClientFinancialsModel";

const initialFieldValues: ClientFinancialsModel = {
    Id:Guid.EMPTY,
    ClientId: "",
    FinancialYearId: "",
    CurrencyCode: "",
    Turnover: null, 
    Profit: null, 
}

const url = '/ClientFinancial';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: ClientFinancialsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientFinancialsModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
function getByClientId(id: number) {
    return customAxios.get(`${url}/GetByClientId/${id}`, axiosRetryConfig);
}

export const clientFinancialsService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getByClientId
};