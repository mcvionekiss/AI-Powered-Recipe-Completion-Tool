import React from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import { Box } from '@mui/material';
import filterIcon from './filter.png';
import './Kitchen.css'; // Import the CSS file for styling


// kitchen page
const Kitchen = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <RegularSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <h1>Your Kitchen</h1>
          <hr style={{ marginTop: '16px', marginBottom: '16px', border: 'none', borderTop: '2px solid #ccc' }} />
        </Box>
        <Box size="large" sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <button id ="filter">
            <img src={filterIcon} alt= "filter icon" style={{
               width: '16px', height: '16px',
               borderRadius: '50%',
               border: '2px solidrgb(0, 0, 0)',
               padding: '4px',              
               backgroundColor: 'white'    
               }} />
            Filter
          </button>
          <button id="generateRecipe">
            Generate Recipe
          </button>

        </Box>

      </Box>
      
      <ProfileButton />
    </Box>

    


  );
};


export default Kitchen;