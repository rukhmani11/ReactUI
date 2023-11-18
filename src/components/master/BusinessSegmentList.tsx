import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BusinessSegmentsModel } from "../../models/BusinessSegmentsModel";
import {
  Stack,
  IconButton,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ConfirmDialog from "../helper/ConfirmDialog";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { globalService } from "../../services/GlobalService";
import Title from "../helper/Title";
import { businessSegmentsService } from "../../services/BusinessSegmentsService";

const BusinessSegmentList = () => {
  const [businessSegments, setbusinessSegment] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (businessSegments.length === 0) getbusinessSegment();
  }, []);

  function getbusinessSegment() {
    businessSegmentsService.getAll().then((response: any) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setbusinessSegment(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const removebusinessSegment = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    businessSegmentsService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getbusinessSegment();
      } else {
        globalService.error(result.message);
      }
    });
  };
  const businessSegmentColumns: GridColDef[] = [
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Code", headerName: "Code", flex: 1 },
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
              onClick={() => navigate("/editBusinessSegment/" + params.row.Id)}
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
                    "Are you sure you want to delete this Business Segment ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removebusinessSegment(params.row.Id);
                  },
                });
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>

            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate("/businessSubSegments/" + params.row.Id, {
                    state: {
                      row: params.row,
                    },
                  })
              }
            >
              Sub-Segments
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Title>Business Segments</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addBusinessSegment/")}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={businessSegments}
              columns={businessSegmentColumns}
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
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default BusinessSegmentList;
