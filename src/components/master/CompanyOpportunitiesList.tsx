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
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { globalService } from "../../services/GlobalService";
import Title from "../helper/Title";
import { companyService } from "../../services/CompanyService";
import { companyOpportunityService } from "../../services/CompanyOpportunityService";

const CompanyOpportunityList = () => {
  const { companyId }: any = useParams();
  const [companyOpportunity, setcompanyOpportunity] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  useEffect(() => {
    if (companyOpportunity.length === 0) getCompanyOpportunity(companyId);
  }, []);

  function getCompanyOpportunity(companyId: any) {
    
    companyOpportunityService.getAllByCompanyId(companyId).then((response: any) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setcompanyOpportunity(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const removeCompanyOpportunity = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    companyOpportunityService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getCompanyOpportunity(companyId);
      } else {
        globalService.error(result.message);
      }
    });
  };

  const navigate = useNavigate();

  const CompanyOpportunityColumns: GridColDef[] = [
    { field: "Name", headerName: "Name", flex: 1.5 },
    { field: "Description", headerName: "Description", flex: 1.5 },
    { field: "Sequence", headerName: "Sequence", flex: 1.5 },
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
              onClick={() => navigate("/editCompanyOpportunity/" + companyId + "/"+ params.row.Id)}
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
                  title: "Are you sure you want to delete this Company oppurtunity ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeCompanyOpportunity(params.row.Id);
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
      <Title>Company Opportunity</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addCompanyOpportunity/" + companyId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
          <DataGrid
                            getRowId={(row) => row.Id}
                            rows={companyOpportunity}
                            columns={CompanyOpportunityColumns}
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

export default CompanyOpportunityList;
