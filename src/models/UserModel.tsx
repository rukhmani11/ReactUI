export interface UserModel {
  Id: string;
  Name: string;
  EmpCode: string;
  Mobile: string;
  Email: string;
  Password: string;
  ConfirmPassword: string;
  UserName: string;
  RoleId: string;
  RoleName: string;
  CompanyId: string;
  LocationId: string;
  DesignationId: string;
  ReportingToUserId: string;
  BusinessUnitId: string;
  Active: boolean;
}

export interface AuthModel {
  Token: string;
  Id: string;
  UserName: string;
  Name: string;
  Role: string;
  CompanyId: string;
  CompanyName: string;
  ThemeLightHexCode: string;
  ThemeDarkHexCode: string;
  ReportingToUserId: string;
  Logo:string;
}

export interface LoginResponse {
  isSuccess: boolean;
  user: UserModel;
}

export interface LoginModel {
  UserName: string;
  Password: string;
}
export interface ChangePasswordDTO {
  id: string;
  Password: string;
 
}

