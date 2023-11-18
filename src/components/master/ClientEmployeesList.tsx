import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../models/CompanyModel";
import {
  Stack,
  IconButton,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ConfirmDialog from "../helper/ConfirmDialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Title from "../helper/Title";
import { ClientEmployeesModel } from "../../models/ClientEmployeesModel";
import { clientEmployeeService } from "../../services/ClientEmployeeService";
import { globalService } from "../../services/GlobalService";
import { AuthContext } from "../../utility/context/AuthContext";

const ClientEmployeesList = () => {
  const { Id, clientId }: any = useParams();
  const prevPgState = useLocation();
  const { auth } = React.useContext(AuthContext);

  const [clientEmployees, setclientEmployees] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    getClientEmployees();
  }, []);

  const navigate = useNavigate();

  function getClientEmployees() {
    clientEmployeeService
      .getClientEmolyeeByClientId(clientId)
      .then((response) => {
        if (response) {
          let result = response.data;
          if (result.isSuccess) {
            setclientEmployees(result.list);
          } else {
            globalService.error(result.message);
          }
        }
      });
  }

  const removeClientEmployees = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });

    clientEmployeeService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getClientEmployees();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const ClientEmployeesColumns: GridColDef[] = [
    {
      field: "ClientBusinessUnitId",
      headerName: "Client Business Unit",
      flex: 1,
      valueGetter: (params) => params.row.clientBusinessUnit?.Name,
    },
    { field: "Name", headerName: "Name", flex: 1 },
    { field: "Designation", headerName: "Designation", flex: 1 },
    { field: "Mobile", headerName: "Mobile", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    { field: "Location", headerName: "Location", flex: 1 },
    { field: "Department", headerName: "Department", flex: 1 },
    {
      field: "Actions",
      headerName: "Actions",
      width: 100,
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
                  "/editClientEmployee/" + clientId + "/" + params.row.Id
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
                  title: "Are you sure to delete this Client Employee ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeClientEmployees(params.row.Id);
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
          Client Employees
        </Typography>
        {prevPgState && prevPgState.state && prevPgState.state.row && (
          <Typography variant="body1">
            <b>Client Name: </b>
            {prevPgState.state.row.Name}{""}
          </Typography>
        )}
      </Stack>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addClientEmployee/" + clientId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={clientEmployees}
              columns={ClientEmployeesColumns}
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

export default ClientEmployeesList;
