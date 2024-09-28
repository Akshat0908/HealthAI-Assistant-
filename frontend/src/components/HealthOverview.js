import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthOverview = () => {
  return (
    <Paper elevation={3} sx={{ p: 3, height: '300px', position: 'relative', overflow: 'hidden' }}>
      <Typography variant="h5" gutterBottom>Heart health overview</Typography>
      <Box sx={{ position: 'absolute', right: '10%', top: '50%', transform: 'translateY(-50%)' }}>
        <FavoriteIcon sx={{ fontSize: 200, color: 'primary.main' }} />
      </Box>
      <Typography variant="body1" sx={{ maxWidth: '60%' }}>
        The secret to a healthy heart is maintaining a balanced diet and regular exercise. Here are some key factors:
        <ul>
          <li>Eat a diet rich in fruits, vegetables, and whole grains</li>
          <li>Exercise for at least 30 minutes a day, 5 days a week</li>
          <li>Maintain a healthy weight</li>
          <li>Avoid smoking and limit alcohol consumption</li>
          <li>Manage stress through relaxation techniques</li>
        </ul>
      </Typography>
    </Paper>
  );
};

export default HealthOverview;