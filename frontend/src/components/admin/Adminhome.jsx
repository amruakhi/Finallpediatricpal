import React from 'react';
import { Box, Card, CardContent, Typography, Grid, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const pieData = [
  { name: 'Red', value: 400 },
  { name: 'Blue', value: 300 },
  { name: 'Green', value: 300 },
  { name: 'Yellow', value: 200 },
];
const COLORS = ['#ff6384', '#36a2eb', '#4bc0c0', '#ffce56'];

const AdminDashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer variant="permanent" anchor="left">
        <Box sx={{ width: 240 }}>
          <Toolbar />
          <List>
            <ListItem button><ListItemText primary="Dashboard" /></ListItem>
            <ListItem button><ListItemText primary="Ecommerce" /></ListItem>
            <ListItem button><ListItemText primary="UI Elements" /></ListItem>
            <ListItem button><ListItemText primary="Sample Pages" /></ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu"><MenuIcon /></IconButton>
            <Typography variant="h6" component="div">Admin Dashboard</Typography>
          </Toolbar>
        </AppBar>

        {/* Cards */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ backgroundColor: '#ff4f4f', color: 'white' }}>
              <CardContent>
                <Typography variant="h5">$458.90</Typography>
                <Typography>Expense from Dec 1 - 10</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Sales - April</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie data={pieData} dataKey="value" outerRadius={60} label>
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

          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">Entertainment</Typography>
                <Typography variant="h6">$250</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">House Rent</Typography>
                <Typography variant="h6">$60.50</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">Travel</Typography>
                <Typography variant="h6">$28</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body1">Shopping</Typography>
                <Typography variant="h6">$70</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
