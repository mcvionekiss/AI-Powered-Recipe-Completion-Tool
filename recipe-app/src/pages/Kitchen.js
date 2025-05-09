import React from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import { Box } from '@mui/material';
import filterIcon from './filter.png';
import './Kitchen.css'; // Import the CSS file for styling
import { Recipe } from '../components/Recipe';
import { useState } from 'react';



// kitchen page
const Kitchen = () => {

  const [items, setItems] = useState([
    { name: 'Recipe 1', description: 'A tasty dish.', type: 'Dinner' },
    { name: 'Pepperoni pizza', description: 'Pepperoni pizza is a popular pizza topped with tomato sauce, melted mozzarella cheese, and spicy, thinly sliced pepperoni.', type: 'Snack' },
    { name: 'Recipe 3', description: 'Family favorite.', type: 'Lunch' },
    { name: 'Recipe 4', description: 'Spicy and bold.', type: 'Dinner' },
    { name: 'Recipe 5', description: 'Sweet treat.', type: 'Dessert' },
    { name: 'Recipe 6', description: 'Light and fresh.', type: 'Salad' },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);

  const handleShowRecipeDetails = (recipe) => {
    setSelectedItem(recipe);

  };


  return (
    <Box sx={{ display: 'flex' }}>
  <RegularSidebar />
  <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Box sx={{ textAlign: 'center', mt: 2 }}>
      <h1>Your Kitchen</h1>
      <hr style={{ marginTop: '16px', marginBottom: '16px', border: 'none', borderTop: '2px solid #ccc' }} />
    </Box>

    <Box size="large" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
      <button id="filter">
        <img
          src={filterIcon}
          alt="filter icon"
          style={{
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid rgb(0, 0, 0)',
            padding: '4px',
            backgroundColor: 'white',
          }}
        />
        Filter
      </button>
      <button id="generateRecipe">Generate Recipe</button>
    </Box>

    <Box
      id="Recipe-list-container"
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
        mt: 2,
      }}
    >
      {items.map((foodItem, index) => (
        <Recipe
          key={index}
          foodItem={foodItem}
          onClick={() => setSelectedItem(foodItem)}
          onDelete={(item) => console.log('Delete', item)}
        />
      ))}
    </Box>

    {selectedItem && (
  <Box
    sx={{
      position: 'absolute',
      top: '325px',
      right: '400px',
      backgroundColor: '#fff',
      padding: 2,
      border: '1px solid #ccc',
      borderRadius: 2,
      boxShadow: 3,
      zIndex: 1000,
      maxWidth: '300px', // Limit width to keep it readable
      wordWrap: 'break-word', // Ensure long words wrap
      whiteSpace: 'normal',   // Allow normal wrapping behavior
    }}
  >
    <h3>{selectedItem.name}</h3>
    <p><strong>Type:</strong> {selectedItem.type}</p>
    <p>{selectedItem.description}</p>
    <button onClick={() => setSelectedItem(null)}>Close</button>
  </Box>
)}

  </Box>
  <ProfileButton />
</Box>
  );
};


export default Kitchen;