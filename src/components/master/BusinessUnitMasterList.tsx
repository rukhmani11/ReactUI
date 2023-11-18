import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CompanyModel } from "../../models/CompanyModel";
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
import { LocationsModel } from "../../models/LocationsModel";
import { DesignationsModel } from "../../models/DesignationsModel";
import { BusinessUnitModel } from "../../models/BusinessUnitModel";
import { businessUnitService } from "../../services/BusinessUnitService";

const BusinessUnitList = () => {
  const { companyId } = useParams();
  const [businessUnits, setBusinessUnit] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });

  useEffect(() => {
    if (businessUnits.length === 0) getBusinessUnit();
  }, []);
  const navigate = useNavigate();

  function getBusinessUnit() {
    businessUnitService.getAllByCompanyId(companyId).then((response: any) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setBusinessUnit(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const removeBusinessUnit = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    businessUnitService.remove(Id).then((Response) => {
      let result = Response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getBusinessUnit();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const BusinessUnitcoloumns: GridColDef[] = [
    { field: "Name", headerName: "Business Unit", flex: 1 },
    { field: "Code", headerName: "Code" },
    {
      field: "ParentId",
      headerName: "Parent Business Unit",
      flex: 1,
      valueGetter: (params) => params.row.Parent?.Name,
    },
    {
      field: "Active",
      headerName: "Active",

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
                  "/editBusinessUnits/" + companyId + "/" + params.row.Id
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
                  title: "Are you sure to delete this Business Unit ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeBusinessUnit(params.row.Id);
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
      <Title>Business Unit</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addBusinessUnits/" + companyId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={businessUnits}
              columns={BusinessUnitcoloumns}
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
                    CompanyId: false,
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

export default BusinessUnitList;
