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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SelectListModel } from "../../models/ApiResponse";
import { globalService } from "../../services/GlobalService";
import useForm from "../../utility/hooks/UseForm";
import { FinancialYearsModel } from "../../models/FinancialYearsModel";
import { initialFieldValues } from "../../utility/context/AuthContext";
import { ClientAccountsModel } from "../../models/ClientAccountsModel";
import { clientAccountsService } from "../../services/ClientAccountsService";
import { accountTypesService } from "../../services/AccountTypeService";
import { currencyService } from "../../services/CurrencyService";

const ClientAccountsForm = () => {
  const { id, clientId }: any = useParams();
  //const [clients, setClients] = useState<SelectListModel[]>([]);
  const [accountTypes, setaccountType] = useState<SelectListModel[]>([]);
  const [currency, setCurrency] = useState<SelectListModel[]>([]);
  const prevPgState = useLocation();

  const mode = id ? "Edit" : "Create";

  let navigate = useNavigate();

  const validate = (fieldValues: ClientAccountsModel = values) => {
    let temp: any = { ...errors };
    if ("AccountNo" in fieldValues)
      temp.AccountNo = fieldValues.AccountNo ? "" : "Account No is required";
    if ("BalanceAsOn" in fieldValues)
      temp.BalanceAsOn = fieldValues.BalanceAsOn
        ? ""
        : "Balance As On is required";
    temp.Balance = fieldValues.Balance
      ? (temp.Balance = /^[0-9\b]+$/.test(fieldValues.Balance.toString())
          ? ""
          : "Balance is not valid.")
      : "Balance is required";

    if ("AccountTypeId" in fieldValues)
      temp.AccountTypeId = fieldValues.AccountTypeId
        ? ""
        : "Account Type is required";
    if ("AccountNo" in fieldValues)
      temp.AccountNo = fieldValues.AccountNo ? "" : "Account No is required";
    if ("BalanceAsOn" in fieldValues)
      temp.BalanceAsOn = fieldValues.BalanceAsOn
        ? ""
        : "Balance As On is required";
    if ("CurrencyCode" in fieldValues)
      temp.CurrencyCode = fieldValues.CurrencyCode
        ? ""
        : "CurrencyCode is required";
    temp.Balance = fieldValues.Balance
      ? (temp.Balance = /^[0-9\b]+$/.test(fieldValues.Balance.toString())
          ? ""
          : "Balance is not valid.")
      : "Balance is required";

    if ("AccountTypeId" in fieldValues)
      temp.AccountTypeId = fieldValues.AccountTypeId
        ? ""
        : "Account Type is required";
    setErrors({
      ...temp,
    });
    if (fieldValues === values)
      return Object.values(temp).every((x) => x === "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(clientAccountsService.initialFieldValues, validate, id);

  const newClientAccountObservation = () => {
    setValues(clientAccountsService.initialFieldValues);
  };

  function setFormValue(model: ClientAccountsModel) {
    let newModel = {
      Id: model.Id,
      ClientId: model.ClientId,
      AccountTypeId: model.AccountTypeId,
      AccountNo: model.AccountNo,
      BalanceAsOn: model.BalanceAsOn
        ? globalService.convertLocalToUTCDate(new Date(model.BalanceAsOn))
        : null,
      Balance: model.Balance,
      CurrencyCode: model.CurrencyCode,
    };
    return newModel;
  }

  useEffect(() => {
    if (accountTypes.length === 0) getAccountType();
    if (currency.length === 0) getCurrency();
    if (id) {
      getClientAccountObservation();
      setErrors({});
    } else newClientAccountObservation();
  }, [id]);

  const getClientAccountObservation = () => {
    clientAccountsService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    });
  };

  const getAccountType = () => {
    accountTypesService.getSelectList().then((response: any) => {
      setaccountType(response.data);
    });
  };

  const getCurrency = () => {
    currencyService.getSelectList().then((response: any) => {
      setCurrency(response.data);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      values.ClientId = clientId;
      if (id) {
        clientAccountsService.put(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client Account edited successfully");
              resetForm();
              navigate("/clientAccount" + "/" + clientId);
            } else {
              globalService.error(result.message);
            }
          }
        });
      } else {
        clientAccountsService.post(values).then((response: any) => {
          if (response) {
            let result = response.data;
            if (result.isSuccess) {
              globalService.success("Client Account added successfully");
              resetForm();
              navigate("/clientAccount" + "/" + clientId);
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
      <>
        <Stack direction="row" spacing={0} justifyContent="space-between">
          <Typography variant="h5" align="center">
            Client Accounts
          </Typography>
          {prevPgState && prevPgState.state && prevPgState.state.row && (
            <Typography variant="body1">
              <b>Company Name: </b>
              {prevPgState.state.row.Name}{" "}
            </Typography>
          )}
        </Stack>

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Card>
            <CardContent>
              <React.Fragment>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      name="AccountTypeId"
                      label="Account Type*"
                      required
                      options={accountTypes}
                      value={
                        accountTypes.length > 0 ? values.AccountTypeId : ""
                      }
                      onChange={handleInputChange}
                      error={errors.AccountTypeId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Account No"
                      name="AccountNo"
                      value={values.AccountNo}
                      onChange={handleInputChange}
                      error={errors.AccountNo}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.ReactDatePicker
                      label="Balance As On"
                      value={values.BalanceAsOn}
                      // min={values.SubscriptionStart}
                      // max={values.SubscriptionEnd}
                      onChange={(date: Date) =>
                        handleInputChange({
                          target: {
                            value: globalService.convertLocalToUTCDate(date),
                            name: "BalanceAsOn",
                          },
                        })
                      }
                      error={errors.BalanceAsOn}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Select
                      required
                      name="CurrencyCode"
                      showEmptyItem={false}
                      label="Currency*"
                      options={currency}
                      value={currency.length > 0 ? values.CurrencyCode : ""}
                      onChange={handleInputChange}
                      error={errors.CurrencyCode}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                      required
                      label="Balance"
                      name="Balance"
                      type="Number"
                      value={values.Balance}
                      onChange={handleInputChange}
                      error={errors.Balance}
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
                  onClick={() => navigate("/clientAccount/" + clientId)}
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

export default ClientAccountsForm;
