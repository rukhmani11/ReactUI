import React, { useEffect, useState } from "react";
import { SelectListModel } from "../../models/ApiResponse";
import { useNavigate, useParams } from "react-router-dom";
import useForm from "../../utility/hooks/UseForm";
import { ClientBusinessUnitModel } from "../../models/ClientBusinessUnitModel";
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
import { clientbusinessUnitService } from "../../services/ClientBusinessUnitService";
import { userService } from "../../services/UserService";

const CompanyBusinessUnitForm = () => {
  const { id, clientId }: any = useParams();
  const [reportingToUsers, setReportingToUsers] = useState<SelectListModel[]>(
    []
  );
  const [businessSegments, setBusinessSegments] = useState<SelectListModel[]>(
    []
  );
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const validate = (fieldValues: ClientBusinessUnitModel = values) => {
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
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(clientbusinessUnitService.initialFieldValues, validate, id);

  const newcompanyBusinessUnit = () => {
    setValues(clientbusinessUnitService.initialFieldValues);
  };

  function setFormValue(model: ClientBusinessUnitModel) {
    let newModel = {
      Id: model.Id,
      Name: model.Name || "",
      BusinessSegmentId: model.BusinessSegmentId || "",
      RoUserId: model.RoUserId,
    };
    return newModel;
  }
  useEffect(() => {
    if (businessSegments.length === 0) getbusinessSegments();
    if (reportingToUsers.length === 0) getReportingToUsers();
    if (id) {
      getCompanyBusinessUnit();
      setErrors({});
    } else newcompanyBusinessUnit();
  }, [id]);

  const getCompanyBusinessUnit = () => {
    clientbusinessUnitService.getById(id).then((response) => {
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
  const getReportingToUsers = () => {
    userService.getReportingUserSelectList(id).then((response) => {
      if (response) {
        setReportingToUsers(response.data);
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.ClientId = clientId;
      if (id) {
        clientbusinessUnitService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success(
                "Company  Business Unit edited succcessfully"
              );
              resetForm();
              navigate("/clientBusinessUnits" + "/" + clientId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        clientbusinessUnitService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success(
                "Company  Business Unit added successfully"
              );
              resetForm();
              navigate("/clientBusinessUnits" + "/" + clientId);
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
      <Title>{mode} Client Business Unit</Title>
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
                      label="Business Unit"
                      multiline
                      value={values.Name}
                      onChange={handleInputChange}
                      error={errors.Name}
                    />
                  </Grid>
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
                    <Controls.Select
                      name="RoUserId"
                      label="Relationship Officer*"
                      required
                      options={reportingToUsers}
                      value={reportingToUsers.length > 0 ? values.RoUserId : ""}
                      onChange={handleInputChange}
                      error={errors.RoUserId}
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
                  onClick={() => navigate(-1)}
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

export default CompanyBusinessUnitForm;
