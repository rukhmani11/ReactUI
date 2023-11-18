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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import { UserModel } from "../../models/UserModel";
import { userService } from "../../services/UserService";
import useForm from "../../utility/hooks/UseForm";
import { AuthContext } from "../../utility/context/AuthContext";

const ResetPasswordForm = () => {
  const { id ,companyId}: any = useParams();
  let navigate = useNavigate();
  const prevPgState = useLocation();
  const { auth } = React.useContext(AuthContext);

  useEffect(() => {
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
     if ("Password" in fieldValues)
        temp.Password = fieldValues.Password ? "" : "Password is required.";
      
      if ("ConfirmPassword" in fieldValues) 
        temp.ConfirmPassword = fieldValues.ConfirmPassword ? "" : "Confirm Password is required.";
        
      if (("Password" in fieldValues) || ("ConfirmPassword" in fieldValues)) {
        if (fieldValues.ConfirmPassword)
          temp.Password = (values.Password !== fieldValues.ConfirmPassword) ? "Password and ConfirmPassword doesn't match." : "";
        else
          temp.Password = (values.ConfirmPassword !== fieldValues.Password) ? "Password and ConfirmPassword doesn't match." : "";
      }
    // if ("Password" in fieldValues)
    //   temp.Password = fieldValues.Password
    //     ? values.ConfirmPassword !== fieldValues.Password
    //       ? "New Password and Confirm Password doesn't match."
    //       : ""
    //     : "Password is required.";
    // if ("Confirm Password" in fieldValues) {
    //   temp.ConfirmPassword = fieldValues.ConfirmPassword
    //     ? values.Password !== fieldValues.ConfirmPassword
    //       ? "Password and Confirm Password doesn't match."
    //       : ""
    //     : "Confirm Password is required.";
    // }
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
      RoleId: model.RoleId,
      Password: model.Password,
      ConfirmPassword: model.ConfirmPassword || "",
      Active: model.Active,
      BusinessUnitId: model.BusinessUnitId || "",
      CompanyId: model.CompanyId,
      DesignationId: model.DesignationId,
      EmpCode: model.EmpCode,
      LocationId: model.LocationId,
      ReportingToUserId: model.ReportingToUserId,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        userService.ChangePassword(values).then((response: any) => {

          let result = response.data;
          if (response) {
            globalService.success(result.message);
            resetForm();
              navigate(-1);
          } else {
            globalService.error(result.message);
          }
        });
      }
    }
  };
  return (
    <div>
        <Stack direction="row" spacing={0} justifyContent="space-between">
<Typography variant="h5" align="center">
Password Reset Form
</Typography>
{(prevPgState && prevPgState.state && prevPgState.state.row) &&
  <Typography variant="body1"><b>User Name: </b>{prevPgState.state.row.Name}  </Typography>
}
</Stack>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      name="Password"
                      required
                      label="New Password"
                      type="password"
                      value={values.Password}
                      onChange={handleInputChange}
                      error={errors.Password}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      name="ConfirmPassword"
                      required
                      label="Confirm Password"
                      type="password"
                      value={values.ConfirmPassword}
                      onChange={handleInputChange}
                      error={errors.ConfirmPassword}
                    />
                  </Grid>
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

export default ResetPasswordForm;
