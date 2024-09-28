import axios from 'axios';
import { ENDPOINTS } from '../config/api';
import { subDays, format } from 'date-fns';

const generateSampleVitals = () => {
  const types = ['Heart Rate', 'Blood Pressure'];
  const vitals = [];
  const today = new Date();

  for (let i = 0; i < 14; i++) {
    const date = subDays(today, 13 - i);
    types.forEach(type => {
      let value;
      switch(type) {
        case 'Blood Pressure':
          value = `${Math.floor(Math.random() * 40 + 100)}/${Math.floor(Math.random() * 40 + 60)}`;
          break;
        case 'Heart Rate':
          value = Math.floor(Math.random() * 40 + 60).toString();
          break;
        default:
          value = Math.floor(Math.random() * 100).toString();
      }
      vitals.push({
        id: Date.now() + Math.random(),
        date: format(date, 'yyyy-MM-dd'),
        type: type,
        value: value
      });
    });
  }
  return vitals;
};

const api = {
  sendChatMessage: (message) => axios.post(ENDPOINTS.CHAT, { messages: [{ role: "user", content: message }], model: "Phi-3-mini-4k-instruct" }),
  
  getAppointments: () => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return Promise.resolve({ data: appointments });
  },
  
  createAppointment: (appointmentData) => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = { ...appointmentData, id: Date.now() };
    appointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    return Promise.resolve({ data: newAppointment });
  },
  
  getVitals: () => {
    let vitals = JSON.parse(localStorage.getItem('vitals') || '[]');
    if (vitals.length === 0) {
      vitals = generateSampleVitals();
      localStorage.setItem('vitals', JSON.stringify(vitals));
    }
    return Promise.resolve({ data: vitals });
  },
  
  addVital: (vitalData) => {
    const vitals = JSON.parse(localStorage.getItem('vitals') || '[]');
    const newVital = { ...vitalData, id: Date.now(), date: new Date().toISOString() };
    vitals.push(newVital);
    localStorage.setItem('vitals', JSON.stringify(vitals));
    return Promise.resolve({ data: newVital });
  },
  
  deleteVital: (id) => {
    const vitals = JSON.parse(localStorage.getItem('vitals') || '[]');
    const updatedVitals = vitals.filter(vital => vital.id !== id);
    localStorage.setItem('vitals', JSON.stringify(updatedVitals));
    return Promise.resolve({ data: id });
  },
  
  getHealthTips: () => {
    const tips = [
      "Stay hydrated! Aim for 8 glasses of water a day.",
      "Take a 5-minute break every hour to stretch and move around.",
      "Incorporate colorful fruits and vegetables into your meals for a nutrient boost.",
      "Practice deep breathing exercises to reduce stress and improve focus.",
      "Aim for 7-9 hours of sleep each night for optimal health.",
    ];
    return Promise.resolve({ data: tips });
  },
};

export default api;