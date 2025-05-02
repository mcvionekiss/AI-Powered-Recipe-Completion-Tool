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
        border: "1px solid #ccc",
        width: "200px",
        padding: 2,
        cursor: "pointer",
        position: "relative",
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
            top: 4,
            right: 4,
          }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
}
