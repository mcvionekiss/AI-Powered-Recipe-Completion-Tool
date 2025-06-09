import React, { useEffect, useState, useRef } from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import filterIcon from './filter.png';
import './Kitchen.css'; // Your custom styles
import { userId, getUserId, setUserId } from '../App';
import { Recipe } from '../components/Recipe';
import LogIn from './LogIn';
import axios from 'axios';
import { Box, Menu, MenuItem, IconButton } from "@mui/material";












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




 const handleClick = (event) => {
   setAnchorEl(event.currentTarget);
 };


 const handleClose = (option) => {
   setNumRecipes(option);
   if (option) {
     console.log("Selected Option:", option);
   }
   setAnchorEl(null);
 };




const getUserRecipes = async () => {
 try{
   console.log("acquiring user recipes");
   const res = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/users/profile`, {
     withCredentials: true,
   });
   setUserId(res.data.id);


   console.log("userId:", userId);
   const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/recipes/user`, {params: {userId: getUserId()}})
   console.log("userId:", userId);
   console.log("data:", response.data);
   for (const key in response.data){
     addItem(response.data[key]);
   }
  
 }catch (error){
   console.log("Error fetching user recipes", error);}
}


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


const handleGenerateRecipe = async () => {
 try{
   const recipes = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/recipes/ingredients`, {params: {userId: getUserId()}});
   const ingredients = {};
   recipes.data.forEach(item => {
     ingredients[item.name] = Number(item.quantity);
   })
   console.log("recipes:", items);


   for(let i = 0; i < recipesToGenerate; i++){
     const new_recipe = await axios.get(
         `${process.env.REACT_APP_BASE_API_URL}/recipe/generate`,
         {
           params: {ingredients, userSuggestion: searchText, previousRecipes: JSON.stringify(items)},
          
           withCredentials: true,
         }
       );
       const parsedRecipe = JSON.parse(new_recipe.data.recipe);
       console.log("2ND CHECK RIGHT HERE:", parsedRecipe.ingredientsUsed);
       addItem(parsedRecipe);
       handleAddRecipe(parsedRecipe);
   }
     setSearchText("");
     // console.log("recipe:", parsedRecipe);
   } catch (error) {
     console.error("Error generating recipe:", error);
   }
 };


const handleAddRecipe = async (recipe) => {
 console.log("CHECK RIGHT HERE:", convertJsonToString(recipe.ingredients_used));
 try{
   const response = await axios.post(`${process.env.REACT_APP_BASE_API_URL}/recipes/addRecipe`, {
     name: recipe.name,
     description: recipe.description,
     instructions: recipe.instructions,
     userId: getUserId(),
     foodCategory: recipe.foodCategory,
     cuisine: recipe.cuisine,
     ingredients_used: convertJsonToString(recipe.ingredients_used),
   });
   console.log("response:", response);
 }catch(error){
   console.error("Error adding recipe:", error);
 }
}
const convertJsonToString = (data) => {
 let string = "";
 for (const key in data) {
   string += `${key}: ${data[key]}\n`;
 }
 return string;
};


const convertJsonToJSX = (data) => {
 return Object.entries(data).map(([key, value], index) => (
   <div key={index}>
     {key}: {value}
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
           <h1>Your Kitchen</h1>
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
       sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
     >
       <IconButton
         id="filter"
         onClick={handleClick}
         sx={{ display: "flex", alignItems: "center", gap: 1}}
       >
         Generating {recipesToGenerate} recipe(s)
       </IconButton>


       <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={() => handleClose(null)}
         anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
       >
         <MenuItem onClick={() => handleClose(1)}>1 Recipes</MenuItem>
         <MenuItem onClick={() => handleClose(2)}>2 Recipes</MenuItem>
         <MenuItem onClick={() => handleClose(3)}>3 Recipes</MenuItem>
       </Menu>
       <button
             id="generateRecipe"
             onClick={() => handleGenerateRecipe()}>
             Generate Recipe
       </button>
     </Box>


         {/* Recipe List */}
         <Box id="Recipe-list-container" className="recipe-list-container">
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
