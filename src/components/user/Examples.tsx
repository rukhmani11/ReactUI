import React, { useState } from 'react'
import { Box, Grid, Stack, TextField, CardHeader, CardActionArea, CardActions, Card, CardContent, CardMedia, FormControlLabel, Checkbox, Button, AppBar, Container, CssBaseline, Paper, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { globalService } from '../../services/GlobalService';
import Controls from "../../utility/controls/Controls";

function Examples() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <>

      <Card>
        <CardHeader title="Title Goes Here 111" />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2} direction="row">
            <Button type="submit" variant="contained">Submit</Button>
            <Button variant="outlined" startIcon={<ArrowBackIcon />} href="/admin">Back To List</Button>
          </Stack>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>

      <Container component="main" maxWidth="lg" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography variant="h5" align="center">
            User
          </Typography>

          <React.Fragment>
            {/* <Typography variant="h6" gutterBottom>
           Shipping address
         </Typography> 
         className='dvGrid'*/}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last name"
                  fullWidth
                  autoComplete="family-name"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
              <Controls.ReactDatePicker
                      label="Start Date"
                      selected={startDate}
                      onChange={(date: any) => setStartDate(date)}
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="d MMM yyyy h:mm aa"
                    />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address1"
                  name="address1"
                  label="Address line 1"
                  fullWidth
                  autoComplete="shipping address-line1"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="address2"
                  name="address2"
                  label="Address line 2"
                  fullWidth
                  autoComplete="shipping address-line2"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="country"
                  name="country"
                  label="Country"
                  fullWidth
                  autoComplete="shipping country"
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                />
              </Grid>
             
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                  label="Use this address for payment details"
                />
              </Grid>
            </Grid>

            {/* <Box sx={{ display: 'flex', justifyContent: 'center' }}> */}
            <Button color='primary'
              variant="contained"
              //onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              Next
            </Button>
            {/* </Box> */}
          </React.Fragment>
        </Paper>
      </Container>

       <div style={{ height: 400, width: '100%' }}>
      {/* <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          pagination: {
            ...data.initialState?.pagination,
            paginationModel: {
              pageSize: 25,
               page: 0 // default value will be used if not passed 
            },
          },
        }}
      /> */}
    </div>
    </>
  )
}

export default Examples

