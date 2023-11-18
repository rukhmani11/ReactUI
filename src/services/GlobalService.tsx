import React from 'react'
import { toast } from 'react-toastify';
import { AuthContext } from '../utility/context/AuthContext';
import { AuthModel } from '../models/UserModel';

///////////////Toast Notifications/////////////////////
const pageTitle = "Home";
//https://fkhadra.github.io/react-toastify/introduction/
const success = (msg: string) => toast.success(msg, {
  position: "top-left",
  theme: "colored",
});

function error(msg: string) {
  return toast.error(msg, {
    position: "top-left",
    theme: "colored",
  });
}

function warning(msg: string) {
  return toast.warning(msg, {
    position: "top-left",
    theme: "colored",
  });
}

function info(msg: string) {
  return toast.info(msg, {
    position: "top-left",
    theme: "colored",
  });
}
///////////////Ends Toast Notifications/////////////////////

function getBusinessSegments() {
  const result = [
    { Value: '1', Text: 'Aerospace Industry' },
    { Value: '2', Text: 'Agricultural Industry' },
    { Value: '3', Text: 'Automotive Industry' },
    { Value: '4', Text: 'Banking Industry' },
    { Value: '5', Text: 'Chemical Industry' },
    { Value: '6', Text: 'Computer Industry' },
  ];
  return result;
}

function getClients() {
  const result = [
    { Value: '1', Text: 'Adani Transmision' },
    { Value: '2', Text: 'Adani Port' },
    { Value: '3', Text: 'Anil Traders' },
    { Value: '4', Text: 'Shivam Softwares' },
  ];
  return result;
}


function getCompanies() {
  const result = [
    { Value: '1', Text: 'Airtel' },
    { Value: '2', Text: 'HDFC' },
    { Value: '3', Text: 'ICICI' },
    { Value: '4', Text: 'Vodafone' },
  ];
  return result;
}

function getClientGroups() {
  const result = [
    { Value: '1', Text: 'Adani' },
    { Value: '2', Text: 'Flipkart' },
    { Value: '3', Text: 'Reliance' },
    { Value: '4', Text: 'Amazon' },
  ];
  return result;
}

function getAccountTypes() {
  const result = [
    { Value: '1', Text: 'Loan' },
    { Value: '2', Text: 'Current' },
    { Value: '3', Text: 'Saving' },
  ];
  return result;
}

function getADLoginYN() {
  const result = [
    { Value: '1', Text: 'Yes' },
    { Value: '2', Text: 'No' },
  ];
  return result;
}

function getMobileIronYN() {
  const result = [
    { Value: '1', Text: 'Yes' },
    { Value: '2', Text: 'No' },
  ];
  return result;
}

function getParent() {
  const result = [
    { Value: '1', Text: 'Regional office' },
    { Value: '2', Text: 'Head Office' },
    { Value: '3', Text: 'Branch' },
  ];
  return result;
}


function getParentBusiness() {
  const result = [

    { Value: '1', Text: 'Sales' },
    { Value: '2', Text: 'Purchase' },
    { Value: '3', Text: 'Information Technology' },
  ];
  return result;
}
function getLocation() {
  const result = [
    { Value: '1', Text: 'Head Office' },
    { Value: '2', Text: 'Regional office' },
    { Value: '3', Text: 'Branch office' },
  ];
  return result;
}

function getDesignation() {
  const result = [
    { Value: '1', Text: 'Relationship Officer (RO)' },
    { Value: '2', Text: 'Team Lead (TL)' },
    { Value: '3', Text: 'Unit Head (UH)' },
  ];
  return result;
}

function getBusinessUnit() {
  const result = [
    { Value: '1', Text: 'Banking' },
    { Value: '2', Text: 'Loans' },
    { Value: '3', Text: 'NCDs' },
  ];
  return result;
}
function getFinancialYear() {
  const result = [
    { Value: '1', Text: 'Admin' },
    { Value: '2', Text: 'SentientAdmin' },
    { Value: '3', Text: 'SentientDomainUser' },
  ];
  return result;
}
function getReportingToUser() {
  const result = [
    { Value: '1', Text: 'Amol (TL)' },
    { Value: '2', Text: 'Kunal (UH)' },
    { Value: '3', Text: 'Shivam (RO)' },
    { Value: '4', Text: 'Sagar (RO)' },
  ];
  return result;
}

function getAcType() {
  const result = [
    { Value: '1', Text: 'Saving' },
    { Value: '2', Text: 'Loan' },
    { Value: '3', Text: 'Current' },
  ];
  return result;
}
function getRole() {
  const result = [
    { Value: '1', Text: 'Unit Head' },
    { Value: '2', Text: 'Team Lead' },
    { Value: '3', Text: 'Relationship Officer' },

  ];
  return result;
}


function getCurrency() {
  const result = [
    { Value: '1', Text: 'Kuwaiti Dinar' },
    { Value: '2', Text: 'Rupees' },
    { Value: '3', Text: 'USD' },
    { Value: '1', Text: 'Euro' },
    { Value: '2', Text: 'British Pound' },
    { Value: '3', Text: 'Jordanian Dinar' },

  ];
  return result;
}

function convertLocalToUTCDate(date: Date, time: boolean = false) {
  if (!date) {
    return date
  }
  //date = new Date(date);
  // var now = new Date();
  // var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
  if (time)
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0));
  else
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0));
  //date.setUTCHours(0);
  return date;
}



function validateEmail(email: string) {

  let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
  return regex.test(email);
}

const roleMatch = (allowedRoles: string[], auth: AuthModel) => {
  var isMatch = false;
  // auth?.Roles?.find((role: any) => allowedRoles?.includes(role))
  //   ? (isMatch = true)
  //   : (isMatch = false);
  (allowedRoles?.includes(auth?.Role)) ? isMatch = true : isMatch = false;
  return isMatch;
};

export const globalService = {
  pageTitle,
  success,
  error,
  info,
  warning,
  convertLocalToUTCDate,
  getBusinessSegments,
  getCompanies,
  getClients,
  getClientGroups,
  getAccountTypes,
  getADLoginYN,
  getMobileIronYN,
  getParent,
  getRole,
  getLocation,
  getDesignation,
  getBusinessUnit,
  getReportingToUser,
  validateEmail,
  getParentBusiness,
  getFinancialYear,
  getAcType,
  getCurrency,
  roleMatch
};