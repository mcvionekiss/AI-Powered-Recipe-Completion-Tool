import { Box } from "@mui/material";

export function FoodItem({ foodItem }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        border: "1px solid #ccc",
        width: "100%",
        padding: 2,
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <Box sx={{ fontWeight: "bold" }}>{foodItem.name}</Box>
        <Box sx={{ color: "gray" }}>{foodItem.quantity}</Box>
      </Box>
    </Box>
  );
}
