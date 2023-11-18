import { Guid } from "guid-typescript"
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { MeetingClientAttendeesModel } from "../models/MeetingClientAttendeesModel";

const url = '/MeetingClientAttendees';

const initialFieldValues: MeetingClientAttendeesModel = {
    Id: Guid.EMPTY,
    MeetingId:'',
    ClientEmployeeId:'',
    Remarks:'',
};

function getAll() {
    return customAxios.get(`${url}/GetAll`, axiosRetryConfig);
}
function post(payload: MeetingClientAttendeesModel) {
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: MeetingClientAttendeesModel) {
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

function getClientAttendeesByMeetingId(meetingid: number) {
    return customAxios.get(`${url}/GetByMeetingId/${meetingid}`, axiosRetryConfig);
}




export const MeetingClientAttendeesService = {
    initialFieldValues,
    getAll,
    post,
    put,
    remove,
    getById,
    getClientAttendeesByMeetingId,

};