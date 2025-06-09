import React from "react";
import { Drawer, Box, Typography, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          padding: 0,
          backgroundColor: "#f5f5f5",
          border: "1px solid grey",
        },
      }}>
      {/* Top Section: Recipe App Title */}
      <Box
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
          p: 2,
          fontSize: "1.2rem",
        }}>
        🍽️ Recipe App
      </Box>

      {/* Navigation List */}
      <List sx={{ mt: 2 }}>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          sx={{ justifyContent: "center" }}>
          <Typography color="primary">Dashboard</Typography>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/fridge"
          sx={{ justifyContent: "center" }}>
          <Typography color="primary">Fridge</Typography>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/kitchen"
          sx={{ justifyContent: "center" }}>
          <Typography color="primary">Kitchen</Typography>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/history"
          sx={{ justifyContent: "center" }}>
          <Typography color="primary">History</Typography>
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/about"
          sx={{ justifyContent: "center" }}>
          <Typography color="primary">About</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
