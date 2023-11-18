import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Stack,
  IconButton,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ConfirmDialog from "../helper/ConfirmDialog";
import Title from "../helper/Title";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { globalService } from "../../services/GlobalService";
import { clientbusinessUnitService } from "../../services/ClientBusinessUnitService";
import { AuthContext } from "../../utility/context/AuthContext";

const ClientBusinessUnitList = () => {
  const { clientId }: any = useParams();
  const [clientbusinessUnits, setclientbusinessUnit] = useState([]);
  const prevPgState = useLocation();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (clientbusinessUnits.length === 0) getClientbusinessUnit();
  }, []);

  function getClientbusinessUnit() {
    clientbusinessUnitService
      .getClientBusinessUnitByclientId(clientId)
      .then((response: any) => {
        if (response) {
          let result = response.data;
          if (result.isSuccess) {
            setclientbusinessUnit(result.list);
          } else {
            globalService.error(result.message);
          }
        }
      });
  }

  const removeclientbusinessUnit = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    clientbusinessUnitService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getClientbusinessUnit();
      } else {
        globalService.error(result.message);
      }
    });
  };
  const ClientbusinessUnitColumns: GridColDef[] = [
    { field: "Name", headerName: "Business Unit", flex: 1 },
    {
      field: "BusinessSegmentId",
      headerName: "Business Segament",
      flex: 1,
      valueGetter: (params) => params.row.BusinessSegment?.Name,
    },
    {
      field: "RoUserId",
      headerName: "RO User",
      flex: 1,
      valueGetter: (params) => params.row.RoUser?.Name,
    },
    {
      field: "Actions",
      headerName: "Actions",
      // width: 350,
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
                  "/editclientBusinessUnit/" + clientId + "/" + params.row.Id
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
                  title: "Are you sure to delete this Account Type ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeclientbusinessUnit(params.row.Id);
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
      <Stack direction="row" spacing={0} justifyContent="space-between">
        <Typography variant="h5" align="center">
          Client Business Unit
        </Typography>
        {prevPgState && prevPgState.state && prevPgState.state.row && (
          <Typography variant="body1">
            <b>Client Name: </b>
            {prevPgState.state.row.Name}{" "}
          </Typography>
        )}
      </Stack>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addclientBusinessUnit/" + clientId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={clientbusinessUnits}
              columns={ClientbusinessUnitColumns}
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
                    BusinessUnit: false,
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
              onClick={() => navigate("/clients/" + auth.CompanyId)}
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

export default ClientBusinessUnitList;
