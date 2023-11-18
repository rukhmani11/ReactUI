export interface ClientsModel {
    Id: string;
    Name:string;
    CIFNo:string;
    CompanyId:string;
    ClientGroupId:string;
    VisitingFrequencyInMonth: number;
    CurrencyCode: string;
    ClientGroupName: string;
    Active: boolean;



}
export interface ClientTitleModel{
    ClientId: string;
    Name: string
}