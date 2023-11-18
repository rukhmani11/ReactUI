import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import {
  Stack,
  IconButton,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Tab,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
} from "@mui/x-data-grid";
import { MeetingService } from "../../services/MeetingService";
import dayjs from "dayjs";
import { AuthContext } from "../../utility/context/AuthContext";
import { clientEmployeeService } from "../../services/ClientEmployeeService";
import { MeetingClientAttendeesService } from "../../services/MeetingClientAttendeesService";
import { debug } from "console";
import { MeetingCompanyAttendeesService } from "../../services/MeetingCompanyAttendeesService";
import { meetingRiskService } from "../../services/MeetingRiskService";
import { meetingOpportunityService } from "../../services/MeetingOpportunityService";
import { MeetingObservationAndOtherMatterService } from "../../services/MeetingObservationAndOtherMatterService";

const MeetingPastVisit = () => {
  const { clientId, clientBusinessUnitId, Id }: any = useParams();
  const [meetings, setMeetings] = useState([]);
  const [clientAttendees, setClientAttendees] = useState([]);
  const [companyAttendees, setCompanyAttendees] = useState([]);
  const [meetingRisks, setMeetingRisks] = useState([]);
  const [meetingOpportunity, setmeetingOpportunity] = useState([]);
  const [MeetingObservation, setmeetingObservation] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any>({});
  const [tabValue, setTabValue] = React.useState("1");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const prevPgState = useLocation();

  useEffect(() => {
    if (meetings.length === 0) getMeetings();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    localStorage.setItem("selAdminTab", newValue.toString());
  };

  function getMeetings() {
    MeetingService.getByClientIdOrClientBusinessUnitId(
      clientId,
      clientBusinessUnitId
    ).then((response: any) => {
      if (response) {
        let result = response.data;

        if (result.isSuccess) {
          setMeetings(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const meetingColumns: GridColDef[] = [
    { field: "MeetingNo", headerName: "Meeting No", width:150 },
    {
      field: "ScheduledOn",
      headerName: "Scheduled On",
      flex: 1.5,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY hh:mm A") : "",
    },
    {
      field: "CompanyUserId",
      headerName: "Responsible User",
      flex: 1.5,
      valueGetter: (params) => params.row.CompanyUser?.Name,
    },
    {
      field: "ClientEmployeeId",
      headerName: "Client Employee to Meet",
      flex: 1.5,
      valueGetter: (params) => params.row.ClientEmployee?.Name,
    },
    { field: "MeetingPurpose", headerName: "Meeting Purpose", flex: 1.5 },
    { field: "MeetingStatus", headerName: "Status", flex: 1.5 },
  ];
  const columnsforMeetingRisks: GridColDef[] = [
    {
      field: "CompanyRiskId",
      headerName: "Risk",
      width: 150,
      valueGetter: (params) => params.row.CompanyRisk?.Name,
    },
    { field: "IsCritical", headerName: "Critical",  flex: 1,
    renderCell: (params) => {
      return (
        <Stack>
          {params.row.IsCritical && "Yes"}
          {!params.row.IsCritical && "No"}
        </Stack>
      );
    }, },
    { field: "Remarks", headerName: "Remarks", width: 300 },
    {
      field: "AssignedToUserId",
      headerName: "Assigned To User",
      width: 120,
      valueGetter: (params) => params.row.AssignedToUser?.UserName,
    },
    { field: "Responsibility", headerName: "Responsibility", width: 140 },
    { field: "DeadLine", headerName: "Deadline", width: 120,
    valueFormatter: (params) => params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "", },
    { field: "ActionRequired", headerName: "Action Required", width: 80,
    renderCell: (params) => {
      return (
        <Stack>
          {params.row.IsCritical && "Yes"}
          {!params.row.IsCritical && "No"}
        </Stack>
      );
    }, },
    { field: "ActionDetails", headerName: "Action Details", width: 230 },
  ];
  const columnsforOpportunities: GridColDef[] = [
    {
      field: "CompanyOpportunityId",
      headerName: "Company Opportunity",
      width: 150,
      valueGetter: (params) => params.row.CompanyOpportunity?.Name,
    },
    { field: "IsCritical", headerName: "Critical",
    flex: 1,
    renderCell: (params) => {
      return (
        <Stack>
          {params.row.IsCritical && "Yes"}
          {!params.row.IsCritical && "No"}
        </Stack>
      );
    }, },
    { field: "Remarks", headerName: "Remarks", width: 300 },
    {
      field: "AssignedToUserId",
      headerName: "Assigned To User",
      width: 120,
      valueGetter: (params) => params.row.AssignedToUser?.UserName,
    },
    { field: "Responsibility", headerName: "Responsibility", width: 140 },
    { field: "DeadLine", headerName: "Deadline", width: 120,
    valueFormatter: (params) => params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "", },
    { field: "ActionRequired", headerName: "Action Required", width: 80, renderCell: (params) => {
      return (
        <Stack>
          {params.row.IsCritical && "Yes"}
          {!params.row.IsCritical && "No"}
        </Stack>
      );
    },},
    { field: "ActionDetails", headerName: "Action Details", width: 230 },
  ];

  const columnsforObservations: GridColDef[] = [
    {
      field: "CompanyObservation",
      headerName: "Company  Observations",
      width: 190,
    },
    { field: "IsCritical", headerName: "Critical",
    flex: 1,
    renderCell: (params) => {
      return (
        <Stack>
          {params.row.IsCritical && "Yes"}
          {!params.row.IsCritical && "No"}
        </Stack>
      );
    }, },
    { field: "Remarks", headerName: "Remarks", width: 300 },
    {
      field: "AssignedToUser",
      headerName: "Assigned To User",
      width: 200,
      valueGetter: (params) => params.row.AssignedToUser?.UserName,
    },
    { field: "Responsibility", headerName: "Responsibility", width: 120 },
    { field: "DeadLine", headerName: "Deadline", width: 120,
    valueFormatter: (params) => params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "", },
    { field: "ActionRequired", headerName: "Action Required", width: 80,
    renderCell: (params) => {
      return (
        <Stack>
          {params.row.IsCritical && "Yes"}
          {!params.row.IsCritical && "No"}
        </Stack>
      );
    }, },
    { field: "ActionDetails", headerName: "Action Details", width: 230 },
  ];

  const columnsforCompanyAttendees: GridColDef[] = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => params.row.CompanyUser?.Name,
    },
    {
      field: "Designation",
      headerName: "Designation",
      flex: 1,
      valueGetter: (params) => params.row.CompanyUser?.Designation?.Name,
    },
    {
      field: "BusinessUnit",
      headerName: "Business Unit",
      flex: 1,
      valueGetter: (params) => params.row.CompanyUser?.BusinessUnit?.Name,
    },
  ];

  const columnsforClientAttendees: GridColDef[] = [
    {
      field: "Name",
      headerName: "Name",
      flex: 1,
      valueGetter: (params) => params.row.ClientEmployee?.Name,
    },
    {
      field: "BusinessUnit",
      headerName: "Business Unit",
      flex: 1,
      valueGetter: (params) =>
        params.row.ClientEmployee?.clientBusinessUnit?.Name,
    },
    {
      field: "Location",
      headerName: "Location",
      flex: 1,
      valueGetter: (params) => params.row.ClientEmployee?.Location,
    },
    {
      field: "Designation",
      headerName: "Designation",
      flex: 1,
      valueGetter: (params) => params.row.ClientEmployee?.Designation,
    },

    {
      field: "Department",
      headerName: "Department",
      flex: 1,
      valueGetter: (params) => params.row.ClientEmployee?.Department,
    },
  ];

  const handleOnSelectMeeting: GridEventListener<"cellClick"> = (
    event: any
  ) => {
    {
      let selectedMeeting = meetings.filter((x) => x.Id === event.id);
      MeetingClientAttendeesService.getClientAttendeesByMeetingId( event.id ).then((response: { data: any }) => {
        if (selectedMeeting.length > 0) {
          debugger
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              setClientAttendees(result.list);
            } else {
              globalService.error(result.message);
            }
          }
        }
      });

      MeetingCompanyAttendeesService.getCompanyAttendeesByMeetingId( event.id ).then((response: { data: any }) => {
        if (selectedMeeting.length > 0) {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              setCompanyAttendees(result.list);
            } else {
              globalService.error(result.message);
            }
          }
        }
      });

      meetingRiskService  .getMeetingRisksByMeetingId(event.id).then((response: {data: any}) => {
          if (selectedMeeting.length > 0) {
            if (response) {
              let result = response.data;
              if (result.isSuccess) {
                setMeetingRisks(result.list);
              } else {
                globalService.error(result.message);
              }
            }
          }
        });
      meetingOpportunityService
        .getMeetingOpportunityByMeetingId(event.id)
        .then((response: {data: any}) => {
          if (selectedMeeting.length > 0) {
            if (response) {
              let result = response.data;
              if (result.isSuccess) {
                setmeetingOpportunity(result.list);
              } else {
                globalService.error(result.message);
              }
            }
          }
        });
      MeetingObservationAndOtherMatterService.getBymeetingObservationAndOtherMatterId(
        event.id
      ).then((response: {data: any}) => {
        if (selectedMeeting.length > 0) {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              setmeetingObservation(result.list);
            } else {
              globalService.error(result.message);
            }
          }
        }
      });
    }
  };

  return (
    <>
      <Stack direction="row" spacing={0} justifyContent="space-between">
        <Typography variant="h5" align="center">
          Meeting Past Visit {clientId ? "(Client)" : "(Client Business Unit)"}
        </Typography>
        {prevPgState && prevPgState.state && prevPgState.state.row && (
          <>
            <Typography variant="body1">
              <b>Client: </b>
              {prevPgState.state.row.Client?.Name}
            </Typography>
            {clientBusinessUnitId && (
              <Typography variant="body1">
                <b>Client Business Unit: </b>
                {prevPgState.state.row.ClientBusinessUnit?.Name}
              </Typography>
            )}
          </>
        )}
      </Stack>

      {/* <Title>Meeting Past Visit</Title> */}
      <Card>
        <CardContent>
          <div className="dvGrid">
            <DataGrid
              //paginationModel={paginationModel}
              //onPaginationModelChange={setPaginationModel}
              onCellClick={handleOnSelectMeeting}
              getRowId={(row) => row.Id}
              rows={meetings}
              columns={meetingColumns}
              columnHeaderHeight={30}
              //rowHeight={30}
              autoHeight={true}
              getRowHeight={() => "auto"}
              getEstimatedRowHeight={() => 200}
              //loading={loading}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns Id, the other columns will remain visible
                    BusinessSegmentId: false,
                  },
                },
                pagination: { paginationModel: { pageSize: 10, page: 2 } },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              pageSizeOptions={[10, 25, 50, 100]}
            />
          </div>

          <Box sx={{ width: "100%", typography: "body1" }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange} aria-label="Meeting Info">
                  <Tab label="Risks" value="1" />
                  <Tab label="Opportunities" value="2" />
                  <Tab label="Observations" value="3" />

                  <Tab label="Client Attendees" value="4" />
                  <Tab label="Company Attendees" value="5" />
                </TabList>
              </Box>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabPanel value="1">
                  <div>
                    <DataGrid
                      //paginationModel={paginationModel}
                      //onPaginationModelChange={setPaginationModel}
                      onCellClick={handleOnSelectMeeting}
                      getRowId={(row) => row.Id}
                      rows={meetingRisks}
                      columns={columnsforMeetingRisks}
                      columnHeaderHeight={30}
                      //rowHeight={30}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      getEstimatedRowHeight={() => 200}
                      //loading={loading}
                      initialState={{
                        columns: {
                          columnVisibilityModel: {
                            // Hide columns Id, the other columns will remain visible
                            BusinessSegmentId: false,
                          },
                        },
                        pagination: {
                          paginationModel: { pageSize: 10, page: 2 },
                        },
                      }}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                      pageSizeOptions={[10, 25, 50, 100]}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div>
                    <DataGrid
                      //paginationModel={paginationModel}
                      //onPaginationModelChange={setPaginationModel}
                      onCellClick={handleOnSelectMeeting}
                      getRowId={(row) => row.Id}
                      rows={meetingOpportunity}
                      columns={columnsforOpportunities}
                      columnHeaderHeight={30}
                      //rowHeight={30}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      getEstimatedRowHeight={() => 200}
                      //loading={loading}
                      initialState={{
                        columns: {
                          columnVisibilityModel: {
                            // Hide columns Id, the other columns will remain visible
                            BusinessSegmentId: false,
                          },
                        },
                        pagination: {
                          paginationModel: { pageSize: 10, page: 2 },
                        },
                      }}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                      pageSizeOptions={[10, 25, 50, 100]}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <div>
                    <DataGrid
                      //paginationModel={paginationModel}
                      //onPaginationModelChange={setPaginationModel}
                      onCellClick={handleOnSelectMeeting}
                      getRowId={(row) => row.Id}
                      rows={MeetingObservation}
                      columns={columnsforObservations}
                      columnHeaderHeight={30}
                      //rowHeight={30}
                      autoHeight={true}
                      getRowHeight={() => "auto"}
                      getEstimatedRowHeight={() => 200}
                      //loading={loading}
                      initialState={{
                        columns: {
                          columnVisibilityModel: {
                            // Hide columns Id, the other columns will remain visible
                            BusinessSegmentId: false,
                          },
                        },
                        pagination: {
                          paginationModel: { pageSize: 10, page: 2 },
                        },
                      }}
                      slots={{ toolbar: GridToolbar }}
                      slotProps={{
                        toolbar: {
                          showQuickFilter: true,
                          quickFilterProps: { debounceMs: 500 },
                        },
                      }}
                      pageSizeOptions={[10, 25, 50, 100]}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="4">
                  <div>
                    <DataGrid
                      getRowId={(row) => row.Id}
                      columnHeaderHeight={30}
                      getRowHeight={() => "auto"}
                      rows={clientAttendees} // Replace with your data source
                      columns={columnsforClientAttendees}
                    />
                  </div>
                </TabPanel>
                <TabPanel value="5">
                  <div>
                    <DataGrid
                      getRowId={(row) => row.Id}
                      columnHeaderHeight={30}
                      getRowHeight={() => "auto"}
                      rows={companyAttendees} // Replace with your data source
                      columns={columnsforCompanyAttendees}
                    />
                  </div>
                </TabPanel>
              </Box>
            </TabContext>
          </Box>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
          <Stack spacing={2} direction="row">
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate("/meetings/" + auth.CompanyId)}
            >
              Back To List
            </Button>
          </Stack>
        </CardActions>
      </Card>
    </>
  );
};

export default MeetingPastVisit;
