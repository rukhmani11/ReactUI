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

const BusinessSegmentForm = () => {

    const { id }: any = useParams();
    let navigate = useNavigate();
    const { auth } = React.useContext(AuthContext);
    const { Code }: any = useParams();
    const mode = id ? 'Edit' : 'Create';


    const validate = (fieldValues: BusinessSegmentsModel = values) => {
        let temp: any = { ...errors };
        if ("Name" in fieldValues)
        temp.Name = fieldValues.Name ? "" : "Name is required.";
        if ("Code" in fieldValues)
        temp.Code = fieldValues.Code ? "" : "Code is required.";
        // if ("Code" in fieldValues)
        //  temp.Code = fieldValues.Code 
        // ?fieldValues.Code.length <= 10 ? "Code should not be more than 10 characters" : "" : "Code is Required";
        setErrors({
            ...temp
        });
        // if ("Active" in fieldValues)
        // temp.Active = fieldValues.Active ? "" : "Active is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(businessSegmentsService.initialFieldValues, validate, id);

    const newbusinessSegments = () => {
        setValues(businessSegmentsService.initialFieldValues);
        
    };

    //This is used since in get the null property is not returned
    function setFormValue(model: BusinessSegmentsModel) {
        let newModel = {
            Id: model.Id,
            Name: model.Name|| '',
            Code : model.Code|| '',
            Active: model.Active,
        }
        return newModel;
    }
    useEffect(() => {
        if (id) {
          getbusinessSegments();
          setErrors({});
        } else newbusinessSegments();
      }, [id]);
    
      const getbusinessSegments = () => {
        businessSegmentsService.getById(id).then((response) => {
          if (response) {
            let result = response.data;
            setValues(setFormValue(result.data));
          }
        })
      };
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            if (id) {
                businessSegmentsService.put(values).then((response: any) => {
                    if (response) {
                        let result = response.data;
                        if (result.isSuccess) {
                            globalService.success("Business Segment edited successfully.");
                            resetForm();
                            navigate("/businessSegments");
                        } else {
                            globalService.error(result.message);
                        }
                    }
                });
            } else {
                businessSegmentsService.post(values).then((response: any) => {
                    if (response) {
                        let result = response.data;
                        if (result.isSuccess) {
                            globalService.success("Business Segment added successfully.");
                            resetForm();
                            navigate("/businessSegments");
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
            <Title>{mode} Business Segment</Title>
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
                                            label="Code"
                                            name="Code"
                                            length={10}
                                           value={values.Code}
                                            onChange={handleInputChange}
                                            error={errors.Code}
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
                        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Stack spacing={2} direction="row">
                                <Button type="submit" variant="contained">Submit</Button>
                                <Button variant="outlined" startIcon={<ArrowBackIcon />}
                                    onClick={() => navigate("/businessSegments")}
                                >Back To List</Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </form>
            </>
        </div>
    )
}
export default BusinessSegmentForm