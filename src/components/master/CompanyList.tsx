import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { companyService } from "../../services/CompanyService";
import { FolderPath, ROLES, config } from "../../utility/Config";
import { AuthContext } from "../../utility/context/AuthContext";

const CompanyList = () => {
  const { auth } = React.useContext(AuthContext);
  const [companies, setCompanies] = useState([]);
  const [isVisibleCreate, setIsVisibleCreate] = useState(true);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
    onConfirm: () => { },
  });
  useEffect(() => {
    if (companies.length === 0) getCompany();
  }, []);

  function getCompany() {
    companyService.getAll().then((response: any) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setCompanies(result.list);
          // if (result.list.length > 0) {
          //   setIsVisibleCreate(false);
          // }
        } else {
          setIsVisibleCreate(true);
          globalService.error(result.message);
        }
      }
    });
  }

  const activateOrDeActivateCompany = (Id: any) => {
    companyService.activateOrDeActivate(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getCompany();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const removeCompany = (Id: any) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    companyService.remove(Id).then((response) => {
      let result = response.data;
      if (result.isSuccess) {
        globalService.success(result.message);
        getCompany();
      } else {
        globalService.error(result.message);
      }
    });
  };

  const navigate = useNavigate();

  const CompanyColumns: GridColDef[] = [
    { field: "CompanyId", headerName: "CompanyId", flex: 1 },
    {
      field: "Logo", headerName: "Logo", width: 30,
      renderCell: (params) => {
        if (params.row.Logo) {
          return (
            <img
              className="gridImg"
              src={`${config.baseUrl}/${FolderPath.companyLogo}/${params.row.Logo}`}
              loading="lazy"
            />
          );
        }
      }
    },
    { field: "Name", headerName: "Name", width: 200 },
    // { field: "Address", headerName: "Address", width: 200 },
    { field: "Email", headerName: "Email", width: 200 },
    { field: "Website", headerName: "Website", width: 200 },
    /*  //  /* {
    //     field: "ADLoginYn", headerName: "AD Login",
    //     renderCell: (params) => {
    //       return (
    //         <Stack>
    //           {params.row.ADLoginYn && <DoneIcon color="success" />}
    //           {!params.row.ADLoginYn && <CloseIcon color="error" />}
    //         </Stack>
    //       );
    //     }
    //   }/* */

    /* {
      field: "ThemeDarkHexCode",
      headerName: "Theme Dark Hex Code",
      renderCell: (params) => {
        return (
          <div
            style={{
              backgroundColor: params.row.ThemeDarkHexCode,
              padding: 15,
            }}
          >
            {params.row.ThemeDarkHexCode}
          </div>
        );
      },
    },
    {
      field: "ThemeLightHexCode",
      headerName: "Theme Light Hex Code",
      renderCell: (params) => {
        return (
          <div
            style={{
              backgroundColor: params.row.ThemeLightHexCode,
              padding: 15,
            }}
          >
            {params.row.ThemeLightHexCode}
          </div>
        );
      },
    }, */
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
      flex: 1,
      headerName: "Actions",
      width: 350,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={0}>
            <IconButton
              size="small"
              color="primary"
              className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"
                }`}
              aria-label="add an alarm"
              onClick={() => navigate("/editCompany/" + params.row.Id)}
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="small"
              aria-label="delete"
              className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"
                }`}
              color="primary"
              onClick={() => {
                setConfirmDialog({
                  isOpen: true,
                  title: "Are you sure you want to delete this Company ?",
                  subTitle: "You can't undo this operation",
                  onConfirm: () => {
                    removeCompany(params.row.Id);
                  },
                });
              }}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>

            <Button
              className={`btnGrid ${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"
                }`}
              variant="contained"
              color={params.row.Active ? "error" : "success"}
              onClick={() => activateOrDeActivateCompany(params.row.Id)}
            >
              {params.row.Active ? "De-Activate" : "Activate"}
            </Button>

            <Button
              className={`btnGrid ${globalService.roleMatch([ROLES.CompanyDomainUser], auth)
                ? ""
                : "hidden"
                }`}
              variant="contained"
              onClick={() => navigate("/companyRisk/" + params.row.Id)}
            >
              Risk
            </Button>

            <Button
              className={`btnGrid ${globalService.roleMatch([ROLES.CompanyDomainUser], auth)
                ? ""
                : "hidden"
                }`}
              variant="contained"
              onClick={() => navigate("/companyObservation/" + params.row.Id)}
            >
              Observations
            </Button>

            <Button
              className={`btnGrid ${globalService.roleMatch([ROLES.CompanyDomainUser], auth)
                ? ""
                : "hidden"
                }`}
              variant="contained"
              onClick={() => navigate("/companyOpportunity/" + params.row.Id)}
            >
              Opportunities
            </Button>
          </Stack>
        );
      },
    },
  ];

  return (
    <>
      <Title>Company</Title>
      <Card>
        <CardContent>
          {isVisibleCreate && (
            <Button
              variant="contained"
              className={`${globalService.roleMatch([ROLES.SiteAdmin], auth) ? "" : "hidden"
                }`}
              startIcon={<AddCircleOutlineIcon />}
              onClick={() => navigate("/addCompany/")}
            >
              Add Record
            </Button>
          )}
          <div className="dvGrid">
            <DataGrid
              getRowId={(row) => row.Id}
              rows={companies}
              columns={CompanyColumns}
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
                  quickFilterProps: { debounceMs: 200 },
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

export default CompanyList;
