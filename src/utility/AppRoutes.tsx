import React from "react";
import { Routes, Route } from "react-router-dom";
import RequireAuth from "./RequireAuth";
import { ROLES } from "./Config";
import UnAuthorized from "../components/helper/UnAuthorized";
import DefaultLayout from "../components/layout/DefaultLayout";
import Login from "../components/user/Login";
import Dashboard from "../components/user/Dashboard";
import BusinessSegmentList from "../components/master/BusinessSegmentList";
import BusinessSegmentForm from "../components/master/BusinessSegmentForm";
import PageNotFound from "../components/helper/PageNotFound";
import Examples from "../components/user/Examples";
import StandardRiskList from "../components/master/StandardRiskList";
import StandardRiskForm from "../components/master/StandardRiskForm";
import StandardOpportunityForm from "../components/master/StandardOpportunityForm";
import AccountTypeForm from "../components/master/AccountTypeForm";
import AccountTypeList from "../components/master/AccountTypeList";
import ClientGroupList from "../components/master/ClientGroupList";
import ClientGroupForm from "../components/master/ClientGroupForm";
import ClientsList from "../components/master/ClientsList";
import ClientsForm from "../components/master/ClientsForm";
import StandardOpportunityList from "../components/master/StandardOpportunityList";
import StandardObservationsList from "../components/master/StandardObservationsList";
import StandardObservationsForm from "../components/master/StandardObservationsForm";
import FinancialYearsForm from "../components/master/FinancialYearsForm";
import FinancialYearsList from "../components/master/FinancialYearsList";
import CompanyList from "../components/master/CompanyList";
import CompanyForm from "../components/master/CompanyForm";
import LocationsList from "../components/master/LocationsList";
import LocationsForm from "../components/master/LocationsForm";
import DesignationsList from "../components/master/DesignationsList";
import DesignationsForm from "../components/master/DesignationsForm";
import BusinessUnitMasterList from "../components/master/BusinessUnitMasterList";
import BusinessUnitMasterForm from "../components/master/BusinessUnitMasterForm";
import ClientAccountsForm from "../components/master/ClientAccountsForm";
import ClientFinancialsList from "../components/master/ClientFinancialsList";
import ClientFinancialsForm from "../components/master/ClientFinancialsForm";
import ClientBusinessUnitList from "../components/master/ClientBusinessUnitList";
import ClientBusinessUnitForm from "../components/master/ClientBusinessUnitForm";
import ClientEmployeesList from "../components/master/ClientEmployeesList";
import ClientEmployeesForm from "../components/master/ClientEmployeesForm";
import ClientAccountsList from "../components/master/ClientAccountsList";
import UserList from "../components/master/UserList";
import UserForm from "../components/master/UserForm";
import CurrencyList from "../components/master/CurrencyList";
import CurrencyForm from "../components/master/CurrencyForm";
import CompanyRiskList from "../components/master/CompanyRiskList";
import CompanyRiskForm from "../components/master/CompanyRiskForm";
import CompanyOpportunityList from "../components/master/CompanyOpportunitiesList";
import CompanyOpportunitiesForm from "../components/master/CompanyOpportunitiesForm";
import CompanyObservationList from "../components/master/CompanyObservationsList";
import CompanyObservationForm from "../components/master/CompanyObservationForm";
import Home from "../components/user/Home";
import Orders from "../components/user/Orders";
import ResetPasswordForm from "../components/master/ResetPasswordForm";
import MeetingForm from "../components/meeting/MeetingForm";
import MeetingList from "../components/meeting/MeetingsList";
import MeetingCalender from "../components/transactions/MeetingCalender";
import MeetingRiskList from "../components/meeting/MeetingRiskList";
import MeetingRiskForm from "../components/meeting/MeetingRiskForm";
import MeetingPastVisit from "../components/meeting/MeetingPastVisit";
import MeetingPendingItems from "../components/meeting/MeetingPendingItems";
import BusinessSubSegmentList from "../components/master/BusinessSubSegmentList";
import BusinessSubSegmentForm from "../components/master/BusinessSubSegmentForm";
import ViewMeeting from "../components/meeting/ViewMeetingForm";
import ViewMeetingForm from "../components/meeting/ViewMeetingForm";
import MeetingHistoryList from "../components/meeting/MeetingHistoryList";
import MeetingMinutesForm from "../components/meeting/MeetingMinutesForm";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route path="home" element={<Home />} />
          <Route path="example" element={<Examples />} />

          {/* <Route element={<RequireAuth allowedRoles={[ROLES.CompanyAdmin, ROLES.SiteAdmin, ROLES.CompanyDomainUser, ROLES.CompanyUser]} />}>
                        <Route path="dashboard" element={<Dashboard />} />
                    </Route> */}

          {/* Starts Admin access */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CompanyAdmin]} />}>
            <Route path="locations/:companyId" element={<LocationsList />} />
            <Route path="addLocation/:companyId" element={<LocationsForm />} />
            <Route
              path="editLocation/:companyId/:id"
              element={<LocationsForm />}
            />
            {/* <Route
              path="meetingCalender/:companyId"
              element={<MeetingCalender />}
            /> */}

            <Route
              path="designations/:companyId"
              element={<DesignationsList />}
            />
            <Route
              path="addDesignation/:companyId"
              element={<DesignationsForm />}
            />
            <Route
              path="editDesignation/:companyId/:id"
              element={<DesignationsForm />}
            />

            <Route
              path="businessUnits/:companyId"
              element={<BusinessUnitMasterList />}
            />
            <Route
              path="addBusinessUnits/:companyId"
              element={<BusinessUnitMasterForm />}
            />
            <Route
              path="editBusinessUnits/:companyId/:id"
              element={<BusinessUnitMasterForm />}
            />

            <Route path="clients/:companyId" element={<ClientsList />} />
            <Route path="addClient/:companyId" element={<ClientsForm />} />
            <Route path="editClient/:companyId/:id" element={<ClientsForm />} />

            <Route
              path="clientAccount/:clientId"
              element={<ClientAccountsList />}
            />
            <Route
              path="addClientAccount/:clientId"
              element={<ClientAccountsForm />}
            />
            <Route
              path="editClientAccount/:clientId/:id"
              element={<ClientAccountsForm />}
            />

            <Route
              path="clientFinancials/:clientId"
              element={<ClientFinancialsList />}
            />
            <Route
              path="addClientFinancial/:clientId"
              element={<ClientFinancialsForm />}
            />
            <Route
              path="editClientFinancial/:clientId/:id"
              element={<ClientFinancialsForm />}
            />

            <Route
              path="clientBusinessUnits/:clientId"
              element={<ClientBusinessUnitList />}
            />
            <Route
              path="addclientBusinessUnit/:clientId"
              element={<ClientBusinessUnitForm />}
            />
            <Route
              path="editclientBusinessUnit/:clientId/:id"
              element={<ClientBusinessUnitForm />}
            />

            <Route
              path="clientEmployee/:clientId"
              element={<ClientEmployeesList />}
            />

            <Route
              path="editClientEmployee/:clientId/:id"
              element={<ClientEmployeesForm />}
            />
              <Route
              path="addClientEmployee/:clientId"
              element={<ClientEmployeesForm />}
            />

            <Route
              path="clientGroups/:companyId"
              element={<ClientGroupList />}
            />
            <Route
              path="addClientGroup/:companyId"
              element={<ClientGroupForm />}
            />
            <Route
              path="editClientGroup/:companyId/:id"
              element={<ClientGroupForm />}
            />
          </Route>
          {/* Ends Admin access */}

          {/* Site Admin Access */}
          <Route element={<RequireAuth allowedRoles={[ROLES.SiteAdmin]} />}>
            <Route path="businessSegments" element={<BusinessSegmentList />} />
            <Route
              path="addBusinessSegment"
              element={<BusinessSegmentForm />}
            />
            <Route
              path="editBusinessSegment/:id"
              element={<BusinessSegmentForm />}
            />

            <Route
              path="businessSubSegments/:businessSegmentId"
              element={<BusinessSubSegmentList />}
            />
            <Route
              path="addbusinessSubSegments/:businessSegmentId"
              element={<BusinessSubSegmentForm />}
            />
            <Route
              path="editbusinessSubSegments/:businessSegmentId/:id"
              element={<BusinessSubSegmentForm />}
            />

            <Route path="standardRisks" element={<StandardRiskList />} />
            <Route path="addStandardRisk" element={<StandardRiskForm />} />
            <Route path="editStandardRisk/:id" element={<StandardRiskForm />} />

            <Route
              path="standardOpportunities"
              element={<StandardOpportunityList />}
            />
            <Route
              path="addStandardOpportunity"
              element={<StandardOpportunityForm />}
            />
            <Route
              path="editStandardOpportunity/:id"
              element={<StandardOpportunityForm />}
            />

            <Route
              path="standardObservations"
              element={<StandardObservationsList />}
            />
            <Route
              path="addStandardObservation"
              element={<StandardObservationsForm />}
            />
            <Route
              path="editStandardObservation/:id"
              element={<StandardObservationsForm />}
            />

            <Route path="currency" element={<CurrencyList />} />
            <Route path="addcurrency" element={<CurrencyForm />} />
            <Route path="editcurrency/:Code" element={<CurrencyForm />} />

            <Route path="accountTypes" element={<AccountTypeList />} />
            <Route path="addAccountType" element={<AccountTypeForm />} />
            <Route path="editAccountType/:id" element={<AccountTypeForm />} />

            <Route path="financialYears" element={<FinancialYearsList />} />
            <Route path="addFinancialYear" element={<FinancialYearsForm />} />
            <Route
              path="editFinancialYear/:id"
              element={<FinancialYearsForm />}
            />

            <Route path="addCompany" element={<CompanyForm />} />
            <Route path="editCompany/:id" element={<CompanyForm />} />
          </Route>
          {/* Ends Site Admin */}

          {/* Starts Domain User Access */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.CompanyAdmin, ROLES.SiteAdmin]}
              />
            }
          >
            <Route path="users/:companyId" element={<UserList />} />
            <Route path="addUser/:companyId" element={<UserForm />} />
            <Route path="editUser/:companyId/:id" element={<UserForm />} />
          </Route>
          {/* Ends Domain User Access */}

          {/* Starts Domain User, Site Admin Access */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.CompanyDomainUser, ROLES.SiteAdmin]}
              />
            }
          >
            <Route path="companies" element={<CompanyList />} />
          </Route>
          {/* Starts Domain User, Site Admin Access */}

          {/* Starts Domain User Access */}
          <Route
            element={<RequireAuth allowedRoles={[ROLES.CompanyDomainUser]} />}
          >
            <Route
              path="companyRisk/:companyId"
              element={<CompanyRiskList />}
            />
            <Route
              path="addCompanyRisk/:companyId"
              element={<CompanyRiskForm />}
            />
            <Route
              path="editCompanyRisk/:companyId/:id"
              element={<CompanyRiskForm />}
            />
            '
            <Route
              path="companyOpportunity/:companyId"
              element={<CompanyOpportunityList />}
            />
            <Route
              path="addCompanyOpportunity/:companyId"
              element={<CompanyOpportunitiesForm />}
            />
            <Route
              path="editCompanyOpportunity/:companyId/:id"
              element={<CompanyOpportunitiesForm />}
            />
            
            <Route path="companyObservation/:companyId" element={<CompanyObservationList />}/>
            <Route path="addCompanyObservation/:companyId" element={<CompanyObservationForm />} />
            <Route path="editCompanyObservation/:companyId/:id"  element={<CompanyObservationForm />}
            />
          </Route>

          {/* Ends Domain User Access */}

          {/* Starts User Access */}
          <Route element={<RequireAuth allowedRoles={[ROLES.CompanyUser]} />}>
            <Route path="meetings/:companyId" element={<MeetingList />} />
            <Route path="addmeeting/:companyId" element={<MeetingForm />} />
            <Route path="editMeeting/:companyId/:id"element={<MeetingForm />}/>
            <Route path="meetingMinutesForm/:companyId/:id"element={<MeetingMinutesForm />}/>
             <Route path="meetinghistory/:companyId" element={<MeetingHistoryList />} />
             <Route
              path="viewMeeting/:companyId/:id"
              element={<ViewMeetingForm />}
            />
            <Route
              path="meetingRisks/:companyId/:meetingId"
              element={<MeetingRiskList />}
            />
            <Route
              path="addMeetingRisk/:companyId/:meetingId"
              element={<MeetingRiskForm />}
            />
            <Route
              path="editMeetingRisk/:companyId/:meetingId/:id"
              element={<MeetingRiskForm />}
            />
            <Route
              path="meetingPastVisitForClient/:companyId/:clientId"
              element={<MeetingPastVisit />}
            />
            <Route
              path="meetingPastVisitForBU/:companyId/:clientBusinessUnitId"
              element={<MeetingPastVisit />}
            />
            <Route
              path="meetingPendingItemsForClient/:companyId/:clientId"
              element={<MeetingPendingItems />}
            />
            <Route
              path="meetingPendingItemsForBU/:companyId/:clientBusinessUnitId"
              element={<MeetingPendingItems />}
            />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.CompanyUser, ROLES.CompanyAdmin]}
              />
            }
          >
            <Route
              path="addClientEmployee/:clientId"
              element={<ClientEmployeesForm />}
            />
            <Route
              path="meetingCalender/:companyId"
              element={<MeetingCalender />}
            />
          </Route>
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES.CompanyUser,
                  ROLES.CompanyAdmin,
                  ROLES.SiteAdmin,
                  ROLES.CompanyDomainUser,
                ]}
              />
            }
          >
            <Route path="resetPassword/:id" element={<ResetPasswordForm />} />
          </Route>
          {/* Ends User Access */}
        </Route>
        {/* catch all for page not found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
