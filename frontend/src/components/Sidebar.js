import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Switch, Drawer, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChatIcon from '@mui/icons-material/Chat';
import EventIcon from '@mui/icons-material/Event';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Import the medical icon
import { styled } from '@mui/material/styles';
import { formatEther } from 'ethers';

const StyledListItem = styled(ListItem)(({ theme, active }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  backgroundColor: active ? theme.palette.action.selected : 'transparent',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const Sidebar = ({ darkMode, toggleDarkMode, account, connectWallet, disconnectWallet, balance }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Chat', icon: <ChatIcon />, path: '/chat' },
    { text: 'Appointments', icon: <EventIcon />, path: '/appointments' },
    { text: 'Vitals', icon: <FavoriteIcon />, path: '/vitals' },
  ];

  const formatAccount = (account) => {
    if (typeof account === 'string' && account.length > 10) {
      return `${account.slice(0, 6)}...${account.slice(-4)}`;
    }
    return 'Not connected';
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ p: 2, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <LocalHospitalIcon sx={{ fontSize: 32, mr: 1, color: 'primary.main' }} /> {/* Add the logo here */}
        <Typography variant="h6">HealthAI Assistant</Typography>
      </Box>
      <List sx={{ flexGrow: 1, overflow: 'auto' }}>
        {menuItems.map((item) => (
          <StyledListItem
            button
            key={item.text}
            component={Link}
            to={item.path}
            active={location.pathname === item.path ? 1 : 0}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </StyledListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="subtitle2" gutterBottom>Ethereum Wallet</Typography>
        {account ? (
          <>
            <Typography variant="body2" noWrap sx={{ mb: 1 }}>
              {formatAccount(account)}
            </Typography>
            {balance && (
              <Typography variant="body2" sx={{ mb: 1 }}>
                Balance: {parseFloat(formatEther(balance)).toFixed(4)} ETH
              </Typography>
            )}
            <Button 
              variant="outlined" 
              size="small" 
              onClick={disconnectWallet}
              startIcon={<AccountBalanceWalletIcon />}
              fullWidth
            >
              Disconnect Wallet
            </Button>
          </>
        ) : (
          <Button 
            variant="contained" 
            size="small" 
            onClick={connectWallet}
            startIcon={<AccountBalanceWalletIcon />}
            fullWidth
          >
            Connect Wallet
          </Button>
        )}
      </Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Brightness4Icon sx={{ mr: 1 }} />
          <Typography>Dark Mode</Typography>
        </Box>
        <Switch checked={darkMode} onChange={toggleDarkMode} />
      </Box>
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;