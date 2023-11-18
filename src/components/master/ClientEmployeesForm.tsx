import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import Controls from "../../utility/controls/Controls";
import { BusinessSegmentsModel } from "../../models/BusinessSegmentsModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { SelectListModel } from "../../models/ApiResponse";
import { globalService } from "../../services/GlobalService";
import { ClientEmployeesModel } from "../../models/ClientEmployeesModel";
import { clientEmployeeService } from "../../services/ClientEmployeeService";
import useForm from "../../utility/hooks/UseForm";
import { clientbusinessUnitService } from "../../services/ClientBusinessUnitService";
import { ClientTitleModel } from "../../models/ClientsModel";
import { clientsService } from "../../services/ClientsService";

const ClientEmployeesForm = (props: any) => {
  interface ClientProps {
    callFrom: boolean;
    clientId: string;
  }

  let { clientId, id }: any = useParams();
  const [employeeTypes, setemployeeType] = useState<SelectListModel[]>([]);
  const [title, setTitle] = useState<any>({});

  const getClientTitle = () => {
    let model: ClientTitleModel = {
      ClientId: clientId,
      Name: "",
    };
    clientsService.getPageTitle(model).then((response) => {
      setTitle(response.data);
    });
  };

  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const validate = (fieldValues: ClientEmployeesModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Name is required";
    if ("Mobile" in fieldValues)
      temp.Mobile = fieldValues.Mobile ? "" : "Mobile is required";
    if ("Email" in fieldValues)
      // temp.Email = fieldValues.Email ? "" : "Email is required";
      temp.Email = fieldValues.Email
        ? (temp.Email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(
            fieldValues.Email
          )
            ? ""
            : "Email is not valid.")
        : "Email is required";

    if ("Department" in fieldValues)
      temp.Department = fieldValues.Department ? "" : "Department is required";
    if ("Location" in fieldValues)
      temp.Location = fieldValues.Location ? "" : "Location Type is required";
    if ("ClientBusinessUnitId" in fieldValues)
      temp.ClientBusinessUnitId = fieldValues.ClientBusinessUnitId
        ? ""
        : "Client BusinessUnit is required";
    if ("Designation" in fieldValues)
      temp.Designation = fieldValues.Designation
        ? ""
        : "Designation Type is required";

    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(clientEmployeeService.initialFieldValues, validate, id);

  const newClientEmployeeObservation = () => {
    setValues(clientEmployeeService.initialFieldValues);
  };

  function setFormValue(model: ClientEmployeesModel) {
    let newModel = {
      Id: model.Id,
      ClientBusinessUnitId: model.ClientBusinessUnitId,
      Name: model.Name,
      Mobile: model.Mobile,
      Email: model.Email,
      Department: model.Department,
      Location: model.Location,
      Designation: model.Designation,
    };
    return newModel;
  }

  useEffect(() => {
    if (props.callFrom === "meeting") clientId = props.clientId,  id = undefined;
    if (employeeTypes.length === 0) getSelectListByClientId();
    if (id) {
      if (props.callFrom !== "meeting" ) {
        getClientEmployeeObservation();
        setErrors({}); }
    } else {
      newClientEmployeeObservation();
    }
    getClientTitle();
  }, [id, clientId]);

  const getClientEmployeeObservation = () => {
    clientEmployeeService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };

  const getSelectListByClientId = () => {
    clientbusinessUnitService
      .getSelectListByClientId(clientId)
      .then((response: any) => {
        setemployeeType(response.data);
      });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.ClientId = props.callFrom == "meeting" ? props.clientId : clientId;
      //values.ClientId = clientId;
      debugger
      //callFrom == "meeting" will have only add employee
      if (id && props.callFrom !== "meeting") {
        clientEmployeeService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client Employee edited successfully");
              resetForm();
              navigate(-1);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        clientEmployeeService.post(values).then((response: any) => {
          values.clientId = props.clientId;
          debugger
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client Employee added successfully");
              resetForm();
              if (props.callFrom === "meeting") {
                props.onCloseDialog();
                props.refreshClientEmployees();
               // props.getSelectClientEmployeeByclientId();
              }
              else {
                navigate(-1);
              }
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
      {/* <Title>{mode} Clients Employees</Title> */}
      <Stack direction="row" spacing={0} justifyContent="space-between">
        <Typography variant="h5" align="center">
          Client Employees
        </Typography>

        <Typography variant="body1">
          <b>Client Name : </b>
          {title.Name}{" "}
        </Typography>
      </Stack>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      name="ClientBusinessUnitId"
                      showEmptyItem={false}
                      label="Client Business Unit*"
                      required
                      options={employeeTypes}
                      value={
                        employeeTypes.length > 0
                          ? values.ClientBusinessUnitId
                          : ""
                      }
                      onChange={handleInputChange}
                      error={errors.ClientBusinessUnitId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Name"
                      name="Name"
                      value={values.Name}
                      onChange={handleInputChange}
                      error={errors.Name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Mobile"
                      name="Mobile"
                      value={values.Mobile}
                      onChange={handleInputChange}
                      error={errors.Mobile}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Email"
                      name="Email"
                      value={values.Email}
                      onChange={handleInputChange}
                      error={errors.Email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      label="Department"
                      name="Department"
                      value={values.Department}
                      onChange={handleInputChange}
                      error={errors.Department}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Location"
                      name="Location"
                      value={values.Location}
                      onChange={handleInputChange}
                      error={errors.Location}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Designation"
                      name="Designation"
                      value={values.Designation}
                      onChange={handleInputChange}
                      error={errors.Designation}
                    />
                  </Grid>
                </Grid>
              </React.Fragment>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2} direction="row">
              {props.callFrom !== "meeting" ? ( 
              <Button
                  type="submit"
                  variant="contained"
                 
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
                ):( <Button
                  type="submit"
                  variant="contained"
                  // onClick={() => ClientProps(false)}
                  // onClick={handleSubmit
                  // }
                  onClick={() => {
                    handleSubmit;
                    props.refreshClientEmployees(); // Call the refresh function here
                  }}
                  
                >
                  Submit
                </Button>)}
                {props.callFrom !== "meeting" ? (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                  >
                    Back To List
                  </Button>
                ) : (
                  <Button
                    variant="outlined"
                    startIcon={<ArrowBackIcon />}
                    onClick={() => props.onCloseDialog()}
                  >
                    Close
                  </Button>
                )}
              </Stack>
            </CardActions>
          </Card>
        </form>
      </>
    </div>
  );
};

export default ClientEmployeesForm;
