import React, { useEffect, useState } from 'react'
import Title from '../helper/Title'
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid, Stack, TextField } from '@mui/material'
import Controls from '../../utility/controls/Controls'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom'
import { globalService } from '../../services/GlobalService'
import useForm from '../../utility/hooks/UseForm'
import { AuthContext } from '../../utility/context/AuthContext'
import { businessSegmentsService } from '../../services/BusinessSegmentsService'
import { BusinessSegmentsModel } from '../../models/BusinessSegmentsModel';
import { CurrencyModel } from '../../models/CurrencyModel';
import { currencyService } from '../../services/CurrencyService';

const CurrencyForm = () => {
    const { Code }: any = useParams();
    let navigate = useNavigate();
    const { auth } = React.useContext(AuthContext);
    const mode = Code ? 'Edit' : 'Create';


    const validate = (fieldValues: CurrencyModel = values) => {
        let temp: any = { ...errors };
        if ("Name" in fieldValues)
        temp.Name = fieldValues.Name ? "" : "Name is required.";
        // if ("Code" in fieldValues)
        // temp.Code = fieldValues.Code ? "" : "Code is required.";
          if ("Code" in fieldValues)
         temp.Code = fieldValues.Code ? (fieldValues.Code.length > 3 ? "Code should not be more than 3 characters" : "") : "Code is required";
        setErrors({
            ...temp
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(currencyService.initialFieldValues, validate, Code);

    const newCurrency = () => {
        setValues(currencyService.initialFieldValues);
        
    };

    //This is used since in get the null property is not returned
    function setFormValue(model: CurrencyModel) {
        let newModel = {
            Code: model.Code,
            Name: model.Name|| '',
        }
        return newModel;
    }
    useEffect(() => {
        if (Code) {
          getCurrency();
          setErrors({});
        } else newCurrency();
      }, [Code]);
    
      const getCurrency = () => {
        currencyService.getById(Code).then((response) => {
          if (response) {
            let result = response.data;
            setValues(setFormValue(result.data));
          }
        })
      };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (Code) {
                currencyService.put(values).then((response: any) => {
                    if (response) {
                        let result = response.data;
                        if (result.isSuccess) {
                            globalService.success("Currency  edited successfully.");
                            resetForm();
                            navigate("/Currency");
                        } else {
                            globalService.error(result.message);
                        }
                    }
                });
            } else {
                currencyService.post(values).then((response: any) => {
                    if (response) {
                        let result = response.data;
                        if (result.isSuccess) {
                            globalService.success("Currency added successfully.");
                            resetForm();
                            navigate("/Currency");
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
            <Title>{mode} Currency</Title>
            <>
                <form
                    autoComplete="off"
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Card>
                        <CardContent>
                            <React.Fragment>
                                <Grid container spacing={3}>
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
                                        <Controls.Input
                                            required
                                            label="Name"
                                            name="Name"
                                           value={values.Name}
                                           onChange={handleInputChange}
                                            error={errors.Name}
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </CardContent>
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Stack spacing={2} direction="row">
                                <Button type="submit" variant="contained">Submit</Button>
                                <Button variant="outlined" startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate("/Currency")}
                                >Back To List</Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </form>
            </>
        </div>
    )
}
export default CurrencyForm