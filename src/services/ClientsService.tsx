
import { Guid } from "guid-typescript";
import { ClientTitleModel, ClientsModel } from "../models/ClientsModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const initialFieldValues: ClientsModel = {
    Id: Guid.EMPTY,
    Name:'',
    CIFNo:'',
    CompanyId:'',
    ClientGroupId:null,
    VisitingFrequencyInMonth: null,
    CurrencyCode: '',
    Active: true,  
    ClientGroupName: '',
}

const url = '/Client';


function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: ClientsModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: ClientsModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}
function getClientbyIdCIF( CIFNo : string) {
    return customAxios.get(`${url}/GetClientbyIdCIF/${CIFNo}`, axiosRetryConfig);
}
// function getPageTitle(payload: SocietyBuildingTitleModel) {
//     return customAxios.post(`${url}/GetPageTitle`, payload, axiosRetryConfig);
// }

function getAllByCompanyId(companyId: string) { 
    return customAxios.get(`${url}/GetClientsByCompanyId/${companyId}`,axiosRetryConfig); }

 function getPageTitle(payload: ClientTitleModel) {
        return customAxios.post(`${url}/GetPageTitle`, payload, axiosRetryConfig);
      }
export const clientsService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    getAllByCompanyId,
    getClientbyIdCIF,
    getPageTitle
};