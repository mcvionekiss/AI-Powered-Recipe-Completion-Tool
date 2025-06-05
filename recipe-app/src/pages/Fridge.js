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
  const [userId, setUserId] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  const [inputValue, setInputValue] = useState("");
  const currentInputValue = useRef(inputValue);
  const [foodOptions, setfoodOptions] = useState([]);
  const [selectedFoodItem, setSelectedFoodItem] = useState(null);

  const [viewFoodItemDetails, setViewFoodItemDetails] = useState(false);
  const [selectedFoodItemDetails, setSelectedFoodItemDetails] = useState({});

  const [fridgeUpdateTrigger, setFridgeUpdateTrigger] = useState(0);

  useEffect(() => {
  const fetchUserId = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/users/profile`, {
        withCredentials: true,
      });
      console.log("🧑‍💻 Logged-in user profile:", res.data);
      setUserId(res.data.id);
    } catch (err) {
      console.warn("Guest user mode: no logged-in profile detected.");
      setUserId(null); // Explicitly mark as guest
    }
  };
  fetchUserId();
}, []);

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
          withCredentials: true,
        }
      );

      const results = response.data;
      console.log("Fetched food options:", results);
      // Remove duplicates by description + brandOwner
      const uniqueOptions = [];
      const seen = new Set();
      results.forEach((item) => {
        const key =
          item.description + (item.brandOwner ? " | " + item.brandOwner : "");
        if (!seen.has(key)) {
          seen.add(key);
          uniqueOptions.push(item);
        }
      });
      setfoodOptions(uniqueOptions);
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

  useEffect(() => {
    console.log("📦 userId used to fetch fridge items:", userId);
    const fetchFridgeItems = async () => {
      if (userId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/ingredients`, {
            params: { userId },
            withCredentials: true,
          });
          setFoodItems(response.data);  // ⬅️ stores fetched ingredients in state
        } catch (error) {
          console.error("Error loading fridge from DB:", error);
        }
      } else {
        const storedItems = localStorage.getItem("fridgeItems");
        if (storedItems) {
          setFoodItems(JSON.parse(storedItems));
        }
      }
    };

    fetchFridgeItems();
    return () => {
      handleFetchFoodOptions.cancel();
    };
  }, [fridgeUpdateTrigger, userId]);

  const handleAddFoodItem = async (newFoodItem) => {
    for (let i = 0; i < foodItems.length; i++) {
      if (foodItems[i].name === newFoodItem.name) {
        // If the food item already exists, update its quantity
        const updatedFoodItems = [...foodItems];
        updatedFoodItems[i].quantity =
          parseInt(updatedFoodItems[i].quantity) +
          parseInt(newFoodItem.quantity);
        setFoodItems(updatedFoodItems);
        if (!userId) localStorage.setItem("fridgeItems", JSON.stringify(updatedFoodItems));
        return;
      }
    }

    // Add the new food item to database or localStorage
    if (userId) {
      console.log("trying to insert ", newFoodItem, userId, newFoodItem.description);
      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/ingredients`, {
          ...newFoodItem,
          userId,
          unit: "count",
          description: newFoodItem.foodNutrients ? JSON.stringify(newFoodItem.foodNutrients) : "",
        }, {
          withCredentials: true,
        });
        setFoodItems((prevItems) => [...prevItems, { ...newFoodItem, id: response.data.id }]);
        setFridgeUpdateTrigger(prev => prev + 1);
      } catch (error) {
        console.error("Error adding food to DB:", error);
      }
    } else {
      const updatedItems = [...foodItems, newFoodItem];
      setFoodItems(updatedItems);
      localStorage.setItem("fridgeItems", JSON.stringify(updatedItems));
      setFridgeUpdateTrigger(prev => prev + 1);
    }
  };

  const handleDeleteFoodItem = async (foodItemToDelete) => {
    // Filter out the food item to delete
    const updatedFoodItems = foodItems.filter(
      (foodItem) => foodItem.name !== foodItemToDelete.name
    );
    
    if (userId) {
      try {
        await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/ingredients/${foodItemToDelete.id}`, {
          params: { userId },
          withCredentials: true,
        });
        setFoodItems(updatedFoodItems);
        setFridgeUpdateTrigger(prev => prev + 1);
      } catch (error) {
        console.error("Error deleting food from DB:", error);
      }
    } else {
      setFoodItems(updatedFoodItems);
      localStorage.setItem("fridgeItems", JSON.stringify(updatedFoodItems));
      setFridgeUpdateTrigger(prev => prev + 1);
    }
  };

  const handleShowFoodItemDetails = (foodItem) => {
    // Handle showing food item details here
    console.log("Showing details for:", foodItem);
    setViewFoodItemDetails(true);
    setSelectedFoodItemDetails(foodItem);
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
              getOptionLabel={(opt) =>
                opt.brandOwner
                  ? `${opt.description} | ${opt.brandOwner}`
                  : opt.description
              }
              isOptionEqualToValue={(opt, val) =>
                // optional but recommended: compare by a unique ID
                opt.fdcId === val.fdcId
              }
              value={selectedFoodItem}
              onChange={(_, newValue) => {
                console.log("picked object:", newValue);
                setSelectedFoodItem(newValue);
              }}
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
                handleAddFoodItem({
                  name: selectedFoodItem.description,
                  fdcId: selectedFoodItem.fdcId ?? null,
                  foodCategory: selectedFoodItem.foodCategory ?? null,
                  brandOwner: selectedFoodItem.brandOwner ?? null,
                  foodNutrients: selectedFoodItem.foodNutrients ?? "no foodNutrients",
                  quantity: "1",
                })
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
              {viewFoodItemDetails && (
                <FoodItemInfo
                  foodItem={selectedFoodItemDetails}
                  onClose={() => setViewFoodItemDetails(false)}
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