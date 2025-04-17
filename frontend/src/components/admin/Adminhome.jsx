// AdminDashboard.jsx

import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Drawer, List, ListItem, ListItemIcon,
  ListItemText, AppBar, Toolbar, IconButton, Avatar, Divider, Button, Menu, MenuItem, CssBaseline, Collapse
} from '@mui/material';
import {
  ExpandLess, ExpandMore, Menu as MenuIcon,
  People as PeopleIcon, Monitor as MonitorIcon, Feedback as FeedbackIcon, Dashboard as DashboardIcon
} from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const collapsedWidth = 70;

const pieData = [
  { name: 'Users', value: 400 },
  { name: 'Activities', value: 300 },
  { name: 'Feedback', value: 200 },
  { name: 'Other', value: 100 },
];
const COLORS = ['#ff69b4', '#f06292', '#ec407a', '#ad1457'];

const AdminDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [userSubmenuOpen, setUserSubmenuOpen] = useState(false);
  const [feedbackSubmenuOpen, setFeedbackSubmenuOpen] = useState(false);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };
  const handleChangePassword = () => navigate('/change-password');
  const toggleDrawer = () => setIsCollapsed(!isCollapsed);

  const handleSubmenuToggle = (menuType) => {
    if (menuType === 'user') {
      setUserSubmenuOpen(!userSubmenuOpen);
    } else if (menuType === 'feedback') {
      setFeedbackSubmenuOpen(!feedbackSubmenuOpen);
    }
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/adminhome' },
    {
      text: 'User Management',
      icon: <PeopleIcon />,
      submenu: [
        { text: 'Parent', path: '/admin/users/parents' },
        { text: 'Pediatrician', path: '/admin/users/pediatricians' },
      ],
    },
    { text: 'Activity Monitoring', icon: <MonitorIcon />, path: '/admin/monitor' },
    {
      text: 'Feedback',
      icon: <FeedbackIcon />,
      submenu: [
        { text: 'View Feedback', path: '/admin/feedback/view' },
        { text: 'Respond Feedback', path: '/admin/feedback/respond' },
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: isCollapsed ? collapsedWidth : drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: isCollapsed ? collapsedWidth : drawerWidth,
            background: '#ffe4ec',
            boxSizing: 'border-box',
            transition: 'width 0.3s ease-in-out',
            overflowX: 'hidden',
          },
        }}
      >
        <Toolbar sx={{ justifyContent: isCollapsed ? 'center' : 'space-between', px: 2 }}>
          {!isCollapsed && (
            <Typography variant="h6" sx={{ color: '#d81b60' }}>
              ChildCare
            </Typography>
          )}
          <IconButton onClick={toggleDrawer} sx={{ color: '#d81b60' }}>
            <MenuIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            if (item.submenu) {
              const isUserMenu = item.text === 'User Management';
              const isFeedbackMenu = item.text === 'Feedback';
              const openSubmenu = isUserMenu ? userSubmenuOpen : feedbackSubmenuOpen;

              return (
                <Box key={item.text}>
                  <ListItem
                    button
                    onClick={() => handleSubmenuToggle(isUserMenu ? 'user' : 'feedback')}
                    sx={{
                      borderRadius: 1,
                      mx: 1,
                      my: 1,
                      py: 0.5,
                      px: 1,
                      '&:hover': {
                        backgroundColor: '#fce4ec',
                        transform: 'scale(1.02)',
                      },
                      cursor: 'pointer',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: '#d81b60',
                        minWidth: 30,
                        mr: isCollapsed ? 0 : 1,
                        justifyContent: 'center',
                        cursor: 'pointer',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {!isCollapsed && (
                      <>
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{ fontSize: '0.9rem', fontWeight: 500 }}
                        />
                        {openSubmenu ? <ExpandLess /> : <ExpandMore />}
                      </>
                    )}
                  </ListItem>
                  <Collapse in={openSubmenu} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.submenu.map((sub) => (
                        <ListItem
                          key={sub.text}
                          button
                          onClick={() => navigate(sub.path)}
                          sx={{
                            pl: isCollapsed ? 2 : 4,
                            backgroundColor: location.pathname === sub.path ? '#f8bbd0' : 'transparent',
                            '&:hover': {
                              backgroundColor: '#fce4ec',
                            },
                            cursor: 'pointer',
                          }}
                        >
                          <ListItemText
                            primary={sub.text}
                            primaryTypographyProps={{
                              fontSize: '0.85rem',
                              color: location.pathname === sub.path ? '#880e4f' : '#000',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Box>
              );
            }

            return (
              <ListItem
                button
                key={item.text}
                onClick={() => navigate(item.path)}
                sx={{
                  backgroundColor: isActive ? '#f8bbd0' : 'transparent',
                  borderRadius: 1,
                  mx: 1,
                  my: 1,
                  py: 0.5,
                  px: 1,
                  '&:hover': {
                    backgroundColor: '#fce4ec',
                    transform: 'scale(1.02)',
                  },
                  cursor: 'pointer',
                }}
              >
                <ListItemIcon
                  sx={{
                    color: isActive ? '#880e4f' : '#d81b60',
                    minWidth: 30,
                    mr: isCollapsed ? 0 : 1,
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 'bold' : 500,
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ position: 'absolute', bottom: 16, width: '100%', px: 2 }}>
          <Button
            variant="contained"
            fullWidth={!isCollapsed}
            onClick={handleLogout}
            sx={{
              backgroundColor: '#f06292',
              color: '#fff',
              borderRadius: 1,
              fontWeight: 'bold',
              px: 2,
              '&:hover': {
                backgroundColor: '#ec407a',
              },
            }}
          >
            {!isCollapsed ? 'Logout' : '🚪'}
          </Button>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#fdf6f9', minHeight: '100vh' }}>
        <AppBar position="static" sx={{ backgroundColor: '#d81b60', borderRadius: 2 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
            <IconButton onClick={handleMenuOpen} color="inherit">
              <Avatar alt="Admin" src="/avatar.jpg" />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose} sx={{ mt: '45px' }}>
              <MenuItem onClick={handleChangePassword}>Change Password</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>

        {/* Summary Cards */}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#f06292', color: 'white' }}>
              <CardContent>
                <Typography variant="h5">258</Typography>
                <Typography>Registered Users</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#f48fb1', color: 'white' }}>
              <CardContent>
                <Typography variant="h5">123</Typography>
                <Typography>Activities Logged</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ backgroundColor: '#f8bbd0', color: 'white' }}>
              <CardContent>
                <Typography variant="h5">43</Typography>
                <Typography>Feedback Entries</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts & Logs */}
        <Grid container spacing={3} mt={1}>
          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Activity Breakdown</Typography>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={80} label>
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Recent Activities</Typography>
                <Typography variant="body2" mt={1}>✔ User A submitted feedback</Typography>
                <Typography variant="body2" mt={1}>✔ Pediatrician B reviewed feedback</Typography>
                <Typography variant="body2" mt={1}>✔ Parent C registered</Typography>
                <Typography variant="body2" mt={1}>✔ Admin responded to feedback</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
