import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import Title from '../helper/Title';
import { CardActionArea, Card, CardContent, Typography } from '@mui/material';

export default function Dashboard() {
  const featuredPosts = [
    {
        title: 'Users',
        total: 23,
        description:
            'Any content here.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Clients',
        total: 10,
        description:
            'Any content here.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Business Units',
        total: 100,
        description:
            'Any content here.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
    {
        title: 'Designations',
        total: 101,
        description:
            'Any content here.',
        image: 'https://source.unsplash.com/random',
        imageLabel: 'Image Text',
    },
];
function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}

  return (
    <>
      <Title>Dashboard</Title>
      <Grid container spacing={2}>
            {featuredPosts.map((post) => (
                <Grid item xs={6} md={3} key={post.title}>
                    <CardActionArea component="a" href="#">
                        <Card sx={{ display: 'flex' }}>
                            <CardContent sx={{ flex: 1 }}>
                                <Typography component="h2" variant="h5">
                                    {post.title}
                                </Typography>
                                <Typography component="p" variant="h4">
                                    {post.total}
                                </Typography>
                                {/* <Typography variant="subtitle1" color="text.secondary">

                                </Typography> */}
                                <Typography variant="subtitle1" paragraph>
                                    {post.description}
                                </Typography>
                                <Typography variant="subtitle1" color="primary">
                                    Continue reading...
                                </Typography>
                            </CardContent>
                            {/* <CardMedia
                                component="img"
                                sx={{ width: 60, display: { xs: 'none', sm: 'block' } }}
                                image={post.image}
                                alt={post.imageLabel}
                            /> */}
                        </Card>
                    </CardActionArea>
                </Grid>
            ))}
        </Grid>
      
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Chart />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}