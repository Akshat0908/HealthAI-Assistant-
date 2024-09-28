import React, { useMemo } from 'react';
import { Paper, Typography, Box, CircularProgress, List, ListItem, ListItemIcon, ListItemText, LinearProgress } from '@mui/material';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';

const RecoveryGoal = React.memo(() => {
  const progress = 75; // Example progress value

  const goals = useMemo(() => [
    { text: "30 min cardio", icon: <DirectionsRunIcon />, progress: 100 },
    { text: "5 veg servings", icon: <RestaurantIcon />, progress: 80 },
    { text: "8h sleep", icon: <NightsStayIcon />, progress: 90 },
    { text: "10k steps", icon: <DirectionsWalkIcon />, progress: 70 },
  ], []);

  return (
    <Paper elevation={3} sx={{ p: 2, height: '300px', display: 'flex', flexDirection: 'column', bgcolor: 'background.default' }}>
      <Typography variant="h6" gutterBottom align="center" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
        Recovery Goal
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
        <Box sx={{ position: 'relative', display: 'inline-flex', mr: 2 }}>
          <CircularProgress variant="determinate" value={progress} size={80} thickness={4} sx={{ color: 'success.main' }} />
          <Box
            sx={{
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h5" component="div" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="body1" align="center" sx={{ fontWeight: 'bold' }}>Daily goals</Typography>
          <Typography variant="body2" align="center" color="text.secondary">completed</Typography>
        </Box>
      </Box>
      <List dense sx={{ width: '100%', maxWidth: 360, mx: 'auto', overflow: 'auto' }}>
        {goals.map((goal, index) => (
          <ListItem key={index} sx={{ px: 0, py: 1 }}>
            <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
              {goal.icon}
            </ListItemIcon>
            <ListItemText 
              primary={goal.text} 
              primaryTypographyProps={{ 
                variant: 'body2', 
                style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold' } 
              }} 
              secondary={
                <LinearProgress 
                  variant="determinate" 
                  value={goal.progress} 
                  sx={{ 
                    mt: 0.5, 
                    height: 6, 
                    borderRadius: 3,
                    backgroundColor: 'grey.300',
                    '& .MuiLinearProgress-bar': {
                      borderRadius: 3,
                      backgroundColor: goal.progress === 100 ? 'success.main' : 'primary.main',
                    },
                  }} 
                />
              }
            />
            <Typography variant="caption" sx={{ ml: 1, minWidth: 30, textAlign: 'right' }}>
              {`${goal.progress}%`}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
});

export default RecoveryGoal;