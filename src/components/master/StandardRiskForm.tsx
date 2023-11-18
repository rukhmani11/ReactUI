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
import { StandardRisksModel } from "../../models/StandardRisksModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { SelectListModel } from "../../models/ApiResponse";
import { globalService } from "../../services/GlobalService";
import { standardRiskService } from "../../services/StandardRiskService";
import useForm from "../../utility/hooks/UseForm";
import { businessSegmentsService } from "../../services/BusinessSegmentsService";

const StandardRiskForm = (...props: any) => {
  const { id }: any = useParams();
  const [businessSegments, setBusinessSegments] = useState<SelectListModel[]>(
    []
  );
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const validate = (fieldValues: StandardRisksModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues) temp.Name = fieldValues.Name ? "" : "Name is required.";
    if ("BusinessSegmentId" in fieldValues)temp.BusinessSegmentId = fieldValues.BusinessSegmentId? "" : "Business Segment is required.";
    if ("Description" in fieldValues) temp.Description = fieldValues.Description ? "": "Description is required.";
    if ("Sequence" in fieldValues) temp.Sequence = fieldValues.Sequence? "": "Sequence is required";
    temp.Sequence = fieldValues.Sequence ? (temp.Sequence = /^[0-9\b]+$/.test(fieldValues.Sequence.toString())? "" : "Sequence is not valid.") : "Sequence is required";
    
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(standardRiskService.initialFieldValues, validate, props.setCurrentId);

  const newstandardRisks = () => {
    setValues(standardRiskService.initialFieldValues);
  };

  function setFormValue(model: StandardRisksModel) {
    let newModel = {
      Id: model.Id,
      Name: model.Name || "",
      Description: model.Description || "",
      Sequence: model.Sequence || "",
      BusinessSegmentId: model.BusinessSegmentId || "",
      Active: model.Active || false,
    };
    return newModel;
  }
  useEffect(() => {
    if (businessSegments.length === 0) getbusinessSegments();
    if (id) {
      getstandardRisk();
      setErrors({});
    } else newstandardRisks();
  }, [id]);

  const getbusinessSegments = () => {
    businessSegmentsService.getSelectList().then((response: any) => {
      setBusinessSegments(response.data);
    });
  };

  const getstandardRisk = () => {
    standardRiskService.getById(id).then((response) => {
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
        standardRiskService.put(values).then((response: any) => {
          let result = response.data;
          if (response) {
            if (result.isSuccess) {
              globalService.success("Standard Risk edited successfully.");
              navigate("/standardRisks");
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        standardRiskService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Standard Risk added successfully.");
              resetForm();
              navigate("/standardRisks");
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
      <Title>{mode} Standard Risk</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      required
                      name="BusinessSegmentId"
                      label="Business Segment"
                      options={businessSegments}
                      value={
                        businessSegments.length > 0
                          ? values.BusinessSegmentId
                          : ""
                      }
                      onChange={handleInputChange}
                      error={errors.BusinessSegmentId}
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
                      label="Description"
                      name="Description"
                      multiline
                      value={values.Description}
                      onChange={handleInputChange}
                      error={errors.Description}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Sequence"
                      name="Sequence"
                      type="number"
                      value={values.Sequence}
                      onChange={handleInputChange}
                      error={errors.Sequence}
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
                  onClick={() => navigate("/standardRisks")}
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

export default StandardRiskForm;
