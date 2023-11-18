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
import { DesignationsModel } from "../../models/DesignationsModel";
import useForm from "../../utility/hooks/UseForm";
import { currencyService } from "../../services/CurrencyService";
import { designationsService } from "../../services/DesignationService";

const DesignationsForm = () => {
  const { id, companyId }: any = useParams();
  const [designations, setDesignations] = useState<SelectListModel[]>([]);

  const mode = id ? "Edit" : "Create";

  let navigate = useNavigate();
  const validate = (fieldValues: DesignationsModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : " Designation is required.";
    if ("Code" in fieldValues)
      temp.Code = fieldValues.Code ? "" : "Code is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(designationsService.initialFieldValues, validate, id);

  const newDesignation = () => {
    setValues(designationsService.initialFieldValues);
  };

  function setFormValue(model: DesignationsModel) {
    let newModel = {
      Id: model.Id,
      Code: model.Code || "",
      Name: model.Name || "",
      Active: model.Active || false,
      ParentId: model.ParentId || "",
    };
    return newModel;
  }

  useEffect(() => {
    if (designations.length === 0) getdesignations(companyId);
    if (id) {
      getDesignation();
      setErrors({});
    } else newDesignation();
  }, [id]);

  const getDesignation = () => {
    designationsService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };

  const getdesignations = (companyId: any) => {
    designationsService
      .getParentDesignationsSelectList(id, companyId)
      .then((response: any) => {
        setDesignations(response.data);
      });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.CompanyId = companyId;
      if (id) {
        designationsService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Designation edited successfully");
              resetForm();
              navigate("/designations/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        designationsService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Designation added successfully");
              resetForm();
              navigate("/designations/" + companyId);
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
      <Title>{mode} Designation</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Designation"
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
                      label="Parent Designation"
                      options={designations}
                      value={designations.length > 0 ? values.ParentId : ""}
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
                  onClick={() => navigate("/designations/" + companyId)}
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

export default DesignationsForm;
