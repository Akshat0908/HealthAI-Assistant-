import React, { useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { Typography, Paper, Grid, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { format, subDays } from 'date-fns';
import AddIcon from '@mui/icons-material/Add';

const VitalsScreen = () => {
  const [vitals, setVitals] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [open, setOpen] = useState(false);
  const [newVital, setNewVital] = useState({ type: '', value: '' });

  useEffect(() => {
    fetchVitals();
  }, []);

  const fetchVitals = async () => {
    try {
      const response = await api.getVitals();
      setVitals(response.data);
    } catch (error) {
      console.error('Error fetching vitals:', error);
    }
  };

  const prepareChartData = useCallback(() => {
    const today = new Date();
    const data = Array.from({ length: 14 }, (_, i) => ({
      date: format(subDays(today, 13 - i), 'MM/dd'),
    }));

    vitals.forEach(vital => {
      const date = format(new Date(vital.date), 'MM/dd');
      const dataPoint = data.find(d => d.date === date);
      if (dataPoint) {
        dataPoint[vital.type] = parseFloat(vital.value);
      }
    });

    setChartData(data);
  }, [vitals]);

  useEffect(() => {
    prepareChartData();
  }, [vitals, prepareChartData]);

  const renderLineChart = (dataKey, color) => (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <defs>
          <linearGradient id={`color${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
            <stop offset="95%" stopColor={color} stopOpacity={0.2}/>
          </linearGradient>
        </defs>
        <Line 
          type="monotone" 
          dataKey={dataKey} 
          stroke={color} 
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 8 }}
          fill={`url(#color${dataKey})`}
          animationDuration={1500}
          animationEasing="ease-in-out"
        />
      </LineChart>
    </ResponsiveContainer>
  );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewVital({ ...newVital, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.addVital(newVital);
      setOpen(false);
      fetchVitals();
    } catch (error) {
      console.error('Error adding vital:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Vitals Tracking
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
          Add Vital
        </Button>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Heart Rate</Typography>
            {renderLineChart('Heart Rate', '#ffffff')}
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>Blood Pressure</Typography>
            {renderLineChart('Blood Pressure', '#ffffff')}
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Vital</DialogTitle>
        <DialogContent>
          <TextField
            select
            margin="dense"
            name="type"
            label="Vital Type"
            fullWidth
            variant="outlined"
            onChange={handleChange}
            value={newVital.type}
          >
            <MenuItem value="Heart Rate">Heart Rate</MenuItem>
            <MenuItem value="Blood Pressure">Blood Pressure</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="value"
            label="Value"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default VitalsScreen;