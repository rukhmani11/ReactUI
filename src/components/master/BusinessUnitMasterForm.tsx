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
import { BusinessUnitModel } from "../../models/BusinessUnitModel";
import useForm from "../../utility/hooks/UseForm";
import { businessUnitService } from "../../services/BusinessUnitService";

const BusinessUnitForm = () => {
  const { id, companyId }: any = useParams();
  const [businessUnits, setBusinessUnit] = useState<SelectListModel[]>([]);

  const mode = id ? "Edit" : "Create";

  let navigate = useNavigate();
  const validate = (fieldValues: BusinessUnitModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Business Unit is required";
    if ("Code" in fieldValues)
      temp.Code = fieldValues.Code ? "" : "Code is required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(businessUnitService.initialFieldValues, validate, id);

  const newBusinessUnit = () => {
    setValues(businessUnitService.initialFieldValues);
  };

  function setFormValue(model: BusinessUnitModel) {
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
    if (businessUnits.length === 0) getbusinessUnit();
    if (id) {
      getBusinessUnit();
      setErrors({});
    } else newBusinessUnit();
  }, [id]);

  const getBusinessUnit = () => {
    businessUnitService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };

  const getbusinessUnit = () => {
    businessUnitService
      .getParentBusinessUnitSelectList(id, companyId)
      .then((response: any) => {
        setBusinessUnit(response.data);
      });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.CompanyId = companyId;
      if (id) {
        businessUnitService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Business Unit edited Successfully");
              resetForm();
              navigate("/businessUnits/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        businessUnitService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Business Unit added Successfully");
              resetForm();
              navigate("/businessUnits/" + companyId);
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
      <Title>{mode} Business Unit</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Business Unit"
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
                      label="Parent Business Unit"
                      options={businessUnits}
                      value={businessUnits.length > 0 ? values.ParentId : ""}
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
                  onClick={() => navigate("/businessUnits/" + companyId)}
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

export default BusinessUnitForm;
