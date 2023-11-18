
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { StandardOpportunityModel } from "../models/StandardOpportunityModel";
import { StandardObservationsModel } from "../models/StandardObservationsModel";

const initialFieldValues: StandardObservationsModel = {
   Id: Guid.EMPTY,
    Name: '',
    Description: '',
    Sequence: null,
    BusinessSegmentId: '',
    Active: true
}

const url = '/StandardObservation';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: StandardObservationsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: StandardObservationsModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

export const standardObservationService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
};