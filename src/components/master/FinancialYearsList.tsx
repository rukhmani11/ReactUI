import { useEffect, useState } from "react";
import { financialYearsService } from "../../services/FinancialYearsService";
import { useNavigate } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { Button, Card, CardContent, IconButton, Stack } from "@mui/material";
import Title from "../helper/Title";
import ConfirmDialog from "../helper/ConfirmDialog";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const FinancialYearsList = () => {
  const [financialYears, setFinancialYears] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({isOpen: false,title: "",subTitle: "",onConfirm: () => {},});
  const navigate = useNavigate();

  useEffect(() => {
    getFinancialYears();
  }, []);

  function getFinancialYears() {
    financialYearsService.getAll().then((response: any) => {
        if (response) {
            let result = response.data;
            if (result.isSuccess) {
              setFinancialYears(result.list);
            } else {
                globalService.error(result.message);
            }
        }
    });
}

  const removeFinancialYear = (Id: any) => {
    
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    financialYearsService.remove(Id).then((response) => {
      
        let result=response.data;
        if (response) {
          globalService.success(result.message);
          getFinancialYears();
        }
      });
  };
  const financialYearColumns: GridColDef[] = [
    { field: "Abbr", headerName: "Abbr", flex: 1 },
    {
      field: "FromDate",
      headerName: "From Date",
      flex: 1,
      //width: 80,
      // minWidth: 100,
      // maxWidth: 150,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
    },
    {
      field: "ToDate",
      headerName: "To Date",
      flex: 1,
     // width: 80,
      // minWidth: 100,
      // maxWidth: 150,
      valueFormatter: (params) =>
        params.value ? dayjs(params.value).format("DD-MMM-YYYY") : "",
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
                navigate("/editFinancialYear/" + params.row.Id)
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
                  title: "Are you sure to delete this Record ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeFinancialYear(params.row.Id);
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
      <Title>Financial Years</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addFinancialYear/")}
          >
            Add Record
          </Button>
          <div className='dvGrid'>
            <DataGrid
              getRowId={(row) => row.Id}
              rows={financialYears}
              columns={financialYearColumns}
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
export default FinancialYearsList;
