import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import SendIcon from "@mui/icons-material/Send";
import DraftsIcon from "@mui/icons-material/Drafts";
import InboxIcon from "@mui/icons-material/Inbox";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SearchIcon from "@mui/icons-material/Search";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import OnlinePredictionIcon from "@mui/icons-material/OnlinePrediction";
import TungstenIcon from "@mui/icons-material/Tungsten";
import WarningIcon from "@mui/icons-material/Warning";
import ManIcon from "@mui/icons-material/Man";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EngineeringIcon from "@mui/icons-material/Engineering";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Person4Icon from "@mui/icons-material/Person4";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import Groups2Icon from "@mui/icons-material/Groups2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import { Collapse, Divider, Link, List } from "@mui/material";
import { EventAvailable, ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import { AuthContext } from "../../utility/context/AuthContext";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import { inherits } from "util";
import { ROLES } from "../../utility/Config";
import { globalService } from "../../services/GlobalService";

//export const sideBarMenus = (
export default function SideBarMenus() {
  const { auth } = React.useContext(AuthContext);
  let companyId = auth?.CompanyId;
  const [openTransaction, setOpenTransaction] = React.useState(false);
  const [openMaster, setOpenMaster] = React.useState(false);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    mainMenu: string
  ) => {
    if (mainMenu === "transaction") setOpenTransaction(!openTransaction);
    else if (mainMenu === "master") setOpenMaster(!openMaster);
  };

  // const roleMatch = (allowedRoles: string[]) => {
  //   var isMatch = false;
  //   // auth?.Roles?.find((role: any) => allowedRoles?.includes(role))
  //   //   ? (isMatch = true)
  //   //   : (isMatch = false);
  //   (allowedRoles?.includes(auth?.Role)) ? isMatch = true : isMatch = false;
  //   return isMatch;
  // };


  return (
    <React.Fragment>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          pt: 0,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      // subheader={
      //   <ListSubheader component="div" id="nested-list-subheader">
      //     Nested List Items
      //   </ListSubheader>
      // }
      >
        <ListItemButton sx={{ height: 30 }} href={"/businessSegments"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <BusinessCenterIcon />
          </ListItemIcon>
          <ListItemText primary="Business Segments" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/standardRisks"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <WarningIcon />
            {/* <AvTimerIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Standard Risks" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/standardOpportunities"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <WbSunnyIcon />
            {/* <TungstenIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Standard Opportunities" />
        </ListItemButton>
{/*         
        <ListItemButton sx={{ height: 30 }} href={"/standardObservations"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <SavedSearchIcon />
            {/* <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Standard Observations" />
        </ListItemButton> */}


        {/* <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Role master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <SensorOccupiedIcon />
          </ListItemIcon>
          <ListItemText primary="User Role Mapping" />
        </ListItemButton> */}


        <ListItemButton sx={{ height: 30 }} href={"/currency"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <CurrencyExchangeIcon />
          </ListItemIcon>
          <ListItemText primary="Currencies" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/accountTypes"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Account Types" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/financialYears"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <CalendarMonthIcon />
          </ListItemIcon>
          <ListItemText primary="Financial Years" />
        </ListItemButton>

        <ListItemButton sx={{ height: 30 }} href={"/companies"} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Companies Master " />
        </ListItemButton>

        <ListItemButton sx={{ height: 30 }} href={"/companyRisk/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyDomainUser], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <WarningIcon />
          </ListItemIcon>
          <ListItemText primary="Company Risks" />
        </ListItemButton>

        <ListItemButton sx={{ height: 30 }} href={"/companyOpportunity/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyDomainUser], auth) ? "" : "hidden"}`} >
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Company Opportunities" />
        </ListItemButton>

        {/* <ListItemButton sx={{ height: 30 }} href={"/companyObservation/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyDomainUser], auth) ? "" : "hidden"}`}  >
          <ListItemIcon>
            <SavedSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Company Observations" />
        </ListItemButton> */}

        {/* <ListItemButton sx={{ height: 30 }} href={'/example'}className="bg-light-red">
          <ListItemIcon>
            <WarningIcon />
          </ListItemIcon>
          <ListItemText primary="Company Risks" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <WbSunnyIcon />
          </ListItemIcon>
          <ListItemText primary="Company Opportunities" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <SavedSearchIcon />
          </ListItemIcon>
          <ListItemText primary="Company Observations" />
        </ListItemButton> */}
        <ListItemButton sx={{ height: 30 }} href={"/locations/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <LocationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Locations Master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/designations/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <Person4Icon />
          </ListItemIcon>
          <ListItemText primary="Designations Master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/businessUnits/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <EngineeringIcon />
          </ListItemIcon>
          <ListItemText primary="Business Units Master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/users/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Users Master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/users/" + companyId} className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <WarningIcon />
            {/* <AvTimerIcon /> */}
          </ListItemIcon>
          <ListItemText primary="Site Users Master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/clientGroups/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <PeopleAltIcon />
          </ListItemIcon>
          <ListItemText primary="Client Groups Master" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/clients/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <ManIcon />
          </ListItemIcon>
          <ListItemText primary="Clients" />
        </ListItemButton>

        <ListItemButton sx={{ height: 30 }} href={"/meetingCalender/" + companyId} className={`${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <EventAvailable />
          </ListItemIcon>
          <ListItemText primary="Meeting Calender" />
        </ListItemButton>

        {/* <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <Groups2Icon />
          </ListItemIcon>
          <ListItemText primary="Client Accounts" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Client Financials" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={'/example'}>
          <ListItemIcon>
            <SupervisedUserCircleIcon />
          </ListItemIcon>
          <ListItemText primary="Client Employees" />
        </ListItemButton> */}
        {/* <ListItemButton sx={{ height: 30 }} href={"/example"} className={`bg-light-red ${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Example" />
        </ListItemButton> */}
        <ListItemButton sx={{ height: 30 }} href={"/"} className="bg-light-red">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/meetings/" + companyId}  className={`${globalService.roleMatch([ROLES.CompanyUser], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <Groups2Icon />
          </ListItemIcon>
          <ListItemText primary="Schedule Meeting" />
        </ListItemButton>
        <ListItemButton sx={{ height: 30 }} href={"/meetinghistory/" + companyId}  className={`${globalService.roleMatch([ROLES.CompanyUser], auth) ? "" : "hidden"}`}>
          <ListItemIcon>
            <Groups2Icon />
          </ListItemIcon>
          <ListItemText primary="Meeting History
" />
        </ListItemButton>
        {/* <ListItemButton
          sx={{ height: 30 }}
          onClick={(e) => handleClick(e, "transaction")} className={`bg-light-red ${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}
        >
          <ListItemIcon>
            <SwapHorizIcon />
          </ListItemIcon>
          <ListItemText primary="Transactions" className={`bg-light-red ${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`} />
          {openTransaction ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> */}
        {/* <Collapse in={openTransaction} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, height: 30 }}>
              <ListItemIcon>
                <PanoramaFishEyeIcon sx={{ fontSize: "small" }} />
              </ListItemIcon>
              <ListItemText primary="Starred" />
            </ListItemButton>
          </List>
        </Collapse>
        <ListItemButton
          sx={{ height: 30 }}
          onClick={(e) => handleClick(e, "master")} className={`bg-light-red ${globalService.roleMatch([ROLES.CompanyAdmin], auth) ? "" : "hidden"}`}
        >
          <ListItemIcon>
            <EngineeringIcon />
          </ListItemIcon>
          <ListItemText primary="Masters" />
          {openMaster ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
        <Collapse in={openMaster} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4, height: 30 }}>
              <ListItemIcon>
                <PanoramaFishEyeIcon sx={{ fontSize: "small" }} />
              </ListItemIcon>
              <ListItemText primary="Sub Menu 1" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, height: 30 }}>
              <ListItemIcon>
                <PanoramaFishEyeIcon sx={{ fontSize: "small" }} />
              </ListItemIcon>
              <ListItemText primary="Sub Menu 2" />
            </ListItemButton>
            <ListItemButton sx={{ pl: 4, height: 30 }}>
              <ListItemIcon>
                <PanoramaFishEyeIcon sx={{ fontSize: "small" }} />
              </ListItemIcon>
              <ListItemText primary="Sub Menu 3" />
            </ListItemButton>
          </List>
        </Collapse> */}
      </List>
    </React.Fragment>
  );
}
