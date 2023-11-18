
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { AccountTypesModel } from "../models/AccountTypeModel";

const initialFieldValues: AccountTypesModel = {
    Id: Guid.EMPTY,
    Name: "",
    Active: true,
}

const url = '/AccountType';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function post(payload: AccountTypesModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: AccountTypesModel) {
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

export const accountTypesService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
};