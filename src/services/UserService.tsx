import React from "react";
import { ChangePasswordDTO, LoginModel, UserModel } from "../models/UserModel";
//import { globalService } from "./GlobalService";
//import http, { HttpResponse } from "./AxiosHttpCommon";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { AuthContext } from "../utility/context/AuthContext";
import { Guid } from "guid-typescript";

const initialFieldValues: UserModel = {
  Id: Guid.EMPTY,
  Name: "",
  Email: "",
  Mobile: "",
  Password: "",
  ConfirmPassword: "",
  UserName: "",
  RoleId: "",
  RoleName: "",
  EmpCode: "",
  CompanyId: "",
  BusinessUnitId: "",
  DesignationId: "",
  LocationId: "",
  ReportingToUserId: "",
  Active: true,
};

const initialLoginFieldValues: LoginModel = {
  UserName: "",
  Password: "",
};

const initialChangePasswordFieldValues: ChangePasswordDTO = {
  id: "",
  Password: "",
 
}

const url = "/User";
//const url ="/api/account";
// const formatData = (data: UserModel) => ({
//   ...data,
//   Age: data.Age ? parseInt(data.Age) : 0,
// });

function get(id: number) {
  return customAxios.get(`${url}/${id}`, axiosRetryConfig);
}

function getAll() {
  return customAxios.get(`${url}/GetAllUsers`, axiosRetryConfig);
}

function getByCompanyId(companyId: string) {
  return customAxios.get(`${url}/GetByCompanyId/${companyId}`, axiosRetryConfig);
}

function post(payload: UserModel) {
    return customAxios.post(`${url}/Register`, payload, axiosRetryConfig);
}

function put(payload: UserModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

// function remove(userName: string) {
//   return customAxios.delete(`${url}/DeleteUser/${userName}`, axiosRetryConfig);
// }

function removeAll() {
  return customAxios.delete(`${url}/user`, axiosRetryConfig);
}
function remove(id: number) {
  return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}


function login(payload: any) {
  return customAxios.post(`${url}/login`, payload, axiosRetryConfig);
}

function getReportingUserSelectList(id: string) {
  if (id) {
      return customAxios.get(`${url}/GetReportingUserSelectList?id=${id}`, axiosRetryConfig);
  } else {
      return customAxios.get(`${url}/GetReportingUserSelectList`, axiosRetryConfig);
  }
}

function useAuth() {
  const { auth } = React.useContext(AuthContext);
  return auth;
}

function getAppSetting() {
  return customAxios.get(`${url}/GetAppSetting`, axiosRetryConfig);
}
function EditUser(payload: UserModel) {
  return customAxios.put(`${url}/EditUser`, payload, axiosRetryConfig);
}
function ChangePassword(payload: ChangePasswordDTO) {
  return customAxios.put(`${url}/ChangePassword`, payload, axiosRetryConfig);
}
function getSelectList() {
  return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}
export const userService = {
  initialFieldValues,
  initialLoginFieldValues,
  initialChangePasswordFieldValues,
  get,
  getAll,
  post,
  put,
  remove,
  removeAll,
  login,
  useAuth,
  getReportingUserSelectList,
  getAppSetting,
  getByCompanyId,
  EditUser,
  ChangePassword,
  getSelectList
};
