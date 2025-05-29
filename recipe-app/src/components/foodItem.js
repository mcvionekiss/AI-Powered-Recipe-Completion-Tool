import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export function FoodItem({ foodItem, onClick, onDelete }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      onClick={() => onClick(foodItem)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        borderRadius: 2,
        border: isHovered ? "2px solid lightgrey" : "2px solid black",
        width: "200px",
        padding: 3,
        cursor: "pointer",
        position: "relative",
        backgroundColor: isHovered ? "grey" : "",
        color: isHovered ? "white" : "black",
        transition: "background-color 0.3s, box-shadow 0.5s, border 0.3s",
        boxShadow: isHovered ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box sx={{ fontWeight: "bold" }}>{foodItem.name}</Box>{" "}
      </Box>

      {isHovered && (
        <IconButton
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from triggering parent onClick
            onDelete?.(foodItem);
          }}
          sx={{
            position: "absolute",
            top: 5,
            right: 3,
          }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
