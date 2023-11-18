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
// import RequireAuth from './RequireAuth';
// import { ROLES } from './Config';
// import UnAuthorized from '../components/helper/UnAuthorized';
import { BusinessSegmentsModel } from "../../models/BusinessSegmentsModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { SelectListModel } from "../../models/ApiResponse";
import { globalService } from "../../services/GlobalService";
import { UserModel } from "../../models/UserModel";
import { userService } from "../../services/UserService";
import { companyService } from "../../services/CompanyService";
import { businessUnitService } from "../../services/BusinessUnitService";
import { locationService } from "../../services/LocationService";
import useForm from "../../utility/hooks/UseForm";
import { roleService } from "../../services/RoleService";
import { AuthContext } from "../../utility/context/AuthContext";
import { designationsService } from "../../services/DesignationService";
import { ROLES } from "../../utility/Config";

const UserForm = () => {
  const { id }: any = useParams();
  let navigate = useNavigate();
  const { companyId }: any = useParams();

  const [roles, setRoles] = useState<SelectListModel[]>([]);
  const [locations, setLocations] = useState<SelectListModel[]>([]);
  const [businessUnits, setBusinessUnits] = useState<SelectListModel[]>([]);
  const [designations, setDesignations] = useState<SelectListModel[]>([]);
  const [companies, setCompanies] = useState<SelectListModel[]>([]);
  // const [companies, setCompanies] = useState<SelectListModel[]>([]);
  const [reportingToUsers, setReportingToUsers] = useState<SelectListModel[]>(
    []
  );
  const { auth } = React.useContext(AuthContext);
  const mode = id ? "Edit" : "Create";

  useEffect(() => {
    if (roles.length === 0) getRoles();

    if (businessUnits.length === 0) getBusinessUnits();

    if (companies.length === 0) getCompanies();

    if (designations.length === 0) getDesignations();

    if (locations.length === 0) getLocations();

    if (reportingToUsers.length === 0) getReportingToUsers();
    if (id) {
      getUser(id);
      setErrors({});
    } else {
      newUser();
      setErrors({});
    }
  }, [id]);

  const validate = (fieldValues: UserModel = values) => {
    let temp: any = { ...errors };

    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : " Full Name is required.";
    //   if (globalService.roleMatch([ROLES.SiteAdmin], auth)) {
    // if ("CompanyId" in fieldValues)
    //   temp.CompanyId = fieldValues.CompanyId ? "" : " Company is required.";
    //   }
    if ("Mobile" in fieldValues)
      temp.Mobile = fieldValues.Mobile ? "" : "Mobile Number is required.";
    if ("RoleId" in fieldValues)
      temp.RoleId = fieldValues.RoleId ? "" : "Role is required.";
    if (mode === "Create") {
      if ("Password" in fieldValues)
        temp.Password = fieldValues.Password
          ? values.ConfirmPassword !== fieldValues.Password
            ? ""
            : ""
          : "Password is required.";
      if ("ConfirmPassword" in fieldValues) {
        temp.ConfirmPassword = fieldValues.ConfirmPassword
          ? values.Password !== fieldValues.ConfirmPassword
            ? "Password and Confirm Password doesn't match."
            : ""
          : "Confirm Password is required.";
      }
    }
    if ("UserName" in fieldValues)
      temp.UserName = fieldValues.UserName ? "" : "UserName is required.";
    if ("Email" in fieldValues) {
      temp.Email = fieldValues.Email
        ? (temp.Email = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(
            fieldValues.Email
          )
            ? ""
            : "Email is not valid.")
        : "Email is required";
    }
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(userService.initialFieldValues, validate, id);

  const newUser = () => {
    setValues(userService.initialFieldValues);
  };

  //This is used since in get the null property is not returned
  function setFormValue(model: UserModel) {
    let newModel = {
      Id: model.Id,
      Name: model.Name,
      Email: model.Email,
      Mobile: model.Mobile,
      UserName: model.UserName,
      RoleId: model.RoleId || "",
      Password: model.Password || "",
      ConfirmPassword: model.ConfirmPassword || "",
      Active: model.Active,
      BusinessUnitId: model.BusinessUnitId || "",
      CompanyId: model.CompanyId,
      DesignationId: model.DesignationId || "",
      EmpCode: model.EmpCode || "",
      LocationId: model.LocationId || "",
      ReportingToUserId: model.ReportingToUserId || "",
    };
    return newModel;
  }

  const getUser = (id: any) => {
    userService.get(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.row));
      }
    });
  };

  const getReportingToUsers = () => {
    userService.getReportingUserSelectList(id).then((response) => {
      if (response) {
        setReportingToUsers(response.data);
      }
    });
  };

  const getCompanies = () => {
    companyService.getSelectList().then((response) => {
      setCompanies(response.data);
    });
  };

  const getDesignations = () => {
    designationsService.getSelectList().then((response) => {
      setDesignations(response.data);
    });
  };

  const getBusinessUnits = () => {
    businessUnitService.getSelectList().then((response) => {
      setBusinessUnits(response.data);
    });
  };

  const getLocations = () => {
    locationService.getSelectList().then((response) => {
      setLocations(response.data);
    });
  };
  const getRoles = () => {
    roleService.getSelectList().then((response) => {
      if (response) {
        // let list: any[] = [];
        // //since register api need text
        // response.data.map((x: any) => {
        //   if (x.Text !== ROLES.Subscriber)
        //     list.push({ Text: x.Text, Value: x.Text });
        // });

        setRoles(response.data);
        if (globalService.roleMatch([ROLES.SiteAdmin], auth)){
          if (response.data.length > 0)
           values.RoleId = response.data[1].Value;
         }
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.companyId = auth.CompanyId;
      if (id) {
        userService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("User edited successfully.");
              resetForm();
              navigate("/users/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        userService.post(values).then((response: any) => {

          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("User added successfully.");
              resetForm();
              navigate("/users/" + companyId);
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
      <Title>{mode} User</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="Name"
                      label="Full Name"
                      value={values.Name}
                      onChange={handleInputChange}
                      error={errors.Name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      label="Employee Code"
                      name="EmpCode"
                      value={values.EmpCode}
                      onChange={handleInputChange}
                      error={errors.EmpCode}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="User Name"
                      name="UserName"
                      value={values.UserName}
                      onChange={handleInputChange}
                      error={errors.UserName}
                    />
                  </Grid>

                   <Grid item xs={12} sm={4}>
                    <Controls.Select
                      showEmptyItem={false}
                      name="RoleId"
                      label="Role*"
                      disabled = {globalService.roleMatch([ROLES.SiteAdmin], auth)}
                      value={roles.length > 0 ? values.RoleId : ""}
                      onChange={handleInputChange}
                      options={roles}
                      error={errors.RoleId}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Mobile"
                      name="Mobile"
                      type="number"
                      value={values.Mobile}
                      onChange={handleInputChange}
                      error={errors.Mobile}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="Email"
                      label="Email"
                      value={values.Email}
                      onChange={handleInputChange}
                      error={errors.Email}
                    />
                  </Grid>

                  {globalService.roleMatch([ROLES.CompanyAdmin], auth) && (
                    <Grid item xs={12} sm={4}>
                      <Controls.Select
                        name="LocationId"
                        label="Location*"
                        value={locations.length > 0 ? values.LocationId : ""}
                        onChange={handleInputChange}
                        options={locations}
                        error={errors.LocationId}
                      />
                    </Grid>
                  )}
                  {globalService.roleMatch([ROLES.CompanyAdmin], auth) && (
                    <Grid item xs={12} sm={4}>
                      <Controls.Select
                        name="DesignationId"
                        label="Designation*"
                        required
                        options={designations}
                        value={
                          designations.length > 0 ? values.DesignationId : ""
                        }
                        onChange={handleInputChange}
                        error={errors.DesignationId}
                      />
                    </Grid>
                  )}
                  {globalService.roleMatch([ROLES.CompanyAdmin], auth) && (
                    <Grid item xs={12} sm={4}>
                      <Controls.Select
                        name="BusinessUnitId"
                        label="Business Unit*"
                        required
                        options={businessUnits}
                        value={
                          businessUnits.length > 0 ? values.BusinessUnitId : ""
                        }
                        onChange={handleInputChange}
                        error={errors.BusinessUnitId}
                      />
                    </Grid>
                  )}
                  {globalService.roleMatch([ROLES.CompanyAdmin], auth) && (
                    <Grid item xs={12} sm={4}>
                      <Controls.Select
                        name="ReportingToUserId"
                        label="Reporting To User*"
                        required
                        options={reportingToUsers}
                        value={
                          reportingToUsers.length > 0
                            ? values.ReportingToUserId
                            : ""
                        }
                        onChange={handleInputChange}
                        error={errors.ReportingToUserId}
                      />
                    </Grid>
                  )}

                  <Grid item xs={12} sm={4} className={id ? "hidden" : ""}>
                    <Controls.Input
                      name="Password"
                      required
                      label="Password"
                      type="password"
                      value={values.Password}
                      onChange={handleInputChange}
                      error={errors.Password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} className={id ? "hidden" : ""}>
                    <Controls.Input
                      name="ConfirmPassword"
                      required
                      label="Confirm Password"
                      className={id ? "hidden" : ""}
                      type="password"
                      value={values.ConfirmPassword}
                      onChange={handleInputChange}
                      error={errors.ConfirmPassword}
                    />
                  </Grid>
                  {/* {globalService.roleMatch([ROLES.SiteAdmin], auth) && (
                    <Grid item xs={12} sm={4} >
                      <Controls.Select
                        name="CompanyId"
                        label="Company*"
                        required
                        options={companies}
                        value={companies.length > 0 ? values.CompanyId : ""}
                        onChange={handleInputChange}
                        error={errors.CompanyId}
                      />
                    </Grid>
                  )}  */}
                  {/* <Grid item xs={12} sm={4} className={ROLES.SiteAdmin ? "hidden" : ""}>
                      <Controls.Select
                        name="CompanyId"
                        label="Company*"
                        required
                        options={companies}
                        value={companies.length > 0 ? values.CompanyId : ""}
                        onChange={handleInputChange}
                        error={errors.CompanyId}
                      />
                    </Grid> */}
                </Grid>
                <Grid item xs={12} sm={4}  className={mode !== "Edit" ? "hidden" : ""}>
                                        <Controls.Checkbox

                                            label="Active"
                                            name="Active"
                                           value={values.Active}
                                           onChange={handleInputChange}
                                            error={errors.Active}
                                        />
                                    </Grid>
              </React.Fragment>
            </CardContent>
            <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/users/" + companyId)}
                >
                  Back To List
                </Button>
              </Stack>
            </CardActions>
          </Card>
        </form>
      </>
    </div>
  );
};

export default UserForm;
