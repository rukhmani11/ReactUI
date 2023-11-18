import React, { useEffect, useState } from "react";
import { MeetingService } from "../../services/MeetingService";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, CardActions, Grid, Stack } from "@mui/material";
import { CardContent, Typography } from "@material-ui/core";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import dayjs from "dayjs";
import { AuthContext } from "../../utility/context/AuthContext";
function ViewMeetingForm() {
  const { id }: any = useParams();
  const [meeting, setMeetings] = useState<any>(
    MeetingService.initialFieldValues
  );
  const { auth } = React.useContext(AuthContext)
  let companyId = auth?.CompanyId;
  let navigate = useNavigate();

  useEffect(() => {
    getMeetingById();
  });
  const getMeetingById = () => {
    MeetingService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        if (result.data) {
          debugger;
          // //getSelectClientEmployeeByclientId(result.data.ClientId);
          // result.data.GroupName = result.data.Client.ClientGroup?.GroupName;
          // result.data.GroupCIFNo = result.data.Client.ClientGroup?.GroupCIFNo;
          // result.data.ClientEmployeeId = result.data.ClientEmployeeId;
          // result.data.CIFNo = result.data.Client.CIFNo;
          // result.data.MeetingClientAttendeesIds =
          //   result.data.MeetingClientAttendeesIds;
          // result.data.MeetingCompanyAttendeesIds =
          //   result.data.MeetingCompanyAttendeesIds;
          setMeetings(result.data);
        }
      }
    });
  };

  return (
    <>
      <Stack direction="row" spacing={0} justifyContent="space-between">
        <Typography variant="h5"> View Meeting </Typography>
      </Stack>
      <Card>
        <CardContent>
          <React.Fragment>
            <Grid container spacing={3}>
              <Grid item xs={14} sm={3}>
                <Typography className="label">Client Name</Typography>
                <Typography variant="body2">{meeting.Client.Name}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label">CIF NO</Typography>
                <Typography variant="body2">{meeting.Client.CIFNo}</Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label"> Client Group</Typography>
                <Typography variant="body2">
                  {meeting.Client.ClientGroup?.GroupName}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label"> Group CIF NO</Typography>
                <Typography variant="body2">
                  {meeting.Client.ClientGroup?.GroupCIFNo}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label">MeetingNo</Typography>
                <Typography variant="body2">{meeting.MeetingNo}</Typography>
              </Grid>
           
              <Grid item xs={12} sm={3}>
                <Typography className="label">Scheduled On</Typography>
                <Typography variant="body2">
                  {dayjs(meeting.ScheduledOn).format("DD-MMM-YYYY")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label">Responsible User</Typography>
                <Typography variant="body2">
                  {meeting.CompanyUser?.Name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label">Client Employee</Typography>
                <Typography variant="body2">
                  {meeting.ClientEmployee?.Name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography className="label">Meeting Purpose</Typography>
                <Typography variant="body2">
                  {meeting.MeetingPurpose}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}  >
  <Typography className="label" >Agenda</Typography>
  <Typography variant="body2"  style={{ height: '5em' }}> {meeting.Agenda}</Typography>
   
  
</Grid>


              {/* <Grid item xs={12} sm={4} >
                <Typography className="label" >Agenda</Typography>
                <Typography variant="body2"  >{meeting.Agenda} </Typography>
              </Grid> */}
              

              <Grid item xs={12} sm={3}>
                <Typography className="label">Other Client Employees</Typography>
                <Typography variant="body2">
                  {meeting.SelectedMeetingClientAttendees.map(
                    (x: any) => x.label
                  ).join(",")}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography className="label">Other Company Users</Typography>
                <Typography variant="body2">
                  {meeting.SelectedMeetingCompanyAttendees.map(
                    (x: any) => x.label
                  ).join(",")}
                </Typography>
              </Grid>
          
              <Grid item xs={12} sm={3}>
                <Typography className="label">Visited On</Typography>
                <Typography variant="body2">
                {dayjs(meeting.VisitedOn).format("DD-MMM-YYYY")}
                 </Typography>
              </Grid>
            
              <Grid item xs={12} sm={3}>
                <Typography className="label">Meeting Status</Typography>
                <Typography variant="body2">{meeting.MeetingStatus}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography className="label">Visit Summary</Typography>
                <Typography variant="body2">{meeting.VisitSummary}</Typography>
              </Grid>
            </Grid>
          </React.Fragment>
        </CardContent>
        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/meetings/" + companyId)}
                >
                  Back To List
                </Button>
              </Stack>
            </CardActions>
      </Card>
    </>
  );
}

export default ViewMeetingForm;
