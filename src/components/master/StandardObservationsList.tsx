import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { Stack, IconButton, Button, Card, CardContent, Typography } from '@mui/material';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ConfirmDialog from "../helper/ConfirmDialog";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import { globalService } from "../../services/GlobalService";
import Title from '../helper/Title';
import { standardObservationService } from '../../services/StandardObservationService';


const StandardObservationsList  = () => {
  const [standardObservations, setStandardObservations] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })

  const navigate = useNavigate();

  useEffect(() => {
    if (standardObservations.length === 0)
        getstandardObservations();
}, []);
  const getstandardObservations = () => {
    standardObservationService.getAll().then((response: { data: any }) => {
      let result = response.data;
      setStandardObservations(result.list);
    });
  };

const removestandardObservations = (Id: any) => {
    setConfirmDialog({
        ...confirmDialog,
        isOpen: false
    })
    standardObservationService.remove(Id).then((response) => {
        let result = response.data;
        if (result.isSuccess) {
            globalService.success(result.message);
            getstandardObservations();
        }
        else {
            globalService.error(result.message);
        }
    });
}

  const standardObservationsColumns: GridColDef[] = [
    { field: "BusinessSegmentId", headerName: "Business Segment", flex: 1,
    valueGetter: (params) => params.row.BusinessSegment?.Name,},
      { field: "Name", headerName: "Name", flex: 1 },
      { field: "Description", headerName: "Description", flex: 1 },
      { field:"Sequence",headerName:"Sequence",flex:1},
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
                      <IconButton size="small"
                          color="primary"
                          aria-label="add an alarm"
                          onClick={() => navigate("/editStandardObservation/" +params.row.Id)}
                      >
                          <EditIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton size="small" aria-label="delete" color="primary"
                          onClick={() => {

                              setConfirmDialog({
                                  isOpen: true,
                                  title: 'Are you sure you want to delete this Standard Observation ?',
                                  subTitle: "You can't undo this operation",
                                  onConfirm: () => { removestandardObservations(params.row.Id) }
                              })
                          }}>
                          <DeleteIcon fontSize="inherit" />
                      </IconButton>

                  </Stack>
              );
          },
      }
  ];

  return (
      <>
          <Title>Standard Observations</Title>
          <Card>
              <CardContent>
                  <Button
                      variant="contained"
                      startIcon={<AddCircleOutlineIcon />}
                      onClick={() => navigate("/addStandardObservation/")}
                  >
                      Add Record
                  </Button>
                  <div className='dvGrid'>
                      <DataGrid
                          getRowId={(row) => row.Id}
                          rows={standardObservations}
                          columns={standardObservationsColumns}
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
                                      standardObservationsId: false,
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
  )
}

  
export default StandardObservationsList