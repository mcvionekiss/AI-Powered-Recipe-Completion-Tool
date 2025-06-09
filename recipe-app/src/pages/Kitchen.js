import React, { useEffect, useState, useRef, useCallback } from "react";
import RegularSidebar from "../components/RegularSidebar";
import ProfileButton from "../components/ProfileButton";
import { Box, Typography, Button } from "@mui/material";
import filterIcon from "./filter.png";
import "./Kitchen.css"; // Your custom styles
import { userId, getUserId, setUserId } from "../App";
import { Recipe } from "../components/Recipe";
import LogIn from "./LogIn";
import axios from "axios";

const Kitchen = () => {
 const [loginOpen, setLoginOpen] = useState(false);
 const [recipesToGenerate, setNumRecipes] = useState(1);
 const [items, setItems] = useState([]);
 const [anchorEl, setAnchorEl] = useState(null);
 const open = Boolean(anchorEl);


 const [selectedItem, setSelectedItem] = useState(null);
 const [searchText, setSearchText] = useState("");


 const handleShowRecipeDetails = (recipe) => {
   setSelectedItem(recipe);
 };

  const getUserRecipes = useCallback(async () => {
    try {
      console.log("acquiring user recipes");
      const res = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/profile`,
        {
          withCredentials: true,
        }
      );
      setUserId(res.data.id);

      console.log("userId:", userId);
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/recipes/user`,
        { params: { userId: getUserId() } }
      );
      console.log("userId:", userId);
      console.log("data:", response.data);
      for (const key in response.data) {
        addItem(response.data[key]);
      }
    } catch (error) {
      console.log("Error fetching user recipes", error);
    }
  }, []);

 const hasFetched = useRef(false);


 useEffect(() => {
   if (!hasFetched.current) {
     getUserRecipes();
     hasFetched.current = true;
   }
 }, [getUserRecipes]);


 function addItem(recipe) {
   setItems((items) => [
     ...items,
     {
       name: recipe.name,
       description: recipe.description,
       instructions: recipe.instructions,
       foodCategory: recipe.foodCategory,
       cuisine: recipe.cuisine,
       ingredientsUsed: recipe.ingredientsUsed,
      //  extraIngredients: recipe.extraIngredients,
     },
   ]);
 }


 const removeItem = async (recipe) => {
   try {
     console.log("Inside removeItem:", recipe.name);

      // Send DELETE request to your API
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_API_URL}/recipes/data`,
        {
          params: { name: recipe.name, userId: getUserId() },
        }
      );

     console.log("Response from backend:", response.data.message);


     // Safely remove the item from state
     setItems((prevItems) =>
       prevItems.filter((item) => item.name !== recipe.name)
     );
   } catch (error) {
     console.error("Error removing item:", error);
   }
 };

  const handleGenerateRecipe = async (query) => {
    try {
      const recipes = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/recipes/ingredients`,
        { params: { userId: getUserId() } }
      );
      const ingredients = {};
      recipes.data.forEach((item) => {
        ingredients[item.name] = Number(item.quantity);
      });
      const new_recipe = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/recipe/generate`,
        {
          params: { ingredients, userSuggestion: searchText },

          withCredentials: true,
        }
      );
      const parsedRecipe = JSON.parse(new_recipe.data.recipe);
      // console.log("recipe:", parsedRecipe);
      addItem(parsedRecipe);
      handleAddRecipe(parsedRecipe);

      setSearchText("");
      console.log("recipe:", parsedRecipe);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
  };

  const handleAddRecipe = async (recipe) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}/recipes/addRecipe`,
        {
          name: recipe.name,
          description: recipe.description,
          instructions: recipe.instructions,
          foodCategory: recipe.foodCategory,
          cuisine: recipe.cuisine,
          userId: getUserId(),
          ingredientsUsed: convertJsonToString(recipe.ingredientsUsed),
        }
      );
      console.log("response:", response);
    } catch (error) {
      console.error("Error adding recipe:", error);
    }
  };


  const convertJsonToString = (data) => {
    var string = "";
    for(const key in data){
      string += `${key}: ${data[key]}\n`;
    }
    return string;
  }
  const convertJsonToJSX = (data) => {
    return Object.entries(data).map(([key, value], index) => (
      <div key={index}>
        <strong>{key}</strong>: {value}
      </div>
    ));
  };

 return (
   <>
     <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
     <LogIn open={loginOpen} onClose={() => setLoginOpen(false)} />
     <Box sx={{ display: "flex" }}>
       <RegularSidebar />


        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}>
          {/* Page Header */}
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Typography variant="h4" component="h1">Kitchen</Typography>
            <hr
              style={{
                marginTop: "16px",
                marginBottom: "16px",
                border: "none",
                borderTop: "2px solid #ccc",
              }}
            />
          </Box>

          {/* Input Bar */}
          <Box sx={{ width: "100%", mt: 1 }}>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="What are you in the mood for today?"
              className="search-input full-width"
            />
          </Box>

          {/* Buttons */}
          <Box
            size="large"
            sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              id="generateRecipe"
              variant="contained"
              color="primary"
              onClick={() => handleGenerateRecipe("potato")}
              sx={{ textTransform: "none" }}
            >
              Generate Recipe
            </Button>
          </Box>

          {/* Recipe List */}
          <Box id="Recipe-list-container" className="recipe-list-container"
            sx={{
              width: "98.5%",
              height: "67%", // <-- Fixed height for the outer box
            }}
          >
            {items.map((foodItem, index) => (
              <Recipe
                key={index}
                foodItem={foodItem}
                onClick={() => handleShowRecipeDetails(foodItem)}
                onDelete={(itemToDelete) => removeItem(itemToDelete)}
              />
            ))}
          </Box>

         {/* Popup Box */}
         {selectedItem && (
           <Box
             className="recipe-details"
             sx={{
               position: "absolute",
               top: "325px",
               right: "400px",
               backgroundColor: "#fff",
               padding: 2,
               border: "1px solid #ccc",
               borderRadius: 2,
               boxShadow: 3,
               zIndex: 1000,
               maxWidth: "300px",
               wordWrap: "break-word",
               whiteSpace: "normal",
             }}>
             <h3>{selectedItem.name}</h3>
             <p>
               <strong>Description: </strong> {selectedItem.description}
             </p>
             <p>
               <strong>Instructions: </strong>
               {selectedItem.instructions}
             </p>
             <p>
               <strong>Food Category: </strong>
               {selectedItem.foodCategory}
             </p>
               <p>
                 <strong>Cuisine: </strong>
                 {selectedItem.cuisine}
               </p>
             <div>
               <strong>Ingredients Used:</strong>
               <div>
               {convertJsonToJSX(selectedItem.ingredientsUsed)}
               </div>
             </div>
              
             <button onClick={() => setSelectedItem(null)}>Close</button>
           </Box>
         )}
       </Box>


       <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
     </Box>
   </>
 );
};


export default Kitchen;
