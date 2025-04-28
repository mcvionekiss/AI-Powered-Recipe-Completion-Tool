import React from 'react';
import { Box, Typography, Card, CardContent, Divider, List, ListItem, ListItemText } from '@mui/material';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts'; // for the pie chart

const mockRecentRecipes = ['Recipe #1', 'Recipe #2', 'Recipe #3'];
const mockLastUpdated = 'Saturday';
const mockResumeRecipe = 'Recipe #1';
const mockFoodRatios = [
  { name: 'Vegetables', value: 25 },
  { name: 'Protein', value: 25 },
  { name: 'Grains', value: 50 },
];

const COLORS = ['#8e44ad', '#c0392b', '#5dade2'];

const Dashboard = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <RegularSidebar />

      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {/* Top Title and Profile Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Dashboard</Typography>
          <ProfileButton />
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* Dashboard Content */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr', xs: '1fr' },
            gap: 4,
          }}
        >
          {/* Recent Recipes */}
          <Card sx={{ backgroundColor: '#e0dcdc' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Recipes:
              </Typography>
              <List>
                {mockRecentRecipes.map((recipe, index) => (
                  <ListItem key={index} disableGutters>
                    <ListItemText primary={recipe} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Food Ratios */}
          <Card sx={{ backgroundColor: '#d9d9d9' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Food Ratios
              </Typography>
              <PieChart width={200} height={200}>
                <Pie
                  data={mockFoodRatios}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {mockFoodRatios.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </CardContent>
          </Card>

          {/* Resume Last Recipe */}
          <Card sx={{ backgroundColor: '#d9d9d9' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Want to pick up where you left off?
              </Typography>
              <Typography variant="h5">{mockResumeRecipe}</Typography>
            </CardContent>
          </Card>

          {/* Last Updated Fridge */}
          <Card sx={{ backgroundColor: '#d9d9d9' }}>
            <CardContent>
              <Typography variant="subtitle1" gutterBottom>
                Last Updated Fridge:
              </Typography>
              <Typography variant="h5">{mockLastUpdated}</Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;