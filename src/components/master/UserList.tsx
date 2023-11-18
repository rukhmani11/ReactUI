import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserModel } from "../../models/UserModel";
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
import { userService } from "../../services/UserService";
import { AuthContext } from "../../utility/context/AuthContext";
import { ROLES } from "../../utility/Config";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const { companyId }: any = useParams();
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => {},
  });
  const { auth } = React.useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (users.length === 0) getUsers();
  }, []);

  function getUsers() {
    userService.getByCompanyId(auth.CompanyId).then((response: any) => {
      if (response) {
        
        let result = response.data;
        if (result.isSuccess) {
          setUsers(result.list);
        } else {
          globalService.error(result.message);
        }
      }
    });
  }

  const removeUser = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    userService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getUsers();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const UserColumns: GridColDef[] = [
    { field: "Name", headerName: "Name", flex: 1 },
    // { field: "EmpCode", headerName: "Code", flex: 1 },
    { field: "UserName", headerName: "User Name", flex: 1 },
    { field: "RoleName", headerName: "Role", flex: 1 },
    {
      field: "Designation",
      headerName: "Designation",
      flex: 1,
      valueGetter: (params) => params.row.Designation?.Name,
    },
    // {
    //     field: "Designation", headerName: "Designation", flex: 1,
    //     valueGetter: (params) => params.row.Designation?.Name,
    // },
    { field: "Mobile", headerName: "Mobile", flex: 1 },
    { field: "Email", headerName: "Email", flex: 1 },
    // { field: "Address", headerName: "Address", flex: 1 },
    /*  {
            field: "Location", headerName: "Location", flex: 1,
            //valueFormatter: (params) => params.value ? dayjs(params.value).format('DD-MMM-YYYY') : "",
            valueGetter: (params) => params.row.Location?.Name,
        },
        {
            field: "BusinessUnit", headerName: "Business Unit", flex: 1,
            valueGetter: (params) => params.row.BusinessUnit?.Name,
        },
        {
            field: "ReportingToUser", headerName: "Reporting To", flex: 1,
            valueGetter: (params) => params.row.ReportingToUser?.Name,
        }, */
    {
      field: "Company",
      headerName: "Company",
      flex: 1,
      valueGetter: (params) => params.row.Company?.Name,
    },
    // { field: "VisitingFrequencyInMonth", headerName: "Visiting Frequency In Month", flex: 1 },
    // { field: "ADLoginYN", headerName: "ADLoginY/N", flex: 1 },
    // { field: "MobileIronYN", headerName: "MobileIronY/N", flex: 1 },
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
      // width: 350,
      flex: 1,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              color="primary"
              aria-label="add an alarm"
              onClick={() => navigate("/editUser/" + companyId + "/" + params.row.Id)}
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
                    removeUser(params.row.Id);
                  },
                });
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>

            <Button className='btnGrid'
              variant="contained"
              onClick={() => navigate("/resetPassword/" + params.row.Id,{
                state: {
                    row: params.row
                }
            })}
        >
              Reset Password
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Title>Users</Title>
      <Card>
        <CardContent>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate("/addUser/" + companyId)}
          >
            Add Record
          </Button>
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={users}
              columns={UserColumns}
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
                    Company: globalService.roleMatch([ROLES.SiteAdmin], auth)
                      ? true
                      : false,
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

export default UserList;
