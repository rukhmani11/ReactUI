export interface MeetingRiskModel {
    Id: string;
    CompanyRiskId: string;
    MeetingId: string;
    IsCritical: boolean;
    Remarks: string;
    ActionRequired: boolean;
    ActionDetails: string;
    AssignedToUserId: string;
    Responsibility: string;
    DeadLine: string;
    RiskStatus: string;
    DateOfClosing: Date;
}