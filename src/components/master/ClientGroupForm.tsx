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
import { BusinessSegmentsModel } from "../../models/BusinessSegmentsModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../utility/context/AuthContext";
import { ClientGroupModel } from "../../models/ClientGroupModel";
import useForm from "../../utility/hooks/UseForm";
import { clientGroupService } from "../../services/ClientGroupService";
import { globalService } from "../../services/GlobalService";
import { businessSegmentsService } from "../../services/BusinessSegmentsService";

const ClientGroupForm = () => {
  const { id,companyId }: any = useParams();
  let navigate = useNavigate();
  const { auth } = React.useContext(AuthContext);
  const mode = id ? "Edit" : "Create";
  const validate = (fieldValues: ClientGroupModel = values) => {
    let temp: any = { ...errors };

    if ("GroupCIFNo" in fieldValues)
      temp.GroupCIFNo = fieldValues.GroupCIFNo ? "" : "Group CIF No is required.";
    if ("GroupName" in fieldValues)
      temp.GroupName = fieldValues.GroupName ? "" : "Group Name is required.";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(clientGroupService.initialFieldValues, validate, id);

  const newclientgroup = () => {
    setValues(clientGroupService.initialFieldValues);
  };

  function setFormValue(model: ClientGroupModel) {
    let newModel = {
      Id: model.Id,
      GroupName: model.GroupName || "",
      GroupCIFNo: model.GroupCIFNo,
      Active: model.Active,
      CompanyId: model.CompanyId ,
    };
    return newModel;
  }
  useEffect(() => {
    if (id) {
      getclientGroup();
      setErrors({});
    } else newclientgroup();
  }, [id]);

  const getclientGroup = () => {
    clientGroupService.getById(id).then((response) => {
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
        clientGroupService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client Group edited successfully");
              resetForm();
              navigate("/clientGroups/" + companyId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        clientGroupService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client Group added successfully");
              resetForm();
              navigate("/clientGroups/" + companyId);
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
      <Title>{mode} Client Group</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Group Name"
                      name="GroupName"
                      value={values.GroupName}
                      onChange={handleInputChange}
                      error={errors.GroupName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Group CIF No."
                      name="GroupCIFNo"
                      value={values.GroupCIFNo}
                      onChange={handleInputChange}
                      error={errors.GroupCIFNo}
                    />
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
                  onClick={() => navigate("/clientGroups/" + companyId)}
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

export default ClientGroupForm;
