import React, { useEffect, useState } from "react";
import { SelectListModel } from "../../models/ApiResponse";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../utility/hooks/UseForm";
import { companyObservationService } from "../../services/CompanyObservationService";
import { CompanyObservationModel } from "../../models/CompanyObservationModel";
import { businessSegmentsService } from "../../services/BusinessSegmentsService";
import { globalService } from "../../services/GlobalService";
import Title from "../helper/Title";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Stack,
} from "@mui/material";
import Controls from "../../utility/controls/Controls";
import { ArrowBack, ErrorRounded } from "@mui/icons-material";

const CompanyObservationForm = () => {
  const { id, companyId }: any = useParams();
  const [businessSegments, setBusinessSegments] = useState<SelectListModel[]>(
    []
  );
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const validate = (fieldValues: CompanyObservationModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Name is required";
    if ("Description" in fieldValues)
      temp.Description = fieldValues.Description
        ? ""
        : "Description is required";
    if ("BusinessSegmentId" in fieldValues)
      temp.BusinessSegmentId = fieldValues.BusinessSegmentId
        ? ""
        : "Business Segment is required";
        if ("Sequence" in fieldValues) temp.Sequence = fieldValues.Sequence? "": "Sequence is required";
        temp.Sequence = fieldValues.Sequence ? (temp.Sequence = /^[0-9\b]+$/.test(fieldValues.Sequence.toString())? "" : "Sequence is not valid.") : "Sequence is required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(companyObservationService.initialFieldValues, validate, id);

  const newcompanyObservation = () => {
    setValues(companyObservationService.initialFieldValues);
  };

  function setFormValue(model: CompanyObservationModel) {
    let newModel = {
      companyId: model.CompanyId,
      Id: model.Id,
      Name: model.Name || "",
      Active: model.Active,
      Description: model.Description,
      Sequence: model.Sequence,
      BusinessSegmentId: model.BusinessSegmentId || "",
    };
    return newModel;
  }
  useEffect(() => {
    if (businessSegments.length === 0) getbusinessSegments();
    if (id) {
      getCompanyObservation();
      setErrors({});
    } else newcompanyObservation();
  }, [id]);

  const getCompanyObservation = () => {
    companyObservationService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };
  const getbusinessSegments = () => {
    businessSegmentsService.getSelectList().then((response: any) => {
      setBusinessSegments(response.data);
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.CompanyId = companyId;
      if (id) {
        companyObservationService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Company Observation edited succcessfully");
              resetForm();
              navigate("/CompanyObservation" + "/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        companyObservationService.post(values).then((response: any) => {
          
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Company Observation added successfully");
              resetForm();
              navigate("/CompanyObservation" + "/" + companyId);
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
      <Title>{mode} Company Observation</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      name="BusinessSegmentId"
                      showEmptyItem={false}
                      label="Business Segment*"
                      required
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
                      name="Name"
                      label="Name"
                      multiline
                      value={values.Name}
                      onChange={handleInputChange}
                      error={errors.Name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="Description"
                      label="Description"
                      multiline
                      value={values.Description}
                      onChange={handleInputChange}
                      error={errors.Description}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                    required
                      type="number"
                      label="Sequence"
                      name="Sequence"
                      value={values.Sequence}
                      onChange={handleInputChange}
                      error={errors.sequence}
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
                  startIcon={<ArrowBack />}
                  onClick={() => navigate("/companyObservation/" +  companyId)}
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

export default CompanyObservationForm;
