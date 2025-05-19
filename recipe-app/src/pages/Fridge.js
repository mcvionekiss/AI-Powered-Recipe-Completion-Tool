import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";

import { Box, TextField, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import AddIcon from "@mui/icons-material/Add";

import Icon from "@mdi/react";
import { mdiFridge } from "@mdi/js";

import RegularSidebar from "../components/RegularSidebar";
import ProfileButton from "../components/ProfileButton";
import { FoodItem } from "../components/foodItem"; // Adjust the import path as necessary
import FoodItemInfo from "../components/FoodItemInfo"; // Adjust the import path as necessary
import LogIn from "./LogIn";

const Fridge = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [foodItems, setFoodItems] = useState([
    { name: "Food Item 1", quantity: "3" },
    { name: "Food Item 2", quantity: "1" },
    { name: "Food Item 3", quantity: "10" },
    { name: "Food Item 4", quantity: "10" },
    { name: "Food Item 5", quantity: "10" },
    { name: "Food Item 6", quantity: "10" },
    { name: "Food Item 7", quantity: "10" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const currentInputValue = useRef(inputValue);
  const [foodOptions, setfoodOptions] = useState([]);

  // const foodOptions = [
  //   "apple",
  //   "orange",
  //   "rice",
  //   "watermelon",
  //   "banana",
  //   "grape",
  //   "kiwi",
  //   "mango",
  //   "peach",
  //   "pear",
  //   "pineapple",
  //   "strawberry",
  //   "tomato",
  //   "watermelon",
  // ];

  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  // Debounced function to fetch food options every 300ms (after input is changed)
  const handleFetchFoodOptions = debounce(async (query) => {
    console.log("Fetching food options for query:", query);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/ingredients/search`,
        {
          params: {
            search_query: query,
          },
        }
      );

      const results = response.data;
      console.log("Fetched food options:", results);
      setfoodOptions(results.map((item) => item.description));
    } catch (error) {
      console.error("Error fetching food options:", error);
    }
  }, 300);

  useEffect(() => {
    // Fetch food options when input value changes
    if (inputValue && inputValue !== currentInputValue.current) {
      currentInputValue.current = inputValue;
      handleFetchFoodOptions(inputValue);
    }

    // Cleanup function to cancel the debounced function on unmount
    return () => {
      handleFetchFoodOptions.cancel();
    };
  }, [inputValue, handleFetchFoodOptions]);

  const handleAddFoodItem = (newFoodItem) => {
    for (let i = 0; i < foodItems.length; i++) {
      if (foodItems[i].name === newFoodItem.name) {
        // If the food item already exists, update its quantity
        const updatedFoodItems = [...foodItems];
        updatedFoodItems[i].quantity =
          parseInt(updatedFoodItems[i].quantity) +
          parseInt(newFoodItem.quantity);
        setFoodItems(updatedFoodItems);
        return;
      }
    }
    // Add the new food item to the list
    setFoodItems((prevItems) => [...prevItems, newFoodItem]);
  };

  const handleDeleteFoodItem = (foodItemToDelete) => {
    // Filter out the food item to delete
    const updatedFoodItems = foodItems.filter(
      (foodItem) => foodItem.name !== foodItemToDelete.name
    );
    setFoodItems(updatedFoodItems);
  };

  const handleShowFoodItemDetails = (foodItem) => {
    // Handle showing food item details here
    console.log("Showing details for:", foodItem);
    setSelectedFoodItem(foodItem);
  };

  return (
    <>
      <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      <LogIn open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <RegularSidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            p: 3,
            justifyContent: "flex-start",
            alignItems: "center",
            gap: 2,
            overflow: "auto",
          }}>
          <h1>Add new food!</h1>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 2,
              width: "100%",
            }}>
            <Autocomplete
              disablePortal
              options={foodOptions}
              onInputChange={(event, value) => {
                // Handle input change here
                console.log("Input changed:", value);
                setInputValue(value);
              }}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Food Search" />
              )}
            />
            <IconButton
              onClick={() =>
                handleAddFoodItem({ name: "New Food", quantity: "1" })
              }
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                width: 60,
                height: 60,
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}>
              <AddIcon sx={{ fontSize: 40 }} />
            </IconButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
              width: "95%",
              height: "100%", // <-- Fixed height for the outer box
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "left",
                alignItems: "center",
                width: "100%",
                height: 50, // Fixed height for the header,
              }}>
              <h2>Your Fridge</h2>
              <Icon path={mdiFridge} size={2} />
            </Box>

            {/* Scrollable Food list container */}
            <Box
              id="food-list-container"
              sx={{
                backgroundColor: "#f0f0f0",
                borderRadius: 2,
                border: "1px solid black",
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 1,
                width: "100%",
                height: "100%",
                overflowY: "auto",
                padding: 1,
              }}>
              {/* Example food items */}
              {foodItems.map((foodItem, index) => (
                <FoodItem
                  key={index}
                  foodItem={foodItem}
                  onClick={handleShowFoodItemDetails}
                  onDelete={handleDeleteFoodItem}
                />
              ))}
              {selectedFoodItem && (
                <FoodItemInfo
                  foodItem={selectedFoodItem}
                  onClose={() => setSelectedFoodItem(null)}
                />
              )}
            </Box>
          </Box>
        </Box>

        <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      </Box>
    </>
  );
};

export default Fridge;
