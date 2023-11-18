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
import { useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import { locationService } from "../../services/LocationService";
import useForm from "../../utility/hooks/UseForm";
import { LocationsModel } from "../../models/LocationsModel";
import { SelectListModel } from "../../models/ApiResponse";

const LocationsForm = () => {
  const { id, companyId }: any = useParams();
  const [locations, setlocations] = useState<SelectListModel[]>([]);
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();
  const validate = (fieldValues: LocationsModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Location is required";
    if ("Code" in fieldValues)
      temp.Code = fieldValues.Code ? "" : "Code is required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(locationService.initialFieldValues, validate, id);

  const newLocation = () => {
    setValues(locationService.initialFieldValues);
  };

  function setFormValue(model: LocationsModel) {
    let newModel = {
      Id: model.Id,
      Code: model.Code || "",
      Name: model.Name || "",
      CompanyId: model.CompanyId,
      ParentId: model.ParentId,
      Active: model.Active || false,
    };
    return newModel;
  }

  useEffect(() => {
    if (locations.length === 0) getlocations();
    if (id) {
      getLocation();
      setErrors({});
    } else newLocation();
  }, [id]);

  const getlocations = () => {
    locationService
      .getParentLocationSelectList(id, companyId)
      .then((response: any) => {
        setlocations(response.data);
      });
  };
  const getLocation = () => {
    locationService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.CompanyId = companyId;
      if (id) {
        locationService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Location edited successfully");
              resetForm();
              navigate("/locations/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        locationService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Location added successfully");
              resetForm();
              navigate("/locations/" + companyId);
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
      <Title>{mode} Location </Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Location"
                      name="Name"
                      value={values.Name}
                      onChange={handleInputChange}
                      error={errors.Name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Code"
                      name="Code"
                      value={values.Code}
                      onChange={handleInputChange}
                      error={errors.Code}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      name="ParentId"
                      showEmptyItem={false}
                      label="Parent Location"
                      options={locations}
                      value={locations.length > 0 ? values.ParentId : ""}
                      onChange={handleInputChange}
                      error={errors.ParentId}
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
                  onClick={() => navigate("/locations/" + companyId)}
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

export default LocationsForm;
