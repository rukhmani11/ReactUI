import React, { useEffect } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import { AccountTypesModel } from "../../models/AccountTypeModel";
import { accountTypesService } from "../../services/AccountTypeService";
import useForm from "../../utility/hooks/UseForm";
import { globalService } from "../../services/GlobalService";

const AccountTypeForm = () => {
  const { id }: any = useParams();
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const validate = (fieldValues: AccountTypesModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Name is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(accountTypesService.initialFieldValues, validate, id);

  const newaccountTypes = () => {
    setValues(accountTypesService.initialFieldValues);
  };

  function setFormValue(model: AccountTypesModel) {
    let newModel = {
      Id: model.Id,
      Name: model.Name || "",
      Active: model.Active,
    };
    return newModel;
  }
  useEffect(() => {
    if (id) {
      getaccountTypes();
      setErrors({});
    } else newaccountTypes();
  }, [id]);

  const getaccountTypes = () => {
    accountTypesService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        accountTypesService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Account Types edited successfully.");
              resetForm();
              navigate("/accountTypes");
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        accountTypesService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Account Types added successfully.");
              resetForm();
              navigate("/accountTypes");
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
      <Title>{mode} Account Type</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
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
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    className={mode !== "Edit" ? "hidden" : ""}
                  >
                    <Controls.Checkbox
                      label="Active"
                      name="Active"
                      value={values.Active}
                      onChange={handleInputChange}
                      error={errors.Active}
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
                  onClick={() => navigate("/accountTypes")}
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

export default AccountTypeForm;
