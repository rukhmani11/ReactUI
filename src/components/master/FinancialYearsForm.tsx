import React, { useEffect, useState } from "react";
import Title from "../helper/Title";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import Controls from "../../utility/controls/Controls";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { globalService } from "../../services/GlobalService";
import useForm from "../../utility/hooks/UseForm";
import { financialYearsService } from "../../services/FinancialYearsService";
import { FinancialYearsModel } from "../../models/FinancialYearsModel";

const FinancialYearsForm = () => {
  const { id }: any = useParams();
  const mode = id ? "Edit" : "Create";
  const [minStartDate, setMinStartDate] = useState(null);
  let navigate = useNavigate();

  const validate = (fieldValues: FinancialYearsModel = values) => {
    let temp: any = { ...errors };
    if ("FromDate" in fieldValues)
      temp.FromDate = fieldValues.FromDate ? "" : "From Date is required";

    if ("ToDate" in fieldValues)
      temp.ToDate = fieldValues.ToDate ? "" : "To Date is required";

    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(financialYearsService.initialFieldValues, validate, id);
  const newfinancialYear = () => {
    setValues(financialYearsService.initialFieldValues);
  };
  //This is used since in get the null property is not returned
  function setFormValue(model: FinancialYearsModel) {
    let newModel = {
      Id: model.Id,
      FromDate: model.FromDate
        ? globalService.convertLocalToUTCDate(new Date(model.FromDate))
        : null,
      ToDate: model.ToDate
        ? globalService.convertLocalToUTCDate(new Date(model.ToDate))
        : null,
      Abbr: model.Abbr,
    };
    return newModel;
  }
  useEffect(() => {
    if (id) {
      getfinancialYears();
      setErrors({});
    } else {
      if (!minStartDate) {
        getMaxOfToDate();
      }
      newfinancialYear();
      setErrors({});
    }
  }, [id]);

  const getfinancialYears = () => {
    financialYearsService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };
  function getMaxOfToDate() {
    financialYearsService.getMaxOfToDate().then((response: any) => {
      let result = response.data;
      if (result) setMinStartDate(new Date(result));
      values.FromDate = new Date(result);
    });
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (id) {
        financialYearsService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Financial year edited successfully.");
              resetForm();
              navigate("/financialYears");
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        financialYearsService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Financial year added successfully.");
              resetForm();
              navigate("/financialYears");
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
      <Title>{mode} Financial Years</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.ReactDatePicker
                      label="From Date"
                      disabled={mode === "Edit" ||  mode ==="Create" }
                      min={minStartDate}
                      onChange={(date: Date) =>
                        handleInputChange({
                          target: {
                            value: globalService.convertLocalToUTCDate(date),
                            name: "FromDate",
                          },
                        })
                      }
                      value={values.FromDate}
                      error={errors.FromDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.ReactDatePicker
                      disabled={mode === "Edit"}
                      required
                      label="ToDate"
                      fullWidth
                      value={values.ToDate}
                      onChange={(date: Date) =>
                        handleInputChange({
                          target: {
                            value: globalService.convertLocalToUTCDate(date),
                            name: "ToDate",
                          },
                        })
                      }
                      min={values.FromDate}
                      error={errors.ToDate}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Abbr"
                      name="Abbr"
                      value={values.Abbr}
                      onChange={handleInputChange}
                      error={errors.Abbr}
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
                  onClick={() => navigate("/financialYears")}
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

export default FinancialYearsForm;
