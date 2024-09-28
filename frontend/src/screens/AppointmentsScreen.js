import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Typography, Button, List, ListItem, ListItemText, Paper, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Box, Avatar } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { styled } from '@mui/material/styles';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const AppointmentAvatar = styled(Avatar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
}));

const AppointmentsScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [open, setOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ date: '', time: '', doctor: '', reason: '' });

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.getAppointments();
      setAppointments(response.data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting appointment:', newAppointment);
      const response = await api.createAppointment(newAppointment);
      console.log('Appointment created:', response.data);
      setOpen(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
        Appointments
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3, height: '70vh', overflow: 'auto', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">Upcoming Appointments</Typography>
              <Button variant="contained" onClick={handleClickOpen} startIcon={<EventIcon />}>
                Add Appointment
              </Button>
            </Box>
            {appointments.length > 0 ? (
              <List>
                {appointments.map((appointment) => (
                  <StyledListItem key={appointment.id}>
                    <AppointmentAvatar>
                      {appointment.doctor.charAt(0)}
                    </AppointmentAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="subtitle1" component="span" sx={{ fontWeight: 'bold' }}>
                          {appointment.doctor}
                        </Typography>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" sx={{ display: 'block', color: 'text.primary' }}>
                            Date: {appointment.date} at {appointment.time}
                          </Typography>
                          <Typography component="span" variant="body2" sx={{ display: 'block', color: 'text.secondary' }}>
                            Reason: {appointment.reason}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </StyledListItem>
                ))}
              </List>
            ) : (
              <Typography>No upcoming appointments.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Appointment</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            label="Date"
            type="date"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="time"
            label="Time"
            type="time"
            fullWidth
            variant="outlined"
            InputLabelProps={{ shrink: true }}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="doctor"
            label="Doctor"
            type="text"
            fullWidth
            variant="outlined"
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="reason"
            label="Reason"
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

export default AppointmentsScreen;