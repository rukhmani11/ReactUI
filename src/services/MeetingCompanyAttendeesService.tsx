import { Guid } from "guid-typescript"
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { MeetingCompanyAttendeesModel } from "../models/MeetingCompanyAttendeesModel";

const url = '/MeetingCompanyAttendees';

const initialFieldValues: MeetingCompanyAttendeesModel = {
    Id: Guid.EMPTY,
    MeetingId:'',
    CompanyUserId:'',
    Remarks:'',
};

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function post(payload: MeetingCompanyAttendeesModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: MeetingCompanyAttendeesModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}


function getCompanyAttendeesByMeetingId(meetingid: number) {
    return customAxios.get(`${url}/GetByMeetingId/${meetingid}`, axiosRetryConfig);
}




export const MeetingCompanyAttendeesService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getCompanyAttendeesByMeetingId
};