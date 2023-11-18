
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { CurrencyModel } from "../models/CurrencyModel";

const url = '/Currency';

const initialFieldValues: CurrencyModel = {
    Code: "",
    Name: "",
    
};

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: CurrencyModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: CurrencyModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

export const currencyService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList
};