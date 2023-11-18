
import { Guid } from "guid-typescript";
import { ClientAccountsModel } from "../models/ClientAccountsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ClientAccountsModel = {
    Id:Guid.EMPTY, 
    ClientId:"", 
    AccountTypeId: "",  
    CurrencyCode: "", 
    AccountNo: "",  
    BalanceAsOn :"", 
    Balance : null,
}

const url = '/ClientAccount';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: ClientAccountsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientAccountsModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getClientAccountByClientId(clientId: string) { 
    return customAxios.get(`${url}/GetClientAccountByClientId/${clientId}`, axiosRetryConfig);}

  

export const clientAccountsService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getClientAccountByClientId,
  
};