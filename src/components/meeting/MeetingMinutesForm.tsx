import React, { useContext, useEffect, useState } from "react";
import Title from "../helper/Title";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
  Stack,
  TextField,
  InputLabel,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  DialogProps,
  Divider,
} from "@mui/material";
import Controls from "../../utility/controls/Controls";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import SearchIcon from "@mui/icons-material/Search";
import useForm from "../../utility/hooks/UseForm";
import {
  MultiSelectListModel,
  SelectListModel,
} from "../../models/ApiResponse";

import { clientEmployeeService } from "../../services/ClientEmployeeService";
import { userService } from "../../services/UserService";
import { MeetingService } from "../../services/MeetingService";
import { clientsService } from "../../services/ClientsService";
import { MeetingModel } from "../../models/MeetingModel";
import { AuthContext } from "../../utility/context/AuthContext";
import { clientGroupService } from "../../services/ClientGroupService";
import { ClientsModel } from "../../models/ClientsModel";
import { ClientEmployeesModel } from "../../models/ClientEmployeesModel";
import CloseIcon from "@mui/icons-material/Close";
import ClientEmployeesForm from "../master/ClientEmployeesForm";

const MeetingMinutesForm  = () => {
  const { auth } = useContext(AuthContext);
  const { id, companyId, clientId }: any = useParams();
  const [maxWidth, setMaxWidth] = React.useState<DialogProps["maxWidth"]>("md");
  const [clients, setClient] = useState<SelectListModel[]>([]);
  const [clientGroups, setClientGroups] = useState<SelectListModel[]>([]);
  const [companyUsers, setCompanyUser] = useState<SelectListModel[]>([]);
  const [clientEmployeesMultiSelect, setClientEmployeeMultiSelect] = useState<
    MultiSelectListModel[]
  >([]);
  const [clientEmployee, setClientEmployees] = useState<SelectListModel[]>([]);
  const [ClientModel, setClientModel] = useState<ClientsModel>(null);
  const [ClientEmployeeModel, setClientEmployeeModel] =
    useState<ClientEmployeesModel>(null);
  const [selectedClientEmployees, setSelectedClientEmployees] = useState([]);
  const [users, setUser] = useState<MultiSelectListModel[]>([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const mode = id ? "Edit" : "Create";
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    //getclientEmployeeMultiple();
  };

  let navigate = useNavigate();
  useEffect(() => {
    if (clients.length === 0) getClient();
    if (clientGroups.length === 0) getClientGroups();
    if (users.length === 0) getUser();
    if (companyUsers.length === 0) getCompanyUser();
    //getSelectClientEmployeeByclientId(clientId);
    if (id) {
      getMeetingById();
      setErrors({});
    } else newmeeting();
  }, [id]);

  const validate = (fieldValues: MeetingModel = values) => {
    let temp: any = { ...errors };
    // if ("ClientId" in fieldValues)
    //   temp.ClientId = fieldValues.ClientId ? "" : "Client is required";
    // if ("CIFNo" in fieldValues)
    //   temp.CIFNo = fieldValues.CIFNo ? "" : "CIF No is required";
    // if ("ScheduledOn" in fieldValues)
    //   temp.ScheduledOn = fieldValues.ScheduledOn
    //     ? ""
    //     : "Scheduled On is required";
    // if ("CompanyUserId" in fieldValues)
    //   temp.CompanyUserId = fieldValues.CompanyUserId
    //     ? ""
    //     : "Company User is required";
    // if ("MeetingPurpose" in fieldValues)
    //   temp.MeetingPurpose = fieldValues.MeetingPurpose
    //     ? ""
    //     : "Meeting Purpose is required";
    // if ("Agenda" in fieldValues)
    //   temp.Agenda = fieldValues.Agenda ? "" : "Agenda is required";
    // if ("MeetingPurpose" in fieldValues)
    //   temp.MeetingPurpose = fieldValues.MeetingPurpose
    //     ? ""
    //     : "Meeting Purpose is required";
    // if ("ClientEmployeeId" in fieldValues)
    //   temp.ClientEmployeeId = fieldValues.ClientEmployeeId
    //     ? ""
    //     : "Client Employee is required";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(MeetingService.initialFieldValues, validate, id);

  const newmeeting = () => {
    setValues(MeetingService.initialFieldValues);
  };

  function setFormValue(model: MeetingModel) {
    let newModel = {
      Id: model.Id,
      VisitedCompanyUserId: model.VisitedCompanyUserId,
      VisitedClientEmployeeId: model.VisitedClientEmployeeId,
      CompanyId: model.CompanyId,
      ClientId: model.ClientId,
      CompanyUserId: model.CompanyUserId,
      ScheduledOn: model.ScheduledOn
        ? globalService.convertLocalToUTCDate(new Date(model.ScheduledOn), true)
        : null,
      SrNo: model.SrNo,
      MeetingNo: model.MeetingNo || "",
      ClientEmployeeId: model.ClientEmployeeId || "",
      ClientBusinessUnitId: model.ClientBusinessUnitId,
      MeetingPurpose: model.MeetingPurpose || "",
      Agenda: model.Agenda,
      VisitedOn: model.VisitedOn  ? globalService.convertLocalToUTCDate(new Date(model.ScheduledOn), true)
      : null,
      VisitSummary: model.VisitSummary || "",
      CIFNo: model.CIFNo || "",
      GroupName: model.GroupName || "",
      GroupCIFNo: model.GroupCIFNo || "",
      MeetingCompanyAttendeesIds:
        mode === "Edit"
          ? model.MeetingCompanyAttendeesIds.toString()
          : model.MeetingCompanyAttendeesIds,
      SelectedMeetingCompanyAttendees: model.SelectedMeetingCompanyAttendees,
      MeetingClientAttendeesIds:
        mode === "Edit"
          ? model.MeetingClientAttendeesIds.toString()
          : model.MeetingClientAttendeesIds,
      SelectedMeetingClientAttendees: model.SelectedMeetingClientAttendees,
    };
    if (mode === "Edit") {
      setSelectedClientEmployees(model.SelectedMeetingClientAttendees);
      setSelectedUsers(model.SelectedMeetingCompanyAttendees);
    }
    return newModel;
  }
  const OnChangeClientEmployee = (id: any) => {
    clientEmployeeService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setValues((prevState: any) => ({
            ...prevState,
            ClientBusinessUnitId: result.data.ClientBusinessUnitId || "",
          }));
          setClientEmployeeModel(null);
        }
      }
    });
  };

  const getUser = () => {
    userService.getSelectList().then((response) => {
      let a: MultiSelectListModel[] = [];
      response.data.forEach((x: SelectListModel) => {
        a.push({ label: x.Text, value: x.Value });
      });
      setUser(a);
    });
  };

  const getClient = () => {
    clientsService.getSelectList().then((response: any) => {
      setClient(response.data);
    });
  };

  const getCompanyUser = () => {
    userService.getSelectList().then((response: any) => {
      setCompanyUser(response.data);
    });
  };

  const getSelectClientEmployeeByclientId = (clientId: any) => {
    if (clientId) {
      clientEmployeeService
      .getSelectClientEmployeeByclientId(clientId)
      .then((response) => {
          //for singleSelect
          setClientEmployees(response.data);
          //for multiselect
          let list: MultiSelectListModel[] = [];
          response.data.forEach((x: SelectListModel) => {
            list.push({ label: x.Text, value: x.Value });
          });
          setClientEmployeeMultiSelect(list);
         
        });
    }
  };
  const getClientGroups = () => {
    clientGroupService
      .getSelectListByCompanyId(auth.CompanyId)
      .then((response: any) => {
        setClientGroups(response.data);
      });
  };
  const refreshClientEmployees = () => {    getSelectClientEmployeeByclientId(values.ClientId); };
  
  const getMeetingById = () => {
    MeetingService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        debugger
        if (result.data) {
          getSelectClientEmployeeByclientId(result.data.ClientId);
          result.data.GroupName = result.data.Client.ClientGroup?.GroupName;
          result.data.GroupCIFNo = result.data.Client.ClientGroup?.GroupCIFNo;
          result.data.ClientEmployeeId = result.data.ClientEmployeeId;
          result.data.CIFNo = result.data.Client.CIFNo;
          result.data.MeetingClientAttendeesIds =
            result.data.MeetingClientAttendeesIds;
          result.data.MeetingCompanyAttendeesIds =
            result.data.MeetingCompanyAttendeesIds;
          setValues(setFormValue(result.data));
        }
      }
    });
  };
  const OnChangeClient = (id: any) => {
    clientsService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setValues((prevState: any) => ({
            ...prevState,
            CIFNo: result.data.CIFNo || "",
            ClientGroupId: result.data.ClientGroupId || "",
            GroupCIFNo: result.data.ClientGroup?.GroupCIFNo || "",
            GroupName: result.data.ClientGroup?.GroupName || "",
            ClientId: result.data.Id || "",
          }));
          setClientModel(null);
        }
      }
    });
  };

  const OnChangeClientCIFNo = (CIFNo: any) => {
    clientsService.getClientbyIdCIF(CIFNo).then((response) => {
      if (response) {
        let result = response.data;
        if (result.isSuccess) {
          setValues((prevState: any) => ({
            ...prevState,
            ClientGroupId: result.data.ClientGroupId || "",
            GroupCIFNo: result.data.ClientGroup?.GroupCIFNo || "",
            GroupName: result.data.ClientGroup?.GroupName || "",
            ClientId: result.data.Id || "",
          }));
          setClientModel(null);
        }
      }
    });
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.CompanyId = auth.CompanyId;
      if (
        values.MeetingClientAttendeesIds &&
        typeof values.MeetingClientAttendeesIds === "string"
      ) {
        values.MeetingClientAttendeesIds =
          values.MeetingClientAttendeesIds.split(",");
      }
      if (
        values.MeetingCompanyAttendeesIds &&
        typeof values.MeetingCompanyAttendeesIds === "string"
      ) {
        values.MeetingCompanyAttendeesIds =
          values.MeetingCompanyAttendeesIds.split(",");
      }

      if (id) {
        MeetingService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Meeting edited successfully.");
              resetForm();
              navigate("/meetings/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        MeetingService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("meeting added successfully.");
              resetForm();
              navigate("/meetings/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      }
    }
  };
  return (
    <div>
      <Title> Meeting Minutes </Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          
          <Card>
            <CardContent sx={{ height: "950px" }} >
              <React.Fragment>
                <Grid container spacing={3} >
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      required
                      // Input="Text"
                      name="ClientId"
                      label="Client*"
                      disabled
                      showEmptyItem={false}
                      value={clients.length > 0 ? values.ClientId : ""}
                      onChange={(e: any) => {
                        handleInputChange(e);
                        OnChangeClient(e.target.value);
                        getSelectClientEmployeeByclientId(e.target.value);
                        
                      }}
                      options={clients}
                      error={errors.ClientId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      // from client table
                      label="CIF No"
                      required
                      name="CIFNo"
                      disabled
                      value={values.CIFNo}
                      onChange={handleInputChange}
                      error={errors.CIFNo}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => {
                                OnChangeClientCIFNo(values.CIFNo);
                              }}
                            >
                              <SearchIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="GroupName"
                      label="Client Group"
                      disabled
                      // options={ClientGroupName}
                      value={values.GroupName}
                      onChange={handleInputChange}
                      error={errors.GroupName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      // from ClientGroup table
                      label="Group CIF No"
                      name="GroupCIFNo"
                      required
                      disabled
                      value={values.GroupCIFNo}
                      onChange={handleInputChange}
                      error={errors.GroupCIFNo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Meeting Purpose"
                      name="MeetingPurpose"
                      multiline
                      rows="3"
                      disabled
                      value={values.MeetingPurpose}
                      onChange={handleInputChange}
                      error={errors.MeetingPurpose}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      label="Agenda"
                      required
                      name="Agenda"
                      multiline
                      disabled
                      rows="5"
                      value={values.Agenda}
                      onChange={handleInputChange}
                      error={errors.Agenda}
                    />
                  </Grid>
                </Grid>
                <Divider variant="middle" style={{ margin: '20px 0' }} />
                <CardContent sx={{ height: "500px" }}>
               
                <Grid container spacing={3} >
                <Grid item xs={12} sm={4}>
                    <Controls.ReactDatePicker
                      minDate={new Date()}
                      label="Visited On"
                      required
                      name="VisitedOn"
                      value={values.VisitedOn}
                      onChange={(date: Date) =>
                        handleInputChange({
                          target: {
                            value: date, //globalService.convertLocalToUTCDate(date, true),
                            name: "VisitedOn",
                          },
                        })
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      // timeIntervals={15}
                      dateFormat="d MMM yyyy h:mm aa"
                      error={errors.VisitedOn}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      required
                      name="VisitedCompanyUserId"
                      label="Visited Co. User*"
                      options={companyUsers}
                      value={
                        companyUsers.length > 0 ? values.VisitedCompanyUserId : ""
                      }
                      onChange={handleInputChange}
                      error={errors.VisitedCompanyUserId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Visit Summary"
                      name="VisitSummary"
                      multiline
                      rows="3"
                      value={values.VisitSummary}
                      onChange={handleInputChange}
                      error={errors.VisitSummary}
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      required
                      showEmptyItem={false}
                      name="VisitedClientEmployeeId"
                      label=" Visited Client Employee *"
                      options={clientEmployee}
                      value={
                        clientEmployee.length > 0 ? values.VisitedClientEmployeeId : ""
                      }
                      onChange={(e: any) => {
                        OnChangeClientEmployee(e.target.value);
                        handleInputChange(e);
                      }}
                      error={errors.VisitedClientEmployeeId}
                    />
                  </Grid>

                  <Grid item  xs={12} sm={12} >
                      <Divider />
                    </Grid>

                 <Box marginLeft={3} height={320} width={400} marginTop={1} border={0.5} padding={2} alignItems={"center"}>

                    <Grid item  xs={12} sm={6}  marginBottom={1}>
                       <Typography className="label"  width={350} textAlign={"center"} bgcolor={"lightgrey"}> Extra Attendees </Typography>
                    </Grid>

                    <Button
                    variant="contained"
                    disabled={!values.ClientId}
                    style={{ height: "30px", margin: "20px", marginLeft:"2px", marginTop: "1px" ,alignItems: "left" }}
                    onClick={handleOpen}
                  >
                    Add Other  Employees
                  </Button>
                 
                  <Grid item xs={12} sm={15} marginBottom={2}>
                    <Controls.MultiSelect
                      options={clientEmployeesMultiSelect}
                      name="MeetingClientAttendeesIds"
                      value={selectedClientEmployees}
                      onChange={(e: any[]) => {
                        setSelectedClientEmployees(e);
                        handleInputChange({
                          target: {
                            value: e.map((x: any) => x.value).join(","),
                            name: "MeetingClientAttendeesIds",
                          },
                        });
                      }}
                      labelledBy="Select clientEmployees"
                      error={errors.MeetingClientAttendeesIds}
                      // style={{ height: '300px' }}
                    />
                    <InputLabel>Select  Visited Client Employee </InputLabel>
                  </Grid>

                  <Grid item xs={12} sm={15}>
                    <Controls.MultiSelect
                      options={users}
                      name="MeetingCompanyAttendeesIds"
                      value={selectedUsers}
                      onChange={(e: any[]) => {
                        setSelectedUsers(e);
                        handleInputChange({
                          target: {
                            value: e.map((x: any) => x.value).join(","),
                            name: "MeetingCompanyAttendeesIds",
                          },
                        });
                      }}
                      labelledBy="Select Visited  Company User"
                      error={errors.MeetingCompanyAttendeesIds}
                    />
                    <InputLabel>Select Visited Company Users </InputLabel>
                  </Grid>

                </Box>
                </Grid>
               </CardContent>
              </React.Fragment>
            </CardContent>
            </Card>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/meetings/" + companyId)}
                >
                  Back To List
                </Button>
              </Stack>
            </CardActions>
          
        </form>
      </>
      <Dialog
        fullWidth={true}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme: any) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Box>
            <ClientEmployeesForm
              callFrom={"meeting"}
              clientId={values.ClientId}
              onCloseDialog={handleClose}
              refreshClientEmployees={refreshClientEmployees}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default MeetingMinutesForm ;
