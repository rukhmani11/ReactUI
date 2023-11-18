//export const baseUrl = 'http://localhost:8001/api/v1/'

export const config = {
  baseUrl: "https://localhost:7107",
  // baseUrl: 'http://localhost:82',
  formDataConfig: {
    headers: {
      "content-type": "multipart/form-data",
    },
  },
  themeLightHexCode: "#e3f2fd",
  themeDarkHexCode: "#1976d2",
};

export const ROLES = {
  CompanyAdmin: "CompanyAdmin",
  SiteAdmin: "SiteAdmin",
  CompanyDomainUser: "CompanyDomainUser",
  CompanyUser: "CompanyUser",
};

export const FolderPath = {
  companyLogo: "/Logo",
};

export const BillingFrequency = {
  Monthly: "M",
  "Bi-Monthly": "B",
  Quarterly: "Q",
  "Half-Yearly": "H",
  Yearly: "Y",
};

export const MeetingStatusEnum = {
  Pending: "Pending",
  Expired: "Expired",
  Closed: "Closed",
  Cancelled: "Cancelled",
  OnHold: "OnHold",
};
