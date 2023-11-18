
import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { BusinessSubSegmentsModel } from "../models/BusinessSubSegmentModel";

const initialFieldValues: BusinessSubSegmentsModel = {
    Id: Guid.EMPTY,
    Name: "",
    Active: true,
}

const url = '/BusinessSubSegment';


function getAll() {
    
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: BusinessSubSegmentsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: BusinessSubSegmentsModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function GetbusinessSubSegmentBybusinessSegmentId(businessSegmentId: string) {
    
    return customAxios.get(`${url}/getbusinessSubSegmentBybusinessSegmentId/${businessSegmentId}`, axiosRetryConfig);
}

export const businessSubSegmentsService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    GetbusinessSubSegmentBybusinessSegmentId
};