export interface CompanyModel {
  Id: string;
  Name: string;
  Address: string;
  Logo: string;
  Email: string;
  Website: string;
  ADLoginYn: boolean;
  MobileIronYn: boolean;
  Active: boolean;
  ThemeLightHexCode: string;
  ThemeDarkHexCode: string;
  SiteAdminName: string;
  SiteAdminEmpCode: string;
  SiteAdminUserName: string;
  SiteAdminMobile: string;
  SiteAdminEmail: string;
  SiteAdminRoleId: string;
  SiteAdminRoleName: string;
  SiteAdminPassword:string;

//SiteAdmin: SiteAdminUserModel;
}

export interface SiteAdminUserModel {
  Id: string;
  EmpCode:string;
  UserName :string;
  Name:string;
  Mobile:string;
  Email: string;
  RoleId:string;
  RoleName:string;
}
