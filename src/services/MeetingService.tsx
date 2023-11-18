import { Guid } from "guid-typescript"
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { MeetingModel, SearchMeetingDTO } from "../models/MeetingModel";
import {CancelMeetingDTO} from '../models/MeetingModel'
import { globalService } from "./GlobalService";

const url = '/Meeting';

const initialFieldValues: MeetingModel = {
    Id: Guid.EMPTY,
    CompanyId: '',
    ClientId: '',
    CompanyUserId: '',
    ScheduledOn: null,
    SrNo: 0,
    MeetingNo: 0,
    ClientEmployeeId: '',
    ClientBusinessUnitId: '',
    MeetingPurpose: '',
    Agenda: '',
    VisitedOn: null,
    VisitSummary: '',
    MeetingClientAttendeesIds: [],
    MeetingCompanyAttendeesIds: [],
    CIFNo: '',
    GroupName:'',
    Client: '',
    GroupCIFNo: '',
    CompanyRisk: '',
    Name:'',
    IsCritical: 0,
    SelectedMeetingClientAttendees: [], 
    SelectedMeetingCompanyAttendees: [],
    Remarks:'',
    AssignedToUser:'',
    Responsibility:'',
    Deadline:'',
    VisitedCompanyUserId: '',
    VisitedClientEmployeeId: '',
    MeetingStatusId: 0,

};
const SearchMeetinginitialFieldValues: SearchMeetingDTO ={
    CompanyId: '',
    CompanyUserId: '',
    ReportingToUserId: '',
    MeetingCompanyAttendeesIds: ''
}

const CancelMeetinginitialFieldValues: CancelMeetingDTO ={
    MeetingId: '',
    CancelRemark: '',
    MeetingStatusId: 0,
  
}



function getSelectList() {
    return customAxios.get(`${url}/GetSelectList`, axiosRetryConfig);
}

function post(payload: MeetingModel) {
    payload.ScheduledOn = globalService.convertLocalToUTCDate(payload.ScheduledOn, true);
    return customAxios.post(`${url}/Add`, payload, axiosRetryConfig);
}

function put(payload: MeetingModel) {
    debugger
    payload.ScheduledOn = globalService.convertLocalToUTCDate(payload.ScheduledOn, true);
    return customAxios.put(`${url}/Edit`, payload, axiosRetryConfig);
}

function remove(id: number) {
    return customAxios.delete(`${url}/${id}`, axiosRetryConfig);
}

function getById(id: number) {
    return customAxios.get(`${url}/GetById/${id}`, axiosRetryConfig);
}

// function searchMeetings() {
//     return customAxios.get(`${url}/SearchMeetings/${companyId}`, axiosRetryConfig
//     );
// }
function searchMeetings(payload: SearchMeetingDTO) {
    return customAxios.post(`${url}/searchMeetings`,payload, axiosRetryConfig);
}
function cancelMeeting(payload: CancelMeetingDTO) {
    return customAxios.put(`${url}/MeetingCancellation`,payload, axiosRetryConfig);
}
function getSelectListUser(ReportingToUserId: string) {
    return customAxios.get(`${url}/GetSelectListUser/${ReportingToUserId}`, axiosRetryConfig);

}

function getByClientIdOrClientBusinessUnitId(clientId: string, clientBusinessUnitId: string) {
    let new_url = '';
    if (clientId)
        new_url = `${url}/GetByClientIdOrClientBusinessUnitId?clientId=${clientId}`;
    if (clientBusinessUnitId)
        new_url = `${url}/GetByClientIdOrClientBusinessUnitId?businessUnitId=${clientBusinessUnitId}`;
    return customAxios.get(new_url, axiosRetryConfig
    );
}
function getAllMeetingsbyCompanyUser(companyUserId: string) {
    return customAxios.get(`${url}/GetAllMeetingsbyCompanyUser/${companyUserId}`, axiosRetryConfig
    );
}
function getByStatus(MeetingStatus: string) {
    return customAxios.get(`${url}/GetByStatus/${MeetingStatus}`, axiosRetryConfig);
}
export const MeetingService = {
    initialFieldValues,
    SearchMeetinginitialFieldValues,
    getByStatus,
    post,
    cancelMeeting,
    CancelMeetinginitialFieldValues,
    put,
    remove,
    getById,
    getSelectList,
    searchMeetings,
    getSelectListUser,
    getByClientIdOrClientBusinessUnitId,
    getAllMeetingsbyCompanyUser
};
