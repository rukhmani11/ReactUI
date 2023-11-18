import React, { useContext, useEffect, useState } from "react";
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
import useForm from "../../utility/hooks/UseForm";
import { clientsService } from "../../services/ClientsService";
import { ClientsModel } from "../../models/ClientsModel";
import { clientGroupService } from "../../services/ClientGroupService";
import { AuthContext } from "../../utility/context/AuthContext";

const ClientsForm = () => {
  const { id, companyId }: any = useParams();
  const [clientGroups, setClientGroups] = useState<SelectListModel[]>([]);
  const {auth} = useContext(AuthContext);
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const validate = (fieldValues: ClientsModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Name is required.";
    if ("ClientGroupId" in fieldValues)
      temp.ClientGroupId = fieldValues.ClientGroupId ? "" : "Client Group is required.";
      if ("CIFNo" in fieldValues)
      temp.CIFNo = fieldValues.CIFNo ? "" : "CIF No is required.";
    //   if ("VisitingFrequencyInMonth" in fieldValues) {
    //     if (isNaN(fieldValues.VisitingFrequencyInMonth)) {
    //         temp.VisitingFrequencyInMonth = "Enter a  number in VisitingFrequencyInMonth.";
    //     } else {
    //       temp.VisitingFrequencyInMonth = fieldValues.VisitingFrequencyInMonth ? "" : "VisitingFrequency In Month is required.";
    //     }
    // }

  temp.VisitingFrequencyInMonth = fieldValues.VisitingFrequencyInMonth
    ? (temp.VisitingFrequencyInMonth = /^[0-9\b]+$/.test(fieldValues.VisitingFrequencyInMonth.toString())
        ? ""
        : "VisitingFrequencyInMonth is not valid.")
    : "VisitingFrequencyInMonth is required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(clientsService.initialFieldValues, validate, id);

  const newclient = () => {
    setValues(clientsService.initialFieldValues);
  };

  function setFormValue(model: ClientsModel) {
    let newModel = {
      Id: model.Id,
      Name: model.Name || "",
      Active: model.Active || false,
      CIFNo: model.CIFNo || "",
      CompanyId: model.CompanyId,
      ClientGroupId: model.ClientGroupId || "",
      VisitingFrequencyInMonth: model.VisitingFrequencyInMonth || 0 ,
      CurrencyCode: model.CurrencyCode || "",
    };
    return newModel;
  }

  useEffect(() => {
    if (clientGroups.length === 0) getclientgroups();
    if (id) {
      getclients();
      setErrors({});
    } else newclient();
  }, [id]);

  const getclientgroups = () => {
    clientGroupService.getSelectListByCompanyId(auth.CompanyId).then((response: any) => {
      setClientGroups(response.data);
    });
  };
  
  const getclients = () => {
    clientsService.getById(id).then((response) => {
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
        clientsService.put(values).then((response: any) => {
          if (response) {
            
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client edited successfully");
              resetForm();
              navigate("/clients/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        clientsService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client added successfully");
              resetForm();
              navigate("/clients/" + companyId);
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
      <Title>{mode} Clients</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      required
                      name="ClientGroupId"
                      label="Client Group*"
                      options={clientGroups}
                      value={clientGroups.length > 0? values.ClientGroupId: "" }
                      onChange={handleInputChange}
                      error={errors.ClientGroupId}
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
                      label="CIF No"
                      name="CIFNo"
                      value={values.CIFNo}
                      onChange={handleInputChange}
                      error={errors.CIFNo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                    required
                      label="Visiting Frequency In Month"
                      name="VisitingFrequencyInMonth"
                     length={3}
                   
                      value={values.VisitingFrequencyInMonth}
                      onChange={handleInputChange}
                      error={errors.VisitingFrequencyInMonth}
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
                  onClick={() => navigate("/clients/" + companyId)}
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

export default ClientsForm;
