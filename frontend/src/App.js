import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { BrowserProvider } from 'ethers';
import HomeScreen from './screens/HomeScreen';
import ChatScreen from './screens/ChatScreen';
import AppointmentsScreen from './screens/AppointmentsScreen';
import VitalsScreen from './screens/VitalsScreen';
import Sidebar from './components/Sidebar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [account, setAccount] = useState(null);
  const [provider, setProvider] = useState(null);
  const [balance, setBalance] = useState(null);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#4A90E2',
      },
      secondary: {
        main: '#50E3C2',
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        setProvider(provider);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
        const balance = await provider.getBalance(address);
        setBalance(balance.toString());
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      console.log('Ethereum object not found, install MetaMask.');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    setProvider(null);
    setBalance(null);
  };

  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        try {
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setProvider(provider);
            setAccount(accounts[0]);
            const balance = await provider.getBalance(accounts[0]);
            setBalance(balance.toString());
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkConnection();
  }, []);

  useEffect(() => {
    if (provider && account) {
      const fetchBalance = async () => {
        const balance = await provider.getBalance(account);
        setBalance(balance.toString());
      };
      fetchBalance();
    }
  }, [provider, account]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          <Sidebar 
            darkMode={darkMode} 
            toggleDarkMode={toggleDarkMode} 
            account={account}
            connectWallet={connectWallet}
            disconnectWallet={disconnectWallet}
            balance={balance}
          />
          <Box component="main" sx={{ flexGrow: 1, overflow: 'auto', position: 'relative', p: 3 }}>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/chat" element={<ChatScreen />} />
              <Route path="/appointments" element={<AppointmentsScreen />} />
              <Route path="/vitals" element={<VitalsScreen />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;