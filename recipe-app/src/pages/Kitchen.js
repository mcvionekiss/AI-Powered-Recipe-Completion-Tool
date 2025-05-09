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
    { name: 'Chicken Caesar Salad', description: 'A chicken Caesar salad is a crisp romaine lettuce salad topped with grilled chicken, croutons, Parmesan cheese, and creamy Caesar dressing.', type: 'Lunch' },
    { name: 'Japanese Chicken Curry', description: 'Japanese chicken curry is a mildly spiced, savory dish made with tender chicken, potatoes, carrots, and onions simmered in a rich, thick curry sauce served over rice.', type: 'Dinner' },
    { name: 'Recipe 5', description: 'Sweet treat.', type: 'Dessert' },
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
      className="recipe-list-container"
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
    className="recipe-details"
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
      wordWrap: 'break-word', // wrap long words
      whiteSpace: 'normal',   // allow for wrapping
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