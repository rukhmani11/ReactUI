import React, { useContext, useEffect, useState } from "react";
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
import { clientFinancialsService } from "../../services/ClientFinancialService";
import { globalService } from "../../services/GlobalService";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../utility/context/AuthContext";

const ClientFinancialsList = () => {
  const { clientId }: any = useParams();
  const [clientAccounts, setclientAccounts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const { auth } = React.useContext(AuthContext);
  const prevPgState = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    getclientAccounts();
  }, []);

  function getclientAccounts() {
    clientFinancialsService.getByClientId(clientId).then((response: any) => {
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

  const removeCompany = (ClientFinancialId: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    clientFinancialsService.remove(ClientFinancialId).then((response) => {
      let result = response.data;
      if (response) {
        globalService.success(result.message);
        getclientAccounts();
      }
    });
  };

  //   const test = (Id: any) => {
  //      auth.CompanyId
  //   }
  const CompanyColumns: GridColDef[] = [
    {
      field: "FinancialYearID",
      headerName: "Financial Year",
      flex: 1,
      valueGetter: (params) => params.row.FinancialYear?.Abbr,
    },
    {
      field: "CurrencyCode",
      headerName: "Currency",
      flex: 1,
      valueGetter: (param) => param.row.Currency?.Name,
    },
    { field: "Turnover", headerName: "Turnover", flex: 1 },
    { field: "Profit", headerName: "Profit", flex: 1 },
    // {
    //     field: "Active",
    //     headerName: "Active",
    //     flex: 1,
    //     renderCell: (params) => {
    //         return (
    //             <Stack>
    //                 {params.row.Active && <DoneIcon color="success" />}
    //                 {!params.row.Active && <CloseIcon color="error" />}
    //             </Stack>
    //         );
    //     },
    // },
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
                  "/editClientFinancial/" + clientId + "/" + params.row.Id
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
                    removeCompany(params.row.Id);
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
          Client Financials
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
            onClick={() => navigate("/addClientFinancial/" + clientId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={clientAccounts}
              columns={CompanyColumns}
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

export default ClientFinancialsList;
