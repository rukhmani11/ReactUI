
import { Guid } from "guid-typescript";
import { BusinessSegmentsModel } from "../models/BusinessSegmentsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: BusinessSegmentsModel = {
    Id: Guid.EMPTY,
    Name: "",
    Code:"",
    Active: true,
}

const url = '/BusinessSegment';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: BusinessSegmentsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: BusinessSegmentsModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

export const businessSegmentsService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList
};