import { CenterFocusStrong, Checklist, Title, ViewAgenda } from "@mui/icons-material";
import React, { useContext, useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { Theme } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { makeStyles } from "@mui/styles";

import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { MeetingService } from "../../services/MeetingService";
import { globalService } from "../../services/GlobalService";

import dayjs from "dayjs";
import { SearchMeetingDTO } from "../../models/MeetingModel";
import { AuthContext } from "../../utility/context/AuthContext";



const localizer = momentLocalizer(moment);

const MeetingCalender = () => {
  const { auth } = useContext(AuthContext);
  const { companyId }: any = useParams();
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const navigate = useNavigate();
  const [meetings, setMeetings] = useState([]);
  const [selectedMeeting, setSelectedMeeting] = useState<any>({});
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (meetings.length === 0) getMeeting();
  }, []);

  const getMeeting = () => {
    let model : SearchMeetingDTO = {
      // CompanyUserId: type === "own" ? CompanyUserId : null,
      CompanyId:auth.CompanyId ,
      CompanyUserId: "",
      ReportingToUserId: "",
      MeetingCompanyAttendeesIds: "",
    }
    // CompanyId = auth.CompanyId;
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
  };

  const handleSelectedEvent = (model: any) => {
    let selMeeting = meetings.filter((x) => x.Id === model.Id);
    if (selMeeting.length > 0) {
      const { ScheduledOn, MeetingNo, ClientName, ClientEmployeeName, CompanyUserName, MeetingPurpose, Agenda } =
        selMeeting[0];
      setSelectedMeeting(selMeeting[0]);
      handleOpen();
      let newModel = {
        ScheduledOn,
        MeetingNo,
        MeetingPurpose,
        ClientName,
        ClientEmployeeName,
        CompanyUserName,
        Agenda,
      };
      return newModel;
    }
  };

  const meet = meetings.map((meeting) => {
    return {
      Id: meeting.Id,
      title: meeting.MeetingPurpose,
      start: new Date(meeting.ScheduledOn),
      end: new Date(meeting.ScheduledEnd),
    };
  });

  return (
    <div>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<Checklist />}
            onClick={() => navigate("/meetings/" + companyId)}
          >
            {" "}
            Back to List
          </Button>
        </CardContent>

        <CardContent>
          <Calendar
            localizer={localizer}
            events={meet}
            popup={false}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={(e) => handleSelectedEvent(e)}
          />
        </CardContent>
        <div>
          <Dialog
            fullWidth={true}
            maxWidth={maxWidth}
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <DialogTitle sx={{ m: 0, p: 2, textAlign: "center" }} id="customized-dialog-title">
              <Grid>
                Meeting  Details
                <Grid item xs={6} sm={3}>
                  <Typography className="label">Scheduled On</Typography>
                  <Typography variant="body2">
                    {" "}
                    {dayjs(selectedMeeting.ScheduledOn).format('DD-MMM-YYYY h:mm A')}
                  </Typography>
                </Grid>
              </Grid>
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
                {selectedMeeting && (
                  <Grid container spacing={3}>

                    <Grid item xs={6} sm={3}>
                      <Typography className="label">Client Name</Typography>
                      <Typography variant="body2">
                        {" "}
                        {selectedMeeting.Client?.Name}
                      </Typography>

                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Typography className="label">Responsible Co. User</Typography>
                      <Typography variant="body2">
                        {" "}
                        {selectedMeeting.CompanyUser?.Name}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Typography className="label">Client Employee To Meet</Typography>
                      <Typography variant="body2">
                        {" "}
                        {selectedMeeting.ClientEmployee?.Name}

                        <Typography>
                          {"M:"}
                          {(selectedMeeting.ClientEmployee?.Mobile)}
                        </Typography>
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={3}>
                      <Typography className="label"> Meeting No.</Typography>
                      <Typography variant="body2">
                        {" "}
                        {selectedMeeting.MeetingNo}
                      </Typography>
                    </Grid>

                    <Grid item xs={6} sm={12}>
                      <Typography className="label">Meeting Purpose</Typography>
                      <Typography variant="body2">
                        {" "}
                        {selectedMeeting.MeetingPurpose}
                      </Typography>
                    </Grid>
                    <Grid item xs={6} sm={12}>
                      <Typography className="label">Agenda</Typography>
                      <Typography variant="body2">
                        {" "}
                        {selectedMeeting.Agenda}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                {!selectedMeeting && (
                  <>
                    <p>No Meeting Details Found!.</p>
                  </>
                )}
              </Box>
            </DialogContent>

          </Dialog>
        </div>
      </Card>
    </div>
  );
};

export default MeetingCalender;
