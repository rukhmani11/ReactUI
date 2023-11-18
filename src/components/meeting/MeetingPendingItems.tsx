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
  Grid,
  Divider,
  Theme,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridToolbar,
  GridValueGetterParams,
} from "@mui/x-data-grid";
import { MeetingService } from "../../services/MeetingService";
import dayjs from "dayjs";
import { AuthContext } from "../../utility/context/AuthContext";

import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { meetingRiskService } from "../../services/MeetingRiskService";
import { meetingOpportunityService } from "../../services/MeetingOpportunityService";
import { MeetingObservationAndOtherMatterService } from "../../services/MeetingObservationAndOtherMatterService";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    border: "0.5px solid grey",
    display: "inline-flex",
    width: "100% !important",
    margin: "0px !important",
  },
  item: {
    //border: '0.5px solid grey',
    paddingTop: "10px !important",
  },
}));

const MeetingPendingItems = () => {
  const { clientId, clientBusinessUnitId }: any = useParams();

  const [meetingRisk, setMeetingRisk] = useState([]);
  const [meetingOpportunity, setmeetingOpportunity] = useState([]);
  const [ meetingObservationAndOtherMatter, setMeetingObservationAndOtherMatter] = useState([]);
 
  const [tabValue, setTabValue] = React.useState("1");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const prevPgState = useLocation();
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");

  const [pendingItemRisk, setPendingItemRisk] = useState<any>({});
  const [pendingItemOpportunity, setPendingItemOpportunity] = useState<any>({});
  const [pendingItemObservationAndOtherMatter,setPendingItemObservationAndOtherMatter] = useState<any>({});

  const [OpenRisk, setOpenRisk] = React.useState(false);
  const [OpenOpportunity, setOpenOpportunity] = React.useState(false);
  const [openObservation, setOpenObservation] = React.useState(false);

  const handleOpenRisk = () => {
    setOpenRisk(true);
  };

  const handleCloseRisk = () => {
    setOpenRisk(false);
  };

  const handleOpenOpportunity = () => {
    setOpenOpportunity(true);
  };

  const handleCloseOpportunity = () => {
    setOpenOpportunity(false);
  };

  const handleOpenObservation = () => {
    setOpenObservation(true);
  };

  const handleCloseObservation = () => {
    setOpenObservation(false);
  };

  useEffect(() => {
    if (meetingRisk.length === 0) getMeetings();
  }, []);

  function getMeetings() {
    MeetingService.getByClientIdOrClientBusinessUnitId(
      clientId,
      clientBusinessUnitId
    ).then((response: any) => {
      if (response) {
        debugger;
        let result = response.data;
        if (result.isSuccess) {
          setMeetingRisk(result.list);
          debugger;
        } else {
          globalService.error(result.message);
        }
      }
    });
  }
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
    localStorage.setItem("selAdminTab", newValue.toString());
  };

  useEffect(() => {
    if (meetingRisk.length === 0) getAllMeetingRisk();
  }, []);

  const getAllMeetingRisk = () => {
    debugger;
    meetingRiskService.getAllByMeetingRisk().then((response: { data: any }) => {
      let result = response.data;
      setMeetingRisk(result.list);
    });
  };

  useEffect(() => {
    if (meetingOpportunity.length === 0) getAllMeetingOpportunity();
  }, []);

  const getAllMeetingOpportunity = () => {
    meetingOpportunityService.getAllByMeetingOpportunity().then((response) => {
      let result = response.data;
      setmeetingOpportunity(result.list);
    });
  };

  useEffect(() => {
    if (meetingObservationAndOtherMatter.length === 0)
      getAllMeetingObservationAndOtherMatter();
  }, []);

  const getAllMeetingObservationAndOtherMatter = () => {
    MeetingObservationAndOtherMatterService.getAllMeetingObservationAndOtherMatter().then(
      (response) => {
        let result = response.data;
        setMeetingObservationAndOtherMatter(result.list);
      }
    );
  };

  const columnRisk: GridColDef[] = [
    {
      field: "MeetingNo",
      headerName: "Meeting No",
      width: 150,
      valueGetter: (params) => params.row.Meeting?.MeetingNo,
    },
    {
      field: "VisitedOn",
      headerName: "Visited On",
      width: 120,
      valueGetter: (params) => params.row.Meeting?.VisitedOn,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
    {
      field: "MeetingPurpose",
      headerName: "Meeting Purpose",
      width: 300,
      valueGetter: (params) => params.row.Meeting?.MeetingPurpose,
    },
    {
      field: "Name",
      headerName: "Risk",
      width: 150,
      valueGetter: (params) => params.row.CompanyRisk?.Name,
    },
    {
      field: "IsCritical",
      headerName: "Critical",
      width: 80,
      renderCell: (params) => {
        return (
          <Stack>
            {params.row.IsCritical && "Yes"}
            {!params.row.IsCritical && "No"}
          </Stack>
        );
      },
    },

    //{ field: "Remarks", headerName: "Remarks", flex: 1 },
    {
      field: "UserName",
      headerName: "Assigned To User",
      width: 150,
      valueGetter: (params) => params.row.AssignedToUser?.UserName,
    },
    { field: "Responsibility", headerName: "Responsibility", width: 130 },
    {
      field: "DeadLine",
      headerName: "Deadline",
      width: 120,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
  ];

  const columnsforOpportunities: GridColDef[] = [
    {
      field: "MeetingNo",
      headerName: "Meeting No",
      width: 150,
      valueGetter: (params) => params.row.Meeting?.MeetingNo,
    },
    {
      field: "VisitedOn",
      headerName: "Visited On",
      width: 120,
      valueGetter: (params) => params.row.Meeting?.VisitedOn,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
    {
      field: "MeetingPurpose",
      headerName: "Meeeting Purpose",
      width: 300,
      valueGetter: (params) => params.row.Meeting?.MeetingPurpose,
    },
    {
      field: "Name",
      headerName: "Opportunity",
      width: 150,
      valueGetter: (params) => params.row.CompanyOpportunity?.Name,
    },
    {
      field: "IsCritical",
      headerName: "Critical",
      width: 80,
      renderCell: (params) => {
        return (
          <Stack>
            {params.row.IsCritical && "Yes"}
            {!params.row.IsCritical && "No"}
          </Stack>
        );
      },
    },

    // { field: "Remarks", headerName: "Remarks", flex: 1 },
    {
      field: "AssignedToUser",
      headerName: "Assigned To User",
      width: 150,
      valueGetter: (params) => params.row.AssignedToUser?.UserName,
    },
    { field: "Responsibility", headerName: "Responsibility", width: 130 },
    {
      field: "DeadLine",
      headerName: "Deadline",
      width: 120,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
  ];

  const columnsforMeetingObservationAndOtherMatter: GridColDef[] = [
    {
      field: "MeetingNo",
      headerName: "Meeting No",
      width: 130,
      valueGetter: (params) => params.row.Meeting?.MeetingNo,
    },
    {
      field: "VisitedOn",
      headerName: "Visited On",
      width: 120,
      valueGetter: (params) => params.row.Meeting?.VisitedOn,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
    {
      field: "MeetingPurpose",
      headerName: "Meeting Purpose",
      width: 250,
      valueGetter: (params) => params.row.Meeting?.MeetingPurpose,
    },
    {
      field: "CompanyObservation",
      headerName: "Observations",
      width: 150,
    },
    {
      field: "IsCritical",
      headerName: "Critical",
      width: 80,
      renderCell: (params) => {
        return (
          <Stack>
            {params.row.IsCritical && "Yes"}
            {!params.row.IsCritical && "No"}
          </Stack>
        );
      },
    },
    //{ field: "Remarks", headerName: "Remarks", flex: 1 },
    {
      field: "AssignedToUser",
      headerName: "Assigned To User",
      width: 150,
      valueGetter: (params) => params.row.AssignedToUser?.UserName,
    },
    { field: "Responsibility", headerName: "Responsibility", width: 200 },
    {
      field: "DeadLine",
      headerName: "Deadline",
      width: 120,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
  ];

  const handleOnSelectPendingItemRisk: GridEventListener<"cellClick"> = (
    event: any
  ) => {
    //let pendingItemRisk = meetings.filter((x) => x.Id === event.Id);
    // setIsPending(true);
    let pendingItemRisk = meetingRisk.filter((x) => x.Id === event.id);
    if (pendingItemRisk.length > 0) {
      const {
        VisitedOn,
        MeetingNo,
        CompanyRisk,
        CompanyUser,
        IsCritical,
        Remarks,
        ActionRequired,
        AssignedToUser,
        UserName,
        Responsibilty,
        Deadline,
        Client,
        VisitSummary,
        MeetingPurpose,
        Agenda,
        VisitedClientEmployee,
        VisitedCompanyUser,
      } = pendingItemRisk[0];
      setPendingItemRisk(pendingItemRisk[0]);
      handleOpenRisk();
      let newModel = {
        VisitedOn,
        MeetingNo,
        MeetingPurpose,
        CompanyRisk,
        UserName,
        VisitSummary,
        Client,
        CompanyUser,
        IsCritical,
        Remarks,
        ActionRequired,
        AssignedToUser,
        Responsibilty,
        Deadline,
        Agenda,
        VisitedClientEmployee,
        VisitedCompanyUser,
      };
      return newModel;
    }
  };

  const handleOnSelectPendingItemOpportunity: GridEventListener<"cellClick"> = (
    event: any
  ) => {
    //let pendingItemRisk = meetings.filter((x) => x.Id === event.Id);
    // setIsPending(false);

    let pendingItemOpportunity = meetingOpportunity.filter(
      (x) => x.Id === event.id
    );

    if (pendingItemOpportunity.length > 0) {
      const {
        MeetingNo,
        CompanyOpportunity,
        IsCritical,
        MeetingPurpose,
        Remarks,
        Client,
        AssignedToUser,
        Responsibilty,
        Deadline,
        VisitedOn,
        Agenda,
        CompanyUser,
        ActionRequired,
        VisitSummary,
        VisitedClientEmployee,
        VisitedCompanyUser,
      } = pendingItemOpportunity[0];
      setPendingItemOpportunity(pendingItemOpportunity[0]);
      handleOpenOpportunity();
      let newModel = {
        MeetingNo,
        MeetingPurpose,
        Client,
        CompanyOpportunity,
        IsCritical,
        Remarks,
        AssignedToUser,
        Responsibilty,
        Deadline,
        VisitedOn,
        Agenda,
        CompanyUser,
        ActionRequired,
        VisitSummary,
        VisitedClientEmployee,
        VisitedCompanyUser,
      };
      return newModel;
    }
  };

  const handleOnSelectPendingItemObservationAndOtherMatter: GridEventListener<
    "cellClick"
  > = (event: any) => {
    //let pendingItemRisk = meetings.filter((x) => x.Id === event.Id);
    // setIsPending(false);
    debugger;

    let pendingItemObservationAndOtherMatter =
      meetingObservationAndOtherMatter.filter((x) => x.Id === event.id);

    if (pendingItemObservationAndOtherMatter.length > 0) {
      const {
        VisitedOn,
        MeetingNo,
        CompanyObservation,
        IsCritical,
        Remarks,
        AssignedToUser,
        Responsibilty,
        Deadline,
        MeetingPurpose,
        Agenda,
        CompanyUser,
        VisitSummary,
        VisitedClientEmployee,
        VisitedCompanyUser,
      } = pendingItemObservationAndOtherMatter[0];
      setPendingItemObservationAndOtherMatter(
        pendingItemObservationAndOtherMatter[0]
      );
      handleOpenObservation();
      let newModel = {
        VisitedOn,
        MeetingNo,
        MeetingPurpose,
        CompanyObservation,
        IsCritical,
        Remarks,
        AssignedToUser,
        Responsibilty,
        Deadline,
        Agenda,
        CompanyUser,
        VisitSummary,
        VisitedClientEmployee,
        VisitedCompanyUser,
      };
      return newModel;
    }
  };

  const classes = useStyles();

  return (
    <>
      <Stack direction="row" spacing={0} justifyContent="space-between">
        <Typography variant="h5" align="center">
          Pending Meetings
          {/* </Typography>
        {prevPgState && prevPgState.state && prevPgState.state.row && (
          <>
            <Typography variant="body1">
              <b>Client: </b>
              {prevPgState.state.row.Client?.Name}
            </Typography>
          </>
        )} */}
        </Typography>
      </Stack>
      <Card>
        <CardContent>
          <Box sx={{ typography: "body1" }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleTabChange} aria-label="Meeting Info">
                  <Tab label="Risks" value="1" />
                  <Tab label="Opportunities" value="2" />
                  <Tab label="Observations" value="3" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <div>
                  <DataGrid
                    onCellClick={handleOnSelectPendingItemRisk}
                    //onSelectEvent={(e) => handleSelectedEvent(e)}
                    getRowId={(row) => row.Id}
                    rows={meetingRisk} // Replace with your data source
                    columns={columnRisk}
                    columnHeaderHeight={30}
                    //rowHeight={30}
                    autoHeight={true}
                    getRowHeight={() => "auto"}
                    getEstimatedRowHeight={() => 200}
                  />
                </div>
              </TabPanel>
              <TabPanel value="2">
                <div>
                  <DataGrid
                    onCellClick={handleOnSelectPendingItemOpportunity}
                    getRowId={(row) => row.Id}
                    rows={meetingOpportunity} // Replace with your data source
                    columns={columnsforOpportunities}
                    columnHeaderHeight={30}
                    //rowHeight={30}
                    autoHeight={true}
                    getRowHeight={() => "auto"}
                    getEstimatedRowHeight={() => 200}
                  />
                </div>
              </TabPanel>
              <TabPanel value="3">
                <div>
                  <DataGrid
                    onCellClick={
                      handleOnSelectPendingItemObservationAndOtherMatter
                    }
                    getRowId={(row) => row.Id}
                    rows={meetingObservationAndOtherMatter} // Replace with your data source
                    columns={columnsforMeetingObservationAndOtherMatter}
                    columnHeaderHeight={30}
                    //rowHeight={30}
                    autoHeight={true}
                    getRowHeight={() => "auto"}
                    getEstimatedRowHeight={() => 200}
                  />
                </div>
              </TabPanel>
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

        <div>
          <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleCloseRisk}
            aria-labelledby="customized-dialog-title"
            open={OpenRisk}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, textAlign: "center" }}
              id="customized-dialog-title"
            >
              <div style={{ display: "flex", justifyContent: "left", gap: "30%" }} >
                <Grid item xs={3} className={classes.item} style={{ textAlign: "left" }} >
                  {pendingItemRisk.IsCritical == 1 ? (
                    <div style={{ textAlign: "left" }}>
                      <Typography className="label" style={{ color: "red" }}>
                        Critical
                      </Typography>
                      <Typography variant="body2">
                        <WarningIcon style={{ color: "red" }} />
                      </Typography>
                    </div>
                  ) : ( "" )}
                </Grid>
                <Grid item xs={9} className={classes.item}>
                  <div>
                    <Typography variant="h6">
                      Pending Meeting Risk Details
                    </Typography>
                    <Typography className="label">Visited On</Typography>
                    <Typography variant="body2">
                      {dayjs(pendingItemRisk.Meeting?.VisitedOn).format( "DD-MMM-YYYY h:mm A" )}
                    </Typography>
                  </div>
                </Grid>
              </div>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseRisk}
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
                {pendingItemRisk && (
                  <Grid container spacing={3}>
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Meeting No.</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.MeetingNo}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Client</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.Client?.Name}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Visited By</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.VisitedCompanyUser?.UserName}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Visited To</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.VisitedClientEmployee?.Name}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label">Meeting Purpose</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.MeetingPurpose}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label">Visit Summary</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.VisitSummary}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={12}>
                      <Typography className="label">Agenda</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Meeting?.Agenda}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={12} sm={12}>
                      <Divider />
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Risk Details</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.CompanyRisk?.Name}
                      </Typography>
                    </Grid>

                    {/* <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Critical</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.IsCritical ? "Yes" : "No"}
                      </Typography>
                    </Grid> */}

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Assign To User</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.AssignedToUser?.UserName}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label"> Remark</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Remarks}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Responsibility</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.Responsibility}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">
                        {" "}
                        Action Required
                      </Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.ActionRequired ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Action Details</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemRisk.ActionDetails}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> DeadLine</Typography>
                      <Typography variant="body2">
                        {" "}
                        {dayjs(pendingItemRisk.DeadLine).format("DD-MMM-YYYY")}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {!pendingItemRisk && (
                  <>
                    <p>No Pending Meeting Risk Details Found!.</p>
                  </>
                )}
              </Box>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleCloseOpportunity}
            aria-labelledby="customized-dialog-title"
            open={OpenOpportunity}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, textAlign: "center" }}
              id="customized-dialog-title"
            >
               <div style={{ display: "flex", justifyContent: "left", gap: "30%" }}>
                <Grid item  xs={3}  className={classes.item}  style={{ textAlign: "left" }}  >
                  {pendingItemOpportunity.IsCritical == 1 ? (
                    <div style={{ textAlign: "left" }}>
                      <Typography className="label" style={{ color: "red" }}>
                        Critical
                      </Typography>
                      <Typography variant="body2">
                        <WarningIcon style={{ color: "red" }} />
                      </Typography>
                      </div>
                ) : ( "" )}
              </Grid>

              <Grid item xs={9} className={classes.item}>
                  <div>
                    <Typography variant="h6">
                      Pending Meeting Opportunity Details
                    </Typography>
                    <Typography className="label">Visited On</Typography>
                    <Typography variant="body2">
                      {dayjs(pendingItemOpportunity.Meeting?.VisitedOn).format( "DD-MMM-YYYY h:mm A" )}
                    </Typography>
                  </div>
                </Grid>
              </div>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseOpportunity}
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
                {pendingItemOpportunity && (
                  <Grid container spacing={3}>
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Meeting No.</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Meeting?.MeetingNo}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Client</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Meeting?.Client?.Name}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Visited By</Typography>
                      <Typography variant="body2">
                        {" "}
                        {
                          pendingItemOpportunity.Meeting?.VisitedCompanyUser
                            ?.UserName
                        }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Visited To</Typography>
                      <Typography variant="body2">
                        {" "}
                        {
                          pendingItemOpportunity.Meeting?.VisitedClientEmployee
                            ?.Name
                        }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label">VisitSummary</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Meeting?.VisitSummary}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label">Meeting Purpose</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Meeting?.MeetingPurpose}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.item} xs={6} sm={12}>
                      <Typography className="label">Agenda</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Meeting?.Agenda}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={12} sm={12}>
                      <Divider />
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">
                        Opportunity Details
                      </Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.CompanyOpportunity?.Name}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Assign To User</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.AssignedToUser?.UserName}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label"> Remark</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Remarks}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Responsibility</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.Responsibility}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">
                        {" "}
                        Action Required
                      </Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.ActionRequired ? "Yes" : "No"}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Action Details</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemOpportunity.ActionDetails}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> DeadLine</Typography>
                      <Typography variant="body2">
                        {" "}
                        {dayjs(pendingItemOpportunity.DeadLine).format(
                          "DD-MMM-YYYY"
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {!pendingItemOpportunity && (
                  <>
                    <p>No Pending Meeting Opportunity Details Found!.</p>
                  </>
                )}
              </Box>
            </DialogContent>
          </Dialog>
        </div>

        <div>
          <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleCloseObservation}
            aria-labelledby="customized-dialog-title"
            open={openObservation}
          >
            <DialogTitle
              sx={{ m: 0, p: 2, textAlign: "center" }}
              id="customized-dialog-title"
            >
              <div style={{ display: "flex", justifyContent: "left", gap: "30%" }}>
             <Grid  item  xs={3}  className={classes.item}  style={{ textAlign: "left" }}  >
                  {pendingItemObservationAndOtherMatter.IsCritical == 1 ? (
                    <div style={{ textAlign: "left" }}>
                      <Typography className="label" style={{ color: "red" }}>
                        Critical
                      </Typography>
                      <Typography variant="body2">
                        <WarningIcon style={{ color: "red" }} />
                      </Typography>
                      </div>
                ) : ( "" )}
              </Grid>

              <Grid item xs={9} className={classes.item}>
                  <div>
                    <Typography variant="h6">
                      Pending Meeting Observation Details
                    </Typography>
                    <Typography className="label">Visited On</Typography>
                    <Typography variant="body2">
                      {dayjs(pendingItemObservationAndOtherMatter.Meeting?.VisitedOn).format( "DD-MMM-YYYY h:mm A" )}
                    </Typography>
                  </div>
                </Grid>
              </div>
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleCloseObservation}
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
                {pendingItemObservationAndOtherMatter && (
                  <Grid container spacing={3}>
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Meeting No.</Typography>
                      <Typography variant="body2">
                        {" "}
                        { pendingItemObservationAndOtherMatter.Meeting ?.MeetingNo}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Client</Typography>
                      <Typography variant="body2">
                        {" "}
                        { pendingItemObservationAndOtherMatter.Meeting?.Client?.Name }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Visited By</Typography>
                      <Typography variant="body2">
                        {" "}
                        { pendingItemObservationAndOtherMatter.Meeting ?.VisitedClientEmployee?.Name}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Visited To</Typography>
                      <Typography variant="body2">
                        {" "}
                        { pendingItemObservationAndOtherMatter.Meeting?.VisitedClientEmployee?.Name }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label">Meeting Purpose</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.Meeting ?.MeetingPurpose }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label">VisitSummary</Typography>
                      <Typography variant="body2">
                        {" "}
                        { pendingItemObservationAndOtherMatter.Meeting?.VisitSummary }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={12}>
                      <Typography className="label">Agenda</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.Meeting?.Agenda}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={12} sm={12}>
                      <Divider />
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">
                        Observation Details
                      </Typography>
                      <Typography variant="body2">
                        {" "}
                        { pendingItemObservationAndOtherMatter.CompanyObservation}
                      </Typography>
                    </Grid>

                    {/* <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Critical</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.IsCritical
                          ? "Yes"
                          : "No"}
                      </Typography>
                    </Grid> */}
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">Assign To User</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.AssignedToUser ?.UserName }
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={6}>
                      <Typography className="label"> Remark</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.Remarks}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Responsibility</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.Responsibility}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label">
                        {" "}
                        Action Required
                      </Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.ActionRequired
                          ? "Yes"
                          : "No"}
                      </Typography>
                    </Grid>
                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> Action Details</Typography>
                      <Typography variant="body2">
                        {" "}
                        {pendingItemObservationAndOtherMatter.ActionDetails}
                      </Typography>
                    </Grid>

                    <Grid item className={classes.item} xs={6} sm={3}>
                      <Typography className="label"> DeadLine</Typography>
                      <Typography variant="body2">
                        {" "}
                        {dayjs(pendingItemObservationAndOtherMatter.DeadLine).format("DD-MMM-YYYY")}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {!pendingItemObservationAndOtherMatter && (
                  <>
                    <p>
                      No Pending Meeting Observation And Other Matter Details
                      Found!.
                    </p>
                  </>
                )}
              </Box>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </>
  );
};

export default MeetingPendingItems;
