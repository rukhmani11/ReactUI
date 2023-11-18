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
  IconButton
} from "@mui/material";
import Controls from "../../utility/controls/Controls";
import { CompanyModel } from "../../models/CompanyModel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import useForm from "../../utility/hooks/UseForm";
import { companyService } from "../../services/CompanyService";
import ColorPalette from "../../utility/controls/ColorPalette";
import { FolderPath, config } from "../../utility/Config";
import { roleService } from "../../services/RoleService";
import { SelectListModel } from "../../models/ApiResponse";

const CompanyForm = () => {
  const { id }: any = useParams();
  const [logoFile, setLogoFile] = useState<File>();
  const [roles, setRoles] = useState<SelectListModel[]>([]);
  //const [adLoginYN, setADLoginYN] = useState<SelectListModel[]>([]);
  //const [mobileIronYN, setMobileIronYN] = useState<SelectListModel[]>([]);
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();

  const adLoginYN = [
    { Value: 1, Text: "Yes" },
    { Value: 0, Text: "NO" },
  ];
  const mobileIronYN = [
    { Value: 1, Text: "Yes" },
    { Value: 0, Text: "NO" },
  ];
  const validate = (fieldValues: CompanyModel = values) => {
    
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
      temp.Name = fieldValues.Name ? "" : "Name is required.";
    if ("Address" in fieldValues)
      temp.Address = fieldValues.Address ? "" : "Address is required.";
    if ("Email" in fieldValues) {
      temp.Email = fieldValues.Email
        ? (temp.Email =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            fieldValues.Email
          )
            ? ""
            : "Email is not valid.")
        : "Email is required";
    }
    if ("Website" in fieldValues) {
      temp.Website = fieldValues.Website
        ? (temp.Website =
          /^(https?:\/\/)?([\w\d-]+\.)+[\w\d]{2,}(\/.*)?$/i.test(
            fieldValues.Website
          )
            ? ""
            : "Website is not valid.")
        : "Website is required";
    }

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(companyService.initialFieldValues, validate, id);

  const newcompany = () => {
    setValues(companyService.initialFieldValues);
  };

  function setFormValue(model: CompanyModel) {
    let newModel = {
      Id: model.Id,
      Name: model.Name || "",
      Address: model.Address || "",
      Logo: model.Logo,
      Email: model.Email,
      Website: model.Website || "",
      ADLoginYn: model.ADLoginYn,
      MobileIronYn: model.MobileIronYn,
      Active: model.Active,
      ThemeLightHexCode: model.ThemeLightHexCode || "",
      ThemeDarkHexCode: model.ThemeDarkHexCode || "",
      SiteAdminName: model.SiteAdminName || "",
      SiteAdminEmpCode: model.SiteAdminEmpCode || "",
      SiteAdminUserName: model.SiteAdminUserName || "",
      SiteAdminMobile: model.SiteAdminMobile || "",
      SiteAdminEmail: model.SiteAdminEmail || "",
      SiteAdminRoleId: model.SiteAdminRoleId || "",
      SiteAdminRoleName: model.SiteAdminRoleName || "",
      SiteAdminPassword: model.SiteAdminPassword || "",
      // SiteAdmin :{
      //   Id:model.SiteAdmin.Id,
      //   EmpCode:model.SiteAdmin.EmpCode||"",
      //   UserName:model.SiteAdmin.UserName||"",
      //   Name:model.SiteAdmin.Name||"",
      //   Mobile:model.SiteAdmin.Mobile||"",
      //   Email: model.SiteAdmin.Email||"",
      //   RoleId:model.SiteAdmin.RoleId||"",
      //   RoleName:model.SiteAdmin.RoleName||"",
      // } 
    };
    return newModel;
  }

  useEffect(() => {
    if (roles.length === 0) getRoles();
    if (id) {
      getcompanies();
      setErrors({});
    } else newcompany();
  }, [id]);

  const getcompanies = () => {
    companyService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };
  const getRoles = () => {
    roleService.getSelectList().then((response) => {
      if (response) {
        setRoles(response.data);
      }
    });
  };

  const onFileChange = (fileInput: any) => {
    setLogoFile(fileInput.target.files[0]);
  };

  const clearLogoFile = () => {
    setLogoFile(null);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        companyService.put(values, logoFile).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Company edited successfully.");
              resetForm();
              navigate("/companies");
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        companyService.post(values, logoFile).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Company added successfully.");
              resetForm();
              navigate("/companies");
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
      <Title>{mode} Company</Title>
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
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="Address"
                      label="Address"
                      multiline
                      value={values.Address}
                      onChange={handleInputChange}
                      error={errors.Address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      floatinglabeltext="email"
                      type="email"
                      label="Email Id"
                      name="Email"
                      value={values.Email}
                      onChange={handleInputChange}
                      error={errors.Email}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      type="Website"
                      label="Website"
                      name="Website"
                      value={values.Website}
                      onChange={handleInputChange}
                      error={errors.Website}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Checkbox
                      label="ADLoginYn"
                      name="ADLoginYn"
                      disabled
                      value={values.ADLoginYn}
                      onChange={handleInputChange}
                      error={errors.ADLoginYn}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Checkbox
                      label="MobileIronYn"
                      name="MobileIronYn"
                      disabled
                      value={values.MobileIronYn}
                      onChange={handleInputChange}
                      error={errors.MobileIronYn}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.ColorPalette
                      label="Theme Light Hex Code"
                      value={values.ThemeLightHexCode}
                      onChange={(e: any) =>
                        handleInputChange({
                          target: {
                            value: e.hex,
                            name: "ThemeLightHexCode",
                          },
                        })
                      }
                      error={errors.ThemeLightHexCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.ColorPalette
                      label="Theme Dark Hex Code"
                      value={values.ThemeDarkHexCode}
                      onChange={(e: any) =>
                        handleInputChange({
                          target: {
                            value: e.hex,
                            name: "ThemeDarkHexCode",
                          },
                        })
                      }
                      error={errors.ThemeDarkHexCode}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Stack spacing={1} direction="row">
                      <Button variant="contained" component="label">
                        Upload Logo
                        <input type="file" accept="image/*" onChange={(event: any) => { onFileChange(event); }} hidden />
                      </Button>

                      <IconButton aria-label="delete" size="medium" color="error" onClick={clearLogoFile}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>

                      <>
                        {values.Logo && <img
                          className="dvImg"
                          src={`${config.baseUrl}/${FolderPath.companyLogo}/${values.Logo}`}
                          loading="lazy"
                        />
                        }
                      </>
                    </Stack>

                    <br></br>
                    {logoFile?.name}
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
                  {/* <Grid item xs={12} sm={4}>
                                    <input   
                                            required
                                            id="upload-logo"  
                                            name="upload-logo"  
                                            type="file"
                                    /> 
                                    </Grid> */}
                </Grid>
              </React.Fragment>
            </CardContent>
          </Card>
          <Title>User</Title>
            <Card>
            <CardContent>
              <React.Fragment>
              <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="SiteAdminName"
                      label="Full Name"
                      value={values.SiteAdminName}
                      onChange={handleInputChange}
                      error={errors.SiteAdminName}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      label="Employee Code"
                      name="SiteAdminEmpCode"
                      value={values.SiteAdminEmpCode}
                      onChange={handleInputChange}
                      error={errors.SiteAdminEmpCode}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="User Name"
                      name="SiteAdminUserName"
                      value={values.SiteAdminUserName}
                      onChange={handleInputChange}
                      error={errors.SiteAdminUserName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      showEmptyItem={false}
                      name="SiteAdminRoleId"
                      label="Role*"
                      value={roles.length > 0 ? values.SiteAdminRoleId : ""}
                      onChange={handleInputChange}
                      options={roles}
                      error={errors.SiteAdminRoleId}
                    />
                  </Grid> 

                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Mobile"
                      name="SiteAdminMobile"
                      type="number"
                      value={values.SiteAdminMobile}
                      onChange={handleInputChange}
                      error={errors.SiteAdminMobile}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      name="SiteAdminPassword"
                      required
                      label="Password"
                      type="password"
                      value={values.SiteAdminPassword}
                      onChange={handleInputChange}
                      error={errors.SiteAdminPassword}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      name="Email"
                      label="Email"
                      value={values.SiteAdmin?.Email}
                      onChange={handleInputChange}
                      error={errors.Email}
                    />
                  </Grid> */}
              </Grid>
              </React.Fragment>
            </CardContent>
          </Card>
          <CardActions sx={{ display: "flex", justifyContent: "center" }}>
              <Stack spacing={2} direction="row">
                <Button type="submit" variant="contained">
                  Submit
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate("/companies")}
                >
                  Back To List
                </Button>
              </Stack>
            </CardActions>
        </form>  
      </>
    </div>
  );
};

export default CompanyForm;
