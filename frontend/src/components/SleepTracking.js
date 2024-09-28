import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SleepTracking = () => {
  const sleepData = [
    { day: 'Mon', hours: 7 },
    { day: 'Tue', hours: 6.5 },
    { day: 'Wed', hours: 8 },
    { day: 'Thu', hours: 7.5 },
    { day: 'Fri', hours: 6 },
    { day: 'Sat', hours: 9 },
    { day: 'Sun', hours: 8.5 },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, height: '300px', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" gutterBottom>Sleep tracking</Typography>
      <Box sx={{ flexGrow: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={sleepData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
      <Typography variant="body2">Average sleep: 7.5 hours</Typography>
    </Paper>
  );
};

export default SleepTracking;