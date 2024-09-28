import React from 'react';
import { Paper, Typography, Avatar, Box, Button } from '@mui/material';

const DoctorSelection = () => {
  const doctors = [
    { name: 'Dr. Smith', specialty: 'Cardiologist', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Dr. Johnson', specialty: 'Neurologist', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { name: 'Dr. Williams', specialty: 'Pediatrician', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { name: 'Dr. Brown', specialty: 'Dermatologist', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { name: 'Dr. Jones', specialty: 'Orthopedist', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
  ];

  return (
    <Paper elevation={3} sx={{ p: 3, height: '300px' }}>
      <Typography variant="h5" gutterBottom>Choose your personal doctor</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', my: 2 }}>
        {doctors.map((doctor, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Avatar alt={doctor.name} src={doctor.avatar} sx={{ width: 56, height: 56, margin: 'auto' }} />
            <Typography variant="caption">{doctor.name}</Typography>
            <Typography variant="caption" display="block">{doctor.specialty}</Typography>
          </Box>
        ))}
      </Box>
      <Button variant="contained" fullWidth>See all specialists</Button>
    </Paper>
  );
};

export default DoctorSelection;