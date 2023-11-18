import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import { businessSubSegmentsService } from "../../services/BusinessSubSegmentsService";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Button, Card, CardContent, IconButton, Stack, CardActions} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import ConfirmDialog from "../helper/ConfirmDialog";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Title } from "@mui/icons-material";
import { Typography } from "@material-ui/core";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { idText } from "typescript";

const BusinessSubSegmentList = () => {
  const [businessSubSegments, setbusinessSubSegment] = useState([]);
  const { businessSegmentId }: any = useParams();

  const prevPgState = useLocation();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (businessSubSegments.length === 0) getbusinessSubSegment();
  }, []);

  function getbusinessSubSegment() {
    businessSubSegmentsService
      .GetbusinessSubSegmentBybusinessSegmentId(businessSegmentId)
      .then((response: any) => {
        if (response) {
          let result = response.data;
          if (result.isSuccess) {
            setbusinessSubSegment(result.list);
          } else {
            globalService.error(result.message);
          }
        }
      });
  }

  const removebusinessSubSegment = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    businessSubSegmentsService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getbusinessSubSegment();
      } else {
        globalService.error(result.message);
      }
    });
  };
  const businessSubSegmentColumns: GridColDef[] = [
    { field: "Name", headerName: "Name", flex: 1 },
    {
      field: "Active",
      headerName: "Active",
      width: 130,
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack>
           {params.row.Active && <DoneIcon color="success" />}
            {!params.row.Active && <CloseIcon color="error" />}
          </Stack>
        );
      },
    },
    {
      field: "Actions",
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
                navigate(
                  "/editBusinessSubSegments/" +
                    businessSegmentId +
                    "/" +
                    params.row.Id
                )
              }
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
                  title:
                    "Are you sure you want to delete Business Sub Segment " + params.row.Name + " ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removebusinessSubSegment(params.row.Id);
                  },
                });
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>

          
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Stack direction="row" spacing={0} justifyContent="space-between" >
      <Typography variant="h5" align="center" color="primary">
          Business Sub-Segment
        </Typography>
        {prevPgState && prevPgState.state && prevPgState.state.row && (
          <Typography variant="body1">
            <b>Business Segment: </b>
            {prevPgState.state.row.Name}{" "}
          </Typography>
        )}
      </Stack>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() =>
              navigate("/addBusinessSubSegments/" + businessSegmentId)
            }
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={businessSubSegments}
              columns={businessSubSegmentColumns}
              columnHeaderHeight={30}
              ////rowHeight={30}
              autoHeight={true}
              getRowHeight={() => "auto"}
              getEstimatedRowHeight={() => 200}
              //loading={loading}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns Id, the other columns will remain visible
                    Id: false,
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

        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2} direction="row">
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/businessSegments" )}
                >
                  Back To List
                </Button>
              </Stack>
            </CardActions>
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default BusinessSubSegmentList;
