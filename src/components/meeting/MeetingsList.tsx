import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import {
  Stack,
  IconButton,
  Button,
  Card,
  TextField,
  CardContent,
  Typography,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  DialogProps,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { MeetingService } from "../../services/MeetingService";
import ConfirmDialog from "../helper/ConfirmDialog";
import dayjs from "dayjs";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Title from "../helper/Title";
import { companyRiskService } from "../../services/CompanyRiskService";
import { companyOpportunityService } from "../../services/CompanyOpportunityService";
import MeetingForm from "./MeetingForm";
import { ROLES } from "../../utility/Config";
import { SearchMeetingDTO } from "../../models/MeetingModel";
import { AuthContext } from "../../utility/context/AuthContext";
import VisibilityIcon from '@mui/icons-material/Visibility';
// import {CancelMeetingDTO} from '../models/MeetingModel';

import { CancelMeetingDTO } from "../../models/MeetingModel";
import Controls from "../../utility/controls/Controls";

function MeetingsList() {
  const { companyId }: any = useParams();
  const [meetings, setMeetings] = useState([]);
  const [participateClicked, setParticipateClicked] = useState(false);
  const { auth } = useContext(AuthContext);
  const [selectedMeeting, setSelectedMeeting] = useState<any>({});
  const [risks, setRisks] = useState([]);
  const [cancelRemark, setCancelRemark] = useState("");
  const [opportunities, setOpportunities] = useState([]);
  const [modalTitle, setModalTitle] = useState("Meeting Risks");
  const [isRisks, setIsRisks] = useState(true);
  const [selMeetingId, setSelMeetingId] = useState('');
  const [isMeetingCancelling, setIsMeetingCancelling] = useState(false);
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [open, setOpen] = React.useState(false);
  const [selectedType, setSelectedType] = useState('OWN');
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => { },
  });

  const navigate = useNavigate();

  useEffect(() => {
    // if (meetings.length === 0) searchMeetings();
    searchMeetingsByType("OWN");
  }, []);

  // function searchMeetings() {
  //   let model: SearchMeetingDTO = {
  //     // CompanyUserId: type === "own" ? CompanyUserId : null,
  //     CompanyId: "",
  //     CompanyUserId: "",
  //     ReportingToUserId: "",
  //     MeetingCompanyAttendeesIds: "",

  //   };
  //   MeetingService.searchMeetings(model).then((response: any) => {
  //     if (response) {
  //       let result = response.data;
  //       if (result.isSuccess) {
  //         setMeetings(result.list);
  //       } else {
  //         globalService.error(result.message);
  //       }
  //     }
  //   });
  // }


  const getCancelPopup = (meetingId: any) => {
    debugger;
    setModalTitle("Remark");
    handleOpen();
    setIsMeetingCancelling(true);
    setSelMeetingId(meetingId);
    // setSelectedMeeting(row);
    // companyRiskService
    //   .getByClientEmployeeId(clientEmployeeId)
    //   .then((response: any) => {
    //     if (response) {
    //       let result = response.data;
    //       if (result.isSuccess) {
    //         setRisks(result.list);
    //       } else {
    //         globalService.error(result.message);
    //       }
    //     }
    //   });
  };


  const submitMeetingCancellation = (e: React.FormEvent) => {
    debugger;
    let model: CancelMeetingDTO = {
      MeetingId: selMeetingId,
      CancelRemark: cancelRemark,
      MeetingStatusId: 0,
    };
    MeetingService.cancelMeeting(model).then((response: any) => {
      let result = response.data;
      if (result) {
        if (result.isSuccess) {
          debugger;
          globalService.success("Meeting cancelled successfully.");
          handleClose();
          searchMeetingsByType(selectedType);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  function searchMeetingsByType(type: string) {
    debugger;
    setSelectedType(type);
    let model: SearchMeetingDTO = {
      CompanyUserId: type === "OWN" ? auth.Id : null,
      CompanyId: type === "CompanyId" ? auth.CompanyId : null,
      ReportingToUserId: type === "Subordinate" ? auth.Id : null,
      MeetingCompanyAttendeesIds: type === "Participant" ? auth.Id : null,

    };
    MeetingService.searchMeetings(model).then((response: any) => {
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

  const getRisks = (clientEmployeeId: any, row: any) => {
    setModalTitle("Meeting Risks");
    handleOpen();
    setIsRisks(true);
    setSelectedMeeting(row);
    companyRiskService
      .getByClientEmployeeId(clientEmployeeId)
      .then((response: any) => {
        if (response) {
          let result = response.data;
          if (result.isSuccess) {
            setRisks(result.list);
          } else {
            globalService.error(result.message);
          }
        }
      });
  };


  const getOpportunities = (clientEmployeeId: any, row: any) => {
    setModalTitle("Meeting Opportunities");
    handleOpen();
    setIsRisks(false);
    setSelectedMeeting(row);
    companyOpportunityService
      .getByClientEmployeeId(clientEmployeeId)
      .then((response: any) => {
        if (response) {
          let result = response.data;
          if (result.isSuccess) {
            setOpportunities(result.list);
          } else {
            globalService.error(result.message);
          }
        }
      });
  };

  const removeMeeting = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    MeetingService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        // searchMeetings();
        searchMeetingsByType(selectedType);
      } else {
        globalService.error(result.message);
      }
    });
  };

  const meetingColumns: GridColDef[] = [
    {
      field: "ClientId",
      headerName: "Client Name",
      flex: 1,
      valueGetter: (params) => params.row.Client?.Name,
    },
    { field: "MeetingNo", headerName: "Meeting No", flex: 1 },
    {
      field: "ScheduledOn",
      headerName: "Scheduled On",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY hh:mm A") : "",
    },
    {
      field: "CompanyUserId",
      headerName: "Responsible User",
      flex: 1,
      valueGetter: (params) => params.row.CompanyUser?.Name,
    },
    {
      field: "ClientEmployeeId",
      headerName: "Client Employee to Meet",
      flex: 1,
      valueGetter: (params) => params.row.ClientEmployee?.Name,
    },
    { field: "MeetingPurpose", headerName: "Meeting Purpose", flex: 1, },
    // { field: "MeetingStatus", headerName: "Status",   flex: 1, },
    {
      field: "Advisory",
      headerName: "Advisory",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() => getRisks(params.row.ClientEmployeeId, params.row)}
            >
              Risk
            </Button>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                getOpportunities(params.row.ClientEmployeeId, params.row)
              }
            >
              Opportunity
            </Button>
          </Stack>
        );
      },
    },
    {
      field: "PastVisit",
      headerName: "Past Visit",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate(
                  "/meetingPastVisitForBU/" +
                  companyId +
                  "/" +
                  params.row.ClientBusinessUnitId,
                  {
                    state: {
                      row: params.row,
                    },
                  }
                )
              }
            >
              Business Unit
            </Button>

            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate(
                  "/meetingPastVisitForClient/" +
                  companyId +
                  "/" +
                  params.row.ClientId,
                  {
                    state: {
                      row: params.row,
                    },
                  }
                )
              }
            >
              Client
            </Button>
          </Stack>
        );
      },
    },
    {
      field: "PendingItems",
      headerName: "Pending Items",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate(
                  "/meetingPendingItemsForBU/" +
                  companyId +
                  "/" +
                  params.row.ClientBusinessUnitId,
                  {
                    state: {
                      row: params.row,
                    },
                  }
                )
              }
            >
              Business Unit
            </Button>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate(
                  "/meetingPendingItemsForClient/" +
                  companyId +
                  "/" +
                  params.row.ClientId,
                  {
                    state: {
                      row: params.row,
                    },
                  }
                )
              }
            >
              Client
            </Button>
          </Stack>
        );
      },
    },
    {
      field: "Actions",
      headerName: "Actions",
      headerAlign: 'center',
      width: 150,
      type: "number",
      // flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            {participateClicked ? (
              <IconButton
                size="small"
                color="primary"
                aria-label="add an alarm"
                onClick={() => navigate("/viewMeeting/" + companyId + "/" + params.row.Id)}
              >
                <VisibilityIcon fontSize="inherit" />
              </IconButton>
            ) : (
              <>
                <IconButton
                  size="small"
                  color="primary"
                  aria-label="add an alarm"
                  onClick={() => navigate("/editMeeting/" + companyId + "/" + params.row.Id)}
                >
                  <EditIcon fontSize="inherit" />
                </IconButton>
                <IconButton
                  size="small"
                  aria-label="delete"
                  color="primary"
                  onClick={() => {
                    setConfirmDialog({
                      isOpen: true,
                      title: "Are you sure You Want to delete this Meeting?",
                      subTitle: "You can't undo this operation",
                      onConfirm: () => {
                        removeMeeting(params.row.Id);
                      },
                    });
                  }}
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
                <Button
                  name="Cancel" color="primary"
                  onClick={() => getCancelPopup(params.row.Id)}
                >Cancel</Button>

              </>
            )}
            <Button
              className="btnGrid"
              variant="contained"
              //onClick={() => Navigate("/meetingMinutesForm /")}
              onClick={() => navigate("/meetingMinutesForm/" + companyId + "/" + params.row.Id,
                {
                  state: {
                    row: params.row,
                  },
                }
              )
              }
            >
              Meeting Minutes

            </Button>

          </Stack>
        );
      },
    },
  ];

  const riskColumns: GridColDef[] = [
    { field: "RiskName", headerName: "Risk", width: 300 },
    { field: "RiskDescription", headerName: "Description", flex: 1.5 },
  ];

  const opportunityColumns: GridColDef[] = [
    { field: "OpportunityName", headerName: "Opportunity", width: 300 },
    { field: "OpportunityDescription", headerName: "Description", flex: 1.5 },
  ];

  return (
    <>
      <Title>Schedule Meetings</Title>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/addmeeting/" + companyId)}
            >
              Add Record
            </Button>

            <Grid item xs={12} sm={3}>
              <Button
                variant="contained"
                color={selectedType === "OWN" ? "success" : "error"}
                onClick={() => {
                  searchMeetingsByType("OWN");
                  setParticipateClicked(false);
                }}
              >
                OWN
              </Button>
            </Grid>
            <Button
              variant="contained"
              color={selectedType === "Participant" ? "success" : "error"}
              onClick={() => {
                { searchMeetingsByType("Participant") }
                setParticipateClicked(true);
              }}
            >
              Participant
            </Button>
            <Button
              variant="contained"
              color={selectedType === "Subordinate" ? "success" : "error"}
              onClick={() => {
                searchMeetingsByType("Subordinate");
                setParticipateClicked(false);
              }}
            >
              Subordinate
            </Button>

            <Button
              variant="contained"
              startIcon={<CalendarTodayIcon />}
              color="error"
              onClick={() => navigate("/meetingCalender/" + companyId)}
            >
              Calender
            </Button>
          </Stack>

          <div className="dvGrid">
            <DataGrid
              //paginationModel={paginationModel}
              //onPaginationModelChange={setPaginationModel}
              getRowId={(row) => row.Id}
              rows={meetings}
              //rows={meetingsbyComapanyuser}//OWN

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
                pagination: { paginationModel: { pageSize: 10 } },
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
        </CardContent>
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />

      <div>
        <Dialog
          fullWidth={true}
          maxWidth={maxWidth}
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <DialogTitle id="customized-dialog-title">
            <Grid>{modalTitle}</Grid>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme: any) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>
            <Box>

              {isMeetingCancelling ? <>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'space-between', alignItems: 'center', width: '100%', paddingLeft: '10px' }}
                  onSubmit={submitMeetingCancellation}

                >
                  <TextField
                    required
                    id="outlined-multiline-flexible"
                    name="Remark"
                    label="Remark"
                    placeholder=" Please Enter Reason For Cancellation"
                    multiline
                    maxRows={5}
                    onChange={(e) => { setCancelRemark(e.target.value) }}
                    style={{ width: "80%" }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingRight: '10px', marginLeft: "10px" }}>
                    <Button variant="outlined" style={{ marginLeft: "15px" }} onClick={handleClose}>
                      No
                    </Button>
                    <Button type="submit" variant="outlined" style={{ marginLeft: "15px" }} >
                      Yes
                    </Button>
                  </div>
                </form>
              </>
                :
                <>
                  {selectedMeeting && (
                    <Grid container spacing={1}>
                      <Grid item xs={6} sm={4}>
                        <Typography className="label"> Meeting No.</Typography>
                        <Typography variant="body2">
                          {selectedMeeting.MeetingNo}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <Typography className="label">Scheduled On</Typography>
                        <Typography variant="body2">
                          {dayjs(selectedMeeting.ScheduledOn).format(
                            "DD-MMM-YYYY h:mm A"
                          )}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <Typography className="label">Responsible User</Typography>
                        <Typography variant="body2">
                          {selectedMeeting.CompanyUser?.Name}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <Typography className="label">Status</Typography>
                        <Typography variant="body2">
                          {selectedMeeting.MeetingStatus}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <Typography className="label">
                          Client Employee To Meet
                        </Typography>
                        <Typography variant="body2">
                          {selectedMeeting.ClientEmployee?.Name}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={4}>
                        <Typography className="label">Mobile No.</Typography>
                        <Typography variant="body2">
                          {selectedMeeting.ClientEmployee?.Mobile}
                        </Typography>
                      </Grid>

                      <Grid item xs={6} sm={12}>
                        <Typography className="label">Meeting Purpose</Typography>
                        <Typography variant="body2">
                          {selectedMeeting.MeetingPurpose}
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                  <div className="dvGrid">
                    <DataGrid
                      getRowId={(row) => (isRisks ? row.RiskID : row.OpportunityID)}
                      rows={isRisks ? risks : opportunities}
                      columns={isRisks ? riskColumns : opportunityColumns}
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
                            //BusinessSegmentId: false,
                          },
                        },
                        pagination: { paginationModel: { pageSize: 10 } },
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
                </>}
            </Box>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default MeetingsList;
