import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
import Title from "../helper/Title";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ClientAccountsModel } from "../../models/ClientAccountsModel";
import { click } from "@testing-library/user-event/dist/click";
import { clientAccountsService } from "../../services/ClientAccountsService";
import { globalService } from "../../services/GlobalService";
import dayjs from "dayjs";
import { AuthContext } from "../../utility/context/AuthContext";

const ClientAccountsList = () => {
  const { Id, clientId }: any = useParams();
  const [clientAccounts, setclientAccounts] = useState([]);
  const prevPgState = useLocation();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const { auth } = React.useContext(AuthContext);

  useEffect(() => {
    if (clientAccounts.length === 0) getClientAccounts();
  }, []);

  const navigate = useNavigate();

  function getClientAccounts() {
    clientAccountsService
      .getClientAccountByClientId(clientId)
      .then((response: any) => {
        if (response) {
          let result = response.data;
          if (result.isSuccess) {
            setclientAccounts(result.list);
          } else {
            globalService.error(result.message);
          }
        }
      });
  }

  const removeClientAccounts = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    clientAccountsService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getClientAccounts();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const ClientAccountsColumns: GridColDef[] = [
    {
      field: "AccountTypeId",
      headerName: "Account Type",
      flex: 1,
      valueGetter: (params) => params.row.accountType?.Name,
    },
    { field: "AccountNo", headerName: "Account No", flex: 1 },
    {
      field: "BalanceAsOn",
      headerName: "Balance As On",
      flex: 1,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
    {
      field: "CurrencyCode",
      headerName: "Currency",
      flex: 1,
      valueGetter: (param) => param.row.Currency?.Name,
    },
    {
      field: "Balance",
      headerName: "Balance",
      flex: 1,
      align: "right",
      width: 100,
    },

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
                navigate("/editClientAccount/" + clientId + "/" + params.row.Id)
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
                  title: "Are you sure to delete this Client Account ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeClientAccounts(params.row.Id);
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
          Client Accounts
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
            onClick={() => navigate("/addClientAccount/" + clientId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={clientAccounts}
              columns={ClientAccountsColumns}
              columnHeaderHeight={30}
              rowHeight={30}
              autoHeight={true}
              //getRowHeight={() => "auto"}
              getEstimatedRowHeight={() => 200}
              //loading={loading}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    // Hide columns Id, the other columns will remain visible
                    ClientAccountsId: false,
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

export default ClientAccountsList;
