
import { Guid } from "guid-typescript";
import { ClientBusinessUnitModel } from "../models/ClientBusinessUnitModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ClientBusinessUnitModel = {
    Id: Guid.EMPTY,
    ClientId:  "",
    BusinessSegmentId: "",
    Name: "",
    RoUserId: "",
}

const url = '/ClientBusinessUnit';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}



function post(payload: ClientBusinessUnitModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientBusinessUnitModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getClientBusinessUnitByclientId(clientId: string) {
    return customAxios.get(`${url}/GetClientBusinessUnitByclientId/${clientId}`, axiosRetryConfig);
}
function getSelectListByClientId(clientId: string) {
    
    return customAxios.get(`${url}/GetSelectListByClientId/${clientId}`, axiosRetryConfig);
}
export const clientbusinessUnitService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getClientBusinessUnitByclientId,
    getSelectListByClientId
};