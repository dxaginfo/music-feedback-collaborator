import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  MusicNote,
  Person,
  Logout,
  Add,
  Notifications,
  Settings,
} from '@mui/icons-material';

const Header: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState<null | HTMLElement>(null);
  
  // For demo purposes, let's assume the user is logged in
  const isLoggedIn = true;
  const userName = 'John Doe';
  const userAvatar = 'https://mui.com/static/images/avatar/1.jpg';
  
  // Mock notifications
  const notifications = [
    { id: 1, text: 'David commented on "Rhythm Section Breakdown"', time: '5 minutes ago' },
    { id: 2, text: 'Sarah uploaded a new version of "Melody Demo"', time: '2 hours ago' },
    { id: 3, text: 'Project "Summer Album" deadline tomorrow', time: '1 day ago' },
  ];

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationsOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const drawerContent = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={RouterLink} to="/">
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={RouterLink} to="/projects">
          <ListItemIcon>
            <MusicNote />
          </ListItemIcon>
          <ListItemText primary="Projects" />
        </ListItem>
      </List>
      <Divider />
      {isLoggedIn ? (
        <List>
          <ListItem button component={RouterLink} to="/profile">
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button component={RouterLink} to="/settings">
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button component={RouterLink} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button component={RouterLink} to="/register">
            <ListItemText primary="Register" />
          </ListItem>
        </List>
      )}
    </Box>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
          Music Feedback Collaborator
        </Typography>
        
        {isLoggedIn ? (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              color="inherit"
              startIcon={<Add />}
              component={RouterLink}
              to="/projects/new"
              sx={{ mr: 2 }}
            >
              New Project
            </Button>
            
            <IconButton color="inherit" onClick={handleNotificationsOpen} sx={{ mr: 2 }}>
              <Notifications />
            </IconButton>
            
            <IconButton onClick={handleUserMenuOpen} color="inherit">
              <Avatar alt={userName} src={userAvatar} sx={{ width: 32, height: 32 }} />
            </IconButton>
            
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              keepMounted
            >
              <MenuItem component={RouterLink} to="/profile" onClick={handleUserMenuClose}>
                Profile
              </MenuItem>
              <MenuItem component={RouterLink} to="/settings" onClick={handleUserMenuClose}>
                Settings
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleUserMenuClose}>Logout</MenuItem>
            </Menu>
            
            <Menu
              anchorEl={notificationsAnchor}
              open={Boolean(notificationsAnchor)}
              onClose={handleNotificationsClose}
              keepMounted
              PaperProps={{
                sx: { width: 320, maxHeight: 500 },
              }}
            >
              <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
                <Typography variant="subtitle1">Notifications</Typography>
              </Box>
              {notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleNotificationsClose}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', py: 1 }}>
                    <Typography variant="body2">{notification.text}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
              <Box sx={{ p: 1, borderTop: '1px solid #eee', textAlign: 'center' }}>
                <Button size="small" component={RouterLink} to="/notifications">
                  See all notifications
                </Button>
              </Box>
            </Menu>
          </Box>
        ) : (
          <Box>
            <Button color="inherit" component={RouterLink} to="/login" sx={{ mr: 1 }}>
              Login
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              component={RouterLink}
              to="/register"
            >
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
      
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerContent}
      </Drawer>
    </AppBar>
  );
};

export default Header;