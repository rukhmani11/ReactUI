import { Guid } from "guid-typescript";
import { MeetingRiskModel } from "../models/MeetingRiskModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const url = '/MeetingRisk';

const initialFieldValues: MeetingRiskModel = {
    Id: Guid.EMPTY,
    CompanyRiskId: "",
    MeetingId: "",
    IsCritical: false,
    Remarks: "",
    ActionRequired: false,
    ActionDetails: "",
    AssignedToUserId: "",
    Responsibility: "",
    DeadLine: "",
    RiskStatus: "",
    DateOfClosing: null,
};

function getAllByMeetingRisk() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}

function post(payload: MeetingRiskModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: MeetingRiskModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getByMeetingIdAndCompanyId(meetingId: string, companyId: string) {
    return customAxios.get(`${url}/GetByMeetingIdAndCompanyId/${meetingId}/${companyId}`, axiosRetryConfig
    );
}

function getMeetingRisksByMeetingId(meetingid: string) {
    return customAxios.get(`${url}/GetMeetingRisksByMeetingId/${meetingid}`, axiosRetryConfig
    );
}

 
export const meetingRiskService = {
    initialFieldValues,
    getAllByMeetingRisk,
    post,
    put,
    remove,
    getById,
    getByMeetingIdAndCompanyId,
    getMeetingRisksByMeetingId
};