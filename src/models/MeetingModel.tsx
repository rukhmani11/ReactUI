export interface MeetingModel {
  Id: string;
  CompanyId: string;
  ClientId: string;
  CompanyUserId: string;
  ScheduledOn: Date;
  SrNo: number;
  MeetingNo: number;
  ClientEmployeeId: string;
  ClientBusinessUnitId: string;
  MeetingPurpose: string;
  Agenda: string;
  VisitedOn: string;
  VisitSummary: string;
  MeetingClientAttendeesIds : string[];
  MeetingCompanyAttendeesIds : string[];
  CIFNo: string;
  GroupName: string;
  Client: string;
  GroupCIFNo: string;
  CompanyRisk: string;
  IsCritical: number;
  Remarks:string,
  Responsibility:string,
  Deadline:string,
  Name:string,
  AssignedToUser:string,
  SelectedMeetingClientAttendees: string[];
  SelectedMeetingCompanyAttendees : string[];
  MeetingStatusId: number,
  VisitedCompanyUserId: string;
  VisitedClientEmployeeId: string;
  // MeetingStatus:string;
}
export interface SearchMeetingDTO {
  CompanyId: string;
  CompanyUserId: string;
  ReportingToUserId: string;
  MeetingCompanyAttendeesIds: string;
}
export interface CancelMeetingDTO {
  MeetingId: string,
  CancelRemark: string,
  MeetingStatusId:number,
}