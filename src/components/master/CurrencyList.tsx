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
import { currencyService } from '../../services/CurrencyService';

const CurrencyList = () => {
    const [currencies, setcurrency] = useState([]);
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '', onConfirm: () => { } })

    const navigate = useNavigate();
    useEffect(() => {
        if (currencies.length === 0)
            getcurrency();
    }, []);

    function getcurrency() {
        currencyService.getAll().then((response: any) => {
            if (response) {
                let result = response.data;
                if (result.isSuccess) {
                    setcurrency(result.list);
                } else {
                    globalService.error(result.message);
                }
            }
        });
    }

    const removecurrency = (Id: any) => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        currencyService.remove(Id).then((response) => {
            let result = response.data;
            if (result.isSuccess) {
                globalService.success(result.message);
                getcurrency();
            }
            else {
                globalService.error(result.message);
            }
        });
    }
    const currencyColumns: GridColDef[] = [
        { field: "Name", headerName: "Name", flex: 1 },
        { field: "Code", headerName: "Code", flex: 1 },
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
                            onClick={() => navigate("/editcurrency/" + params.row.Code)}
                        >
                            <EditIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton size="small" aria-label="delete" color="primary"
                            onClick={() => {

                                setConfirmDialog({
                                    isOpen: true,
                                    title: 'Are you sure you want to delete this Currency?',
                                    subTitle: "You can't undo this operation",
                                    onConfirm: () => { removecurrency(params.row.Code) }
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
            <Title>Currency</Title>
            <Card>
                <CardContent>
                    <Button
                        variant="contained"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => navigate("/addcurrency/")}
                    >
                        Add Record
                    </Button>
                    <div className='dvGrid'>
                        <DataGrid
                            getRowId={(row) => row.Code}
                            rows={currencies}
                            columns={currencyColumns}
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
            </Card>
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default CurrencyList
