import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Paper, List, ListItem, ListItemText, Avatar, Box, Fade, Grow, CircularProgress } from '@mui/material';
import { ENDPOINTS } from '../config/api';
import SendIcon from '@mui/icons-material/Send';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    setMessages([{ id: 0, text: "Hello, I'm your HealthAI Assistant. How can I assist you with your health concerns today?", user: false }]);
    scrollToBottom();
  }, []);

  const sendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: messages.length, text: inputText, user: true };
    setMessages([...messages, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      console.log('Sending request to:', ENDPOINTS.CHAT);
      const response = await axios.post(ENDPOINTS.CHAT, {
        messages: [
          { role: "system", content: "You are a HealthAI Assistant, simulating a knowledgeable and compassionate doctor. Provide concise, professional medical advice based on best practices. Always recommend consulting with a healthcare professional for personalized diagnosis and treatment. If the query is not health-related, politely redirect the conversation to health topics." },
          ...messages.map(msg => ({ role: msg.user ? "user" : "assistant", content: msg.text })),
          { role: "user", content: inputText }
        ],
        model: "Phi-3-mini-4k-instruct"
      });
      console.log('Received response:', response.data);

      const aiResponse = { id: messages.length + 1, text: response.data.choices[0].message.content, user: false };
      setMessages(prevMessages => [...prevMessages, aiResponse]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = `I apologize, but I'm experiencing technical difficulties. Please try again later or consult with a healthcare professional directly if you have urgent concerns.`;
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      setMessages(prevMessages => [...prevMessages, { id: messages.length + 1, text: errorMessage, user: false }]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', p: 3 }}>
      <Fade in={true} timeout={1000}>
        <Typography variant="h4" gutterBottom sx={{ 
          mb: 4, 
          textAlign: 'center', 
          color: '#FFFFFF',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontWeight: 'bold'
        }}>
          HealthAI Assistant Chat
        </Typography>
      </Fade>
      <Grow in={true} timeout={1500}>
        <Paper elevation={3} sx={{ flexGrow: 1, overflowY: 'auto', p: 2, mb: 2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
          <List>
            {messages.map((message) => (
              <ListItem key={message.id} sx={{ justifyContent: message.user ? 'flex-end' : 'flex-start' }}>
                {!message.user && (
                  <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>AI</Avatar>
                )}
                <Paper elevation={1} sx={{ 
                  p: 2, 
                  maxWidth: '70%', 
                  bgcolor: message.user ? 'primary.light' : 'white',
                  color: message.user ? 'white' : 'text.primary',
                  borderRadius: message.user ? '20px 20px 0 20px' : '20px 20px 20px 0'
                }}>
                  <ListItemText 
                    primary={message.text}
                    primaryTypographyProps={{ style: { whiteSpace: 'pre-wrap' } }}
                  />
                </Paper>
                {message.user && (
                  <Avatar sx={{ bgcolor: 'secondary.main', ml: 1 }}>You</Avatar>
                )}
              </ListItem>
            ))}
            {isTyping && (
              <ListItem sx={{ justifyContent: 'flex-start' }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>AI</Avatar>
                <Paper elevation={1} sx={{ 
                  p: 2, 
                  bgcolor: 'white',
                  borderRadius: '20px 20px 20px 0'
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    <Typography>Typing...</Typography>
                  </Box>
                </Paper>
              </ListItem>
            )}
            <div ref={messagesEndRef} />
          </List>
        </Paper>
      </Grow>
      <Fade in={true} timeout={2000}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            fullWidth
            variant="outlined"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your health question..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            sx={{ 
              mr: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                },
              },
              '& .MuiInputBase-input': {
                color: 'white',
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
            }}
            InputProps={{
              style: { color: 'white' }
            }}
          />
          <Button 
            variant="contained" 
            onClick={sendMessage} 
            endIcon={<SendIcon />}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              },
            }}
          >
            Send
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default ChatScreen;