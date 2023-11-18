import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import {
  Stack,
  IconButton,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { MeetingService } from "../../services/MeetingService";
import dayjs from "dayjs";
import Title from "../helper/Title";
import { SearchMeetingDTO } from "../../models/MeetingModel";
import { AuthContext } from "../../utility/context/AuthContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { MeetingStatusEnum } from "../../utility/Config";

function MeetingHistoryList() {
  const { companyId, MeetingStatus }: any = useParams();
  const [meetings, setMeetings] = useState([]);
  const { auth } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (meetings.length === 0)getMeetingHistory(MeetingStatusEnum.Closed);
  }, []);

  function getMeetingHistory(MeetingStatus: any) {
    MeetingService.getByStatus(MeetingStatus).then((response) => {
      if (response) {
        debugger;
        let result = response.data;
        if (result.isSuccess) {
          //const filteredMeetings = result.list.filter((meeting : any) => meeting.MeetingStatusId === MeetingStatus);
          //let filteredMeetings = meetings.filter((x) => x.MeetingStatusId === MeetingStatus);
          setMeetings(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const meetingColumns: GridColDef[] = [
    {
      field: "ClientId",
      headerName: "Client Name",
      flex: 1,
      valueGetter: (params) => params.row.Client?.Name,
    },
    { field: "MeetingNo", headerName: "Meeting No", flex: 1 },
    { field: "MeetingStatus", headerName: "Meeting Status", flex: 1 },
    { field: "CancelRemark", headerName: "Remark", flex: 1 },

    {
      field: "VisitedOn",
      headerName: "VisitedOn",
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
    { field: "MeetingPurpose", headerName: "Meeting Purpose", flex: 1 },
    {
      field: "Active",
      headerName: "Actions",
      type: "number",
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              color="primary"
              aria-label="add an alarm"
              onClick={() =>
                navigate("/viewMeeting/" + companyId + "/" + params.row.Id)
              }
            >
              <VisibilityIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Title> Meeting History</Title>
      <Card>
        <CardContent>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="error"
              onClick={() => getMeetingHistory(MeetingStatusEnum.Cancelled)}
            >
              Cancelled
            </Button>

            <Button
              variant="contained"
              color="error"
              onClick={() => getMeetingHistory(MeetingStatusEnum.Closed)}
            >
              Closed
            </Button>
          </Stack>

          <div className="dvGrid">
            <DataGrid
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
    </>
  );
}

export default MeetingHistoryList;
