import { Guid } from "guid-typescript";
import { CompanyModel } from "../models/CompanyModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { config } from "../utility/Config";


const url = '/Company';

const initialFieldValues: CompanyModel = {
    Id: Guid.EMPTY,
    Name: "",
    Address: "",
    Email: "",
    Logo: "",
    Website: "",
    ADLoginYn: false,
    MobileIronYn: false,
    Active: true,
    ThemeDarkHexCode: config.themeDarkHexCode,
    ThemeLightHexCode: config.themeLightHexCode,
    SiteAdminName: "",
    SiteAdminEmpCode: "",
    SiteAdminUserName: "",
    SiteAdminMobile: "",
    SiteAdminEmail: "",
    SiteAdminRoleId: "",
    SiteAdminRoleName: "",
    SiteAdminPassword:"",
    // SiteAdmin: {
    //     Id: Guid.EMPTY,
    //     EmpCode:"",
    //     UserName:"",
    //     Name:"",
    //     Mobile:"",
    //     Email: "",
    //     RoleId:"",
    //     RoleName:"",

    // }
};

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: CompanyModel, logoFile: File) {
    //  return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
    const formData = new FormData();
    // if (logoFiles != null && logoFiles.length > 0) {
    //     for (var i = 0; i < logoFiles.length; i++) {
    //         formData.append("logoFile", logoFiles[i]);
    //     }
    // }
    if (logoFile != null) {
        formData.append("logoFile", logoFile);
    }

    formData.append("data", JSON.stringify(payload));
    return customAxios.post(
        `${url}/Add`,
        formData,
        config.formDataConfig
    );
}

function put(payload: CompanyModel, logoFile: File) {
    const formData = new FormData();
    if (logoFile != null) {
        formData.append("logoFile", logoFile);
    }
    formData.append("data", JSON.stringify(payload));
    return customAxios.put(`${url}/Edit`, formData, config.formDataConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function activateOrDeActivate(id: string) {
    return customAxios.get(`${url}/ActivateOrDeActivate/${id}`, axiosRetryConfig);
}

export const companyService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getSelectList,
    activateOrDeActivate
};