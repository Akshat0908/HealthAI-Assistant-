import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const Navbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <LocalHospitalIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          HealthAI Assistant
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/chat">Chat</Button>
          <Button color="inherit" component={Link} to="/appointments">Appointments</Button>
          <Button color="inherit" component={Link} to="/vitals">Vitals</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;