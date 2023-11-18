import { Guid } from "guid-typescript";
import { MeetingOpportunityModel } from "../models/MeetingOpportunityModel";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";

const url = '/MeetingOpportunity';

const initialFieldValues: MeetingOpportunityModel = {
    Id:Guid.EMPTY,
    MeetingId:'',
    ActionDetails:'',
    ActionRequired:true,
    AssignedToUserId:'',
    CompanyOpportunityId:'',
    IsCritical:true,
    Remarks:'',
    Responsibility:'',
    DeadLine:'',
    OpportunityStatus:'',
    DateOfClosing:'',
}

function getAllByMeetingOpportunity(){
     return customAxios.get(`${url}/GetAll`,axiosRetryConfig)
}

function getMeetingOpportunityByMeetingId(meetingid: string){
    return customAxios.get(`${url}/GetByMeetingId/${meetingid}`,axiosRetryConfig)
}

export const meetingOpportunityService = {
    initialFieldValues,
    getAllByMeetingOpportunity,
    getMeetingOpportunityByMeetingId
};
