export interface BusinessUnitMasterModel {
    CompanyId: string;
    Code: string;
    Company: string;
    BusinessUnit: string;
    ParentBusinessUnit: string;
    BusinessSegment: string;
    VisitingFrequencyInMonth: number;
    AdLoginYN: string;
    MobileIronYN: string;
    Active: boolean
}