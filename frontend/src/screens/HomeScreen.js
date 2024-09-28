import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography } from '@mui/material';
import HealthOverview from '../components/HealthOverview';
import DoctorSelection from '../components/DoctorSelection';
import SleepTracking from '../components/SleepTracking';
import RecoveryGoal from '../components/RecoveryGoal';
import api from '../services/api';

const HomeScreen = () => {
  const [healthTips, setHealthTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  useEffect(() => {
    const fetchHealthTips = async () => {
      try {
        const response = await api.getHealthTips();
        setHealthTips(response.data);
      } catch (error) {
        console.error('Error fetching health tips:', error);
      }
    };
    fetchHealthTips();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex + 1) % healthTips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [healthTips]);

  return (
    <Box sx={{ flexGrow: 1, p: 3, overflow: 'hidden' }}>
      <Typography variant="h4" gutterBottom sx={{ 
        mb: 4, 
        textAlign: 'center', 
        color: '#FFFFFF',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        fontWeight: 'bold'
      }}>
        Welcome to Your Health Dashboard
      </Typography>
      
      {healthTips.length > 0 && (
        <Box sx={{ mb: 4, textAlign: 'center', height: '50px' }}>
          <Typography variant="h6" sx={{ color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            Tip of the Day:
          </Typography>
          <Typography sx={{ color: '#FFFFFF', textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
            {healthTips[currentTipIndex]}
          </Typography>
        </Box>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <HealthOverview />
        </Grid>
        <Grid item xs={12} md={6}>
          <DoctorSelection />
        </Grid>
        <Grid item xs={12} md={6}>
          <SleepTracking />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecoveryGoal />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;