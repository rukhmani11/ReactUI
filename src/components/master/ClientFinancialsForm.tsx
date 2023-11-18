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
import { SelectListModel } from "../../models/ApiResponse";
import { clientFinancialsService } from "../../services/ClientFinancialService";
import { ClientFinancialsModel } from "../../models/ClientFinancialsModel";
import { currencyService } from "../../services/CurrencyService";
import { clientsService } from "../../services/ClientsService";

const ClientFinancialsForm = () => {
  const { id ,clientId}: any = useParams();
  const [financialYear, setFinancialYear] = useState<SelectListModel[]>([]);
  const [currency, setCurrency] = useState<SelectListModel[]>([]);
 // const [client, setClient] = useState<SelectListModel[]>([]);
  const mode = id ? "Edit" : "Create";
  let navigate = useNavigate();
  useEffect(() => {
    if (financialYear.length === 0) getFinancialYear();
    if (currency.length === 0) getCurrency();
   // if (client.length === 0) getClient();
    if (id) {
      getClientFinancial();
      setErrors({});
    } else newFinancialYear();
  }, [id]);

  const validate = (fieldValues: ClientFinancialsModel = values) => {
    
    let temp: any = { ...errors };
    if ("Turnover" in fieldValues)
      temp.Turnover = fieldValues.Turnover? "" : "Turnover is required";
    if ("Profit" in fieldValues)
      temp.Profit = fieldValues.Profit? "" : "Profit is required";
    if ("FinancialYearId" in fieldValues)
      temp.FinancialYearId = fieldValues.FinancialYearId? "" : "Financial Year is required";
    setErrors({
      ...temp,
    });

    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const newFinancialYear = () => {
    setValues(clientFinancialsService.initialFieldValues);
  };
  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(clientFinancialsService.initialFieldValues, validate, id);

  const getFinancialYear = () => {
    financialYearsService.getSelectList().then((response: any) => {
      setFinancialYear(response.data);
    });
  };
  const getCurrency = () => {
    currencyService.getSelectList().then((response: any) => {
      setCurrency(response.data);
    });
  };
  // const getClient = () => {
  //   clientsService.getSelectList().then((response: any) => {
  //     setClient(response.data);
  //   });
  // };

  //This is used since in get the null property is not returned
  function setFormValue(model: ClientFinancialsModel) {
    
    let newModel = {
      Id: model.Id,
      ClientId: model.ClientId,
      FinancialYearId: model.FinancialYearId,
      CurrencyCode: model.CurrencyCode,
      Turnover: model.Turnover,
      Profit: model.Profit,
    };
    return newModel;
  }
  const getClientFinancial = () => {
    clientFinancialsService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.row));
      }
    });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
     values.ClientId = clientId;
      if (id) {
        clientFinancialsService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client financial edited successfully.");
              resetForm();
              navigate("/clientFinancials/"+clientId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        clientFinancialsService.post(values).then((response: any) => {
          if (response) {
            
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client financial added successfully.");
              resetForm();
              navigate("/clientFinancials/"+clientId);
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
      <Title>{mode} Client Financial</Title>
      <>
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      name="FinancialYearId"
                      showEmptyItem={false}
                      label="Financial Year"
                      required
                      options={financialYear}
                      value={financialYear.length > 0 ? values.FinancialYearId : ""}
                      onChange={handleInputChange}
                      error={errors.FinancialYearId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      name="CurrencyCode"
                      showEmptyItem={false}
                      label="Currency"
                      required
                      options={currency}
                      value={currency.length > 0 ? values.CurrencyCode : ""}
                      onChange={handleInputChange}
                      error={errors.CurrencyCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      label="Turnover"
                      name="Turnover"
                      //type="Number"
                      value={values.Turnover}
                      onChange={handleInputChange}
                      error={errors.Turnover}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      label="Profit"
                      name="Profit"
                     // type="Number"
                      value={values.Profit}
                      onChange={handleInputChange}
                      error={errors.Profit}
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
                  onClick={() => navigate("/clientFinancials/"+clientId)}
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
export default ClientFinancialsForm;
