import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../utility/context/AuthContext';
import { BusinessSubSegmentsModel } from '../../models/BusinessSubSegmentModel';
import { businessSubSegmentsService } from '../../services/BusinessSubSegmentsService';
import useForm from '../../utility/hooks/UseForm';
import { globalService } from '../../services/GlobalService';
import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Title } from '@mui/icons-material';
import Controls from '../../utility/controls/Controls';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { SelectListModel } from '../../models/ApiResponse';

const BusinessSubSegmentForm = () => {

    const { id, businessSegmentId}: any = useParams();
    const [businessSubSegments, setbusinessSubSegments] = useState<SelectListModel[]>([]);

    //const { auth } = React.useContext(AuthContext);
    const mode = id ? 'Edit' : 'Create';
    const prevPgState = useLocation();
    let navigate = useNavigate();

    const validate = (fieldValues: BusinessSubSegmentsModel = values) => {
        let temp: any = { ...errors };
        if ("Name" in fieldValues)
        temp.Name = fieldValues.Name ? "" : "Name is required.";
        //if ("Active" in fieldValues)
       // temp.Active = fieldValues.Active ? "" : "Active is required.";
        setErrors({
            ...temp,
        });

        if (fieldValues === values)
            return Object.values(temp).every((x) => x === "");
    };

    const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
        useForm(businessSubSegmentsService.initialFieldValues, validate, id);

    const newbusinessSubSegments = () => {
        setValues(businessSubSegmentsService.initialFieldValues);
        
    };

    function setFormValue(model: BusinessSubSegmentsModel) {
        let newModel = {
            Id: model.Id,
            Name: model.Name||"",
            Active: model.Active || false,
        }
        return newModel;
    }


useEffect(() => {
    if (id) {
        getbusinessSubSegments();
      setErrors({});
    } else newbusinessSubSegments();
  }, [id]);

    
      const getbusinessSubSegments = () => {
        businessSubSegmentsService.getById(id).then((response) => {
          if (response) {
            let result = response.data;
            setValues(setFormValue(result.data));
          }
        })
      };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            values.BusinessSegmentId = businessSegmentId;
            
            if (id) {
                businessSubSegmentsService.put(values).then((response: any) => {
                    if (response) {
                        
                        let result = response.data;
                        if (result.isSuccess) {
                            globalService.success("Business Sub Segment edited successfully.");
                            resetForm();
                            navigate("/businessSubSegments" + "/" + businessSegmentId);
                        } else {
                            globalService.error(result.message);
                        }
                    }
                });
            } else {
                businessSubSegmentsService.post(values).then((response: any) => {
                    if (response) {
                        let result = response.data;
                        if (result.isSuccess) {
                            globalService.success("Business Sub Segment added successfully.");
                            resetForm();
                            navigate("/businessSubSegments" + "/" + businessSegmentId);
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
          <Typography variant="h6" align="center">
            Business Sub Segment
          </Typography>
          {prevPgState && prevPgState.state && prevPgState.state.row && (
            <Typography variant="body1">
              <b>Sub Segment Name: </b>
              {prevPgState.state.row.Name}{" "}
            </Typography>
          )}
        </Stack>
           
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
                                    onClick={() => navigate("/businessSubSegments/" + businessSegmentId)}
                                >Back To List</Button>
                            </Stack>
                        </CardActions>
                    </Card>
                </form>
            </>
        </div>
  )
}

export default BusinessSubSegmentForm
