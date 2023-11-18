import React, { useEffect, useState } from 'react'
import Title from '../helper/Title'
import { Card, CardHeader, CardContent, Typography, CardActions, Button, Grid, Stack, TextField } from '@mui/material'
import Controls from '../../utility/controls/Controls'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom'
import { SelectListModel } from '../../models/ApiResponse'
import { globalService } from '../../services/GlobalService'
import { StandardOpportunityModel } from '../../models/StandardOpportunityModel';
import { standardOpportunityService } from '../../services/StandardOpportunityService';
import useForm from '../../utility/hooks/UseForm';
import { businessSegmentsService } from '../../services/BusinessSegmentsService';

const StandardOpportunityForm = () => {
  const { id }: any = useParams();
  const [businessSegments, setBusinessSegments] = useState<SelectListModel[]>([]);
 const mode =  id? 'Edit' : 'Create';
  let navigate = useNavigate();
  
  
  const validate = (fieldValues: StandardOpportunityModel = values) => {
    let temp: any = { ...errors };
    if ("Name" in fieldValues)
    temp.Name = fieldValues.Name ? "" : "Name is required.";
    if ("BusinessSegmentId" in fieldValues)
    temp.BusinessSegmentId = fieldValues.BusinessSegmentId ? "" : "Business Segment is required.";
    if ("Description" in fieldValues)
    temp.Description = fieldValues.Description ? "" : "Description is required.";
    if ("Sequence" in fieldValues) temp.Sequence = fieldValues.Sequence? "": "Sequence is required";
    temp.Sequence = fieldValues.Sequence ? (temp.Sequence = /^[0-9\b]+$/.test(fieldValues.Sequence.toString())? "" : "Sequence is not valid.") : "Sequence is required";
 
    setErrors({
        ...temp,
    });

    if (fieldValues === values)
        return Object.values(temp).every((x) => x === "");
};

const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(standardOpportunityService.initialFieldValues, validate, id);

const newstandardOpportunitys = () => {
    setValues(standardOpportunityService.initialFieldValues);
    
};
function setFormValue(model: StandardOpportunityModel) {
    let newModel = {
        Id: model.Id,
        Name: model.Name|| '',
        Active: model.Active,
        Description: model.Description || '',
        Sequence: model.Sequence || '',
        BusinessSegmentId: model.BusinessSegmentId, 
    }
    return newModel;
}
useEffect(() => {
  if (businessSegments.length === 0) getbusinessSegments();
    if (id) {
      getstandardOpportunity();
      setErrors({});
    } else newstandardOpportunitys();
  }, [id]);

  const getstandardOpportunity = () => {
    standardOpportunityService.getById(id).then((response) => {
      if (response) {
        let result = response.data;
        setValues(setFormValue(result.data));
      }
    })
  };
  const getbusinessSegments = () => {
    businessSegmentsService.getSelectList().then((response: any) => {
      setBusinessSegments(response.data);
    });
  };
const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
        if (id) {
          standardOpportunityService.put(values).then((response: any) => {
                if (response) {
                    let result = response.data;
                    if (result.isSuccess) {
                        globalService.success("Standard Opportunity edited successfully.");
                        resetForm();
                        navigate("/standardOpportunities");
                    } else {
                        globalService.error(result.message);
                    }
                }
            });
        } else {
          standardOpportunityService.post(values).then((response: any) => {
                if (response) {
                    let result = response.data;
                    if (result.isSuccess) {
                        globalService.success("Standard Opportunity added successfully.");
                        resetForm();
                        navigate("/standardOpportunities");
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
      <Title>{mode} Standard Opportunity</Title>
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
                    <Controls.Select
                      name="BusinessSegmentId"
                      showEmptyItem={false}
                      label="Business Segment*"
                      required
                      options={businessSegments}
                    value={businessSegments.length > 0 ? values.BusinessSegmentId : ""}
                    onChange={handleInputChange}
                    error={errors.BusinessSegmentId}
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
                      label="Description"
                      name="Description"
                      multiline
                    value={values.Description}
                    onChange={handleInputChange}
                    error={errors.Description}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Controls.Input
                    required
                      label="Sequence"
                      name="Sequence"
                      type="number"
                    value={values.Sequence}
                    onChange={handleInputChange}
                    error={errors.Sequence}
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
                  onClick={() => navigate("/standardOpportunities")}
                >Back To List</Button>
              </Stack>
            </CardActions>
          </Card>
        </form>
      </>
    </div>
  )
}

export default StandardOpportunityForm
