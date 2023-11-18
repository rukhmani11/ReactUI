import { Guid } from "guid-typescript";
import { axiosRetryConfig, customAxios } from "./AxiosHttpCommon";
import { MeetingObservationAndOtherMatterModel } from "../models/MeetingObservationAndOtherMatterModel";

const url='/MeetingObservationAndOtherMatter';

const initialFieldValues: MeetingObservationAndOtherMatterModel= {
    Id:Guid.EMPTY,
    MeetingId:'',
    CompanyObservationId:'',
    Remarks:'',
    IsCritical:true,
    ActionRequired:true,
    ActionDetails:'',
    AssignedToUserId:'',
    Responsibility:'',
    DeadLine:'',
    ObservationStatus:'',
    DateOfClosing:'',
}


function getAllMeetingObservationAndOtherMatter(){
    return customAxios.get(`${url}/GetAll`,axiosRetryConfig);
}
function getBymeetingObservationAndOtherMatterId(meetingid:string){
    return customAxios.get(`${url}/GetBymeetingObservationAndOtherMatterId/${meetingid}`,axiosRetryConfig)
}

export const MeetingObservationAndOtherMatterService = {
    initialFieldValues,
    getAllMeetingObservationAndOtherMatter,
    getBymeetingObservationAndOtherMatterId
};