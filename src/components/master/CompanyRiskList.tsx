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
  CardActions,
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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { companyRiskService } from "../../services/CompanyRiskService";

const CompanyRiskList = () => {
  const { companyId }: any = useParams();
  const [companyRisks, setCompanyRisk] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  useEffect(() => {
    if (companyRisks.length === 0) getCompanyRisk(companyId);
  }, []);

  function getCompanyRisk(companyId: any) {
    
    companyRiskService.getAllByCompanyId(companyId).then((response: any) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setCompanyRisk(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const removeCompanyRisk = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    companyRiskService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getCompanyRisk(companyId);
      } else {
        globalService.error(result.message);
      }
    });
  };

  const navigate = useNavigate();

  const CompanyRiskColumns: GridColDef[] = [
    //{ field: "CompanyRiskId", headerName: "CompanyRiskId", flex: 1 },
    { field: "Name", headerName: "Name", flex: 1.5 },
    { field: "Description", headerName: "Description", flex: 1.5 },
    { field: "Sequence", headerName: "Sequence", flex: 1.5 },
   // { field: "BusinessSegmentId", headerName: "BusinessSegment", flex: 1 }, {
      {field: "BusinessSegmentId",
      headerName: "Business Segment", flex:1.5,
      valueGetter: (params) => params.row.businessSegment?.Name,
  },
    {
      field: "Active",
      headerName: "Active",
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
      width: 100,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              color="primary"
              aria-label="add an alarm"
              onClick={() => navigate("/editCompanyRisk/" + companyId + "/"+ params.row.Id)}
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
                  title: "Are you sure you want to delete this Company Risk ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeCompanyRisk(params.row.Id);
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
      <Title>Company Risk</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addCompanyRisk/" + companyId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
          <DataGrid
                            getRowId={(row) => row.Id}
                            rows={companyRisks}
                            columns={CompanyRiskColumns}
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
                                        //Code: false,
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
                  onClick={() => navigate("/companies"  )}
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

export default CompanyRiskList;
