export interface MeetingObservationAndOtherMatterModel{
    Id:string,
    MeetingId:string,
    CompanyObservationId:string,
    Remarks:string,
    IsCritical:boolean,
    ActionRequired:boolean,
    ActionDetails:string,
    AssignedToUserId:string,
    Responsibility:string,
    DeadLine:string,
    ObservationStatus:string,
    DateOfClosing:string,
}