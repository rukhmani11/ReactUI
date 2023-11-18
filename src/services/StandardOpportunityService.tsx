
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { StandardOpportunityModel } from "../models/StandardOpportunityModel";

const initialFieldValues: StandardOpportunityModel = {
    Id: Guid.EMPTY,
    Name: '',
    Description: '',
    Sequence: null,
    BusinessSegmentId: '',
    Active: true
}

const url = '/StandardOpportunity';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: StandardOpportunityModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: StandardOpportunityModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

export const standardOpportunityService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
};