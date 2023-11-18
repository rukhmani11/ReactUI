import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { ClientsModel } from "../../models/ClientsModel";
import { clientsService } from "../../services/ClientsService";

const ClientsList = () => {
  const { companyId }: any = useParams();
  const [clients, setClients] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const navigate = useNavigate();
  useEffect(() => {
    if (clients.length === 0) getclients();
  }, []);

  function getclients() {
    clientsService.getAllByCompanyId(companyId).then((response: any) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setClients(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }
  const removeclient = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    clientsService.remove(Id).then((Response) => {
      let result = Response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getclients();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const ClientsColumns: GridColDef[] = [
    {
      field: "GroupName",
      headerName: "Group",
      flex: 1,
      valueGetter: (params) => params.row.ClientGroup?.GroupName,
    },
    {
      field: "GroupCIFNo",
      headerName: "Group CIF No",
      flex: 1,
      valueGetter: (params) => params.row.ClientGroup?.GroupCIFNo,
    },
    { field: "Name", headerName: "Client Name", flex: 1 },
    { field: "CIFNo", headerName: "CIF No", flex: 1 },
    {
      field: "VisitingFrequencyInMonth",
      headerName: "Visiting Frequency In Month",
      flex: 1,
    },
    {
      field: "Active",
      headerName: "Active",
      width: 100,
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
      width: 400,

      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              color="primary"
              aria-label="add an alarm"
              onClick={() =>
                navigate("/editClient/" + companyId + "/" + params.row.Id)
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
                  title: "Are you sure you want to delete this Clients ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeclient(params.row.Id);
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
                navigate("/clientAccount/" + params.row.Id, {
                  state: {
                    row: params.row,
                  },
                })
              }
            >
              Account
            </Button>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate("/clientFinancials/" + params.row.Id, {
                  state: {
                    row: params.row,
                  },
                })
              }
            >
              Financial
            </Button>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate("/clientBusinessUnits/" + params.row.Id, {
                  state: {
                    row: params.row,
                  },
                })
              }
            >
              Business Unit
            </Button>
            <Button
              className="btnGrid"
              variant="contained"
              onClick={() =>
                navigate("/clientEmployee/" + params.row.Id, {
                  state: {
                    row: params.row,
                  },
                })
              }
            >
              Employees
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Title>Clients</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addClient/" + companyId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={clients}
              columns={ClientsColumns}
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
      </Card>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
};

export default ClientsList;
