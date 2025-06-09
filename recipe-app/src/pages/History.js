import React, { useState, useEffect } from 'react';
import RegularSidebar from '../components/RegularSidebar';
import ProfileButton from '../components/ProfileButton';
import LogIn from './LogIn';
import { Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

const History = () => {
  const [loginOpen, setLoginOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const limit = 5;

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BASE_API_URL}/users/profile`,
          {
            withCredentials: true,
          }
        );
        console.log("🧑‍💻 Logged-in user profile:", res.data);
        setUserId(res.data.id);
      } catch (err) {
        console.warn("Guest user mode: no logged-in profile detected.");
        setUserId(null); // Explicitly mark as guest
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/recipes/user`, {
          params: { userId }
        });
        const allRecipes = response.data;
        setRecipes(allRecipes.slice(0, limit));
        setPage(1);
        setHasMore(allRecipes.length > limit);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
      }
    };
    fetchRecipes();
  }, [userId]);

  return (
    <>
      <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      <LogIn open={loginOpen} onClose={() => setLoginOpen(false)} />

      <Box sx={{ display: 'flex' }}>
        <RegularSidebar />

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          {/* Header */}
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <h1>History</h1>
            <hr style={{ margin: '16px 0', border: 'none', borderTop: '2px solid #ccc' }} />
          </Box>

          {/* Content Container */}
          <Box
            sx={{
              width: '60%',
              mx: 'auto',
              flexGrow: 1,
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 2,
              p: 3,
              backgroundColor: '#f9f9f9',
              overflow: 'auto',
            }}
          >
            {recipes.length === 0 ? (
              <Typography variant="body1" align="center">
                No history available.
              </Typography>
            ) : (
              recipes.map((recipe, index) => (
                <Box
                  key={index}
                  onClick={() => {
                    setSelectedRecipe(recipe);
                    setOpenDialog(true);
                  }}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: '1px solid #ccc',
                    borderRadius: 1,
                    backgroundColor: '#f9f9f9',
                    cursor: 'pointer',
                    ":hover": { backgroundColor: '#eaeaea' },
                  }}
                >
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{recipe.description}</Typography>
                </Box>
              ))
            )}
            {hasMore && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={async () => {
                    if (!userId) return;
                    const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/recipes/user`, {
                      params: { userId }
                    });
                    const nextItems = response.data.slice(page * limit, (page + 1) * limit);
                    setRecipes(prev => [...prev, ...nextItems]);
                    setPage(prev => prev + 1);
                    if ((page + 1) * limit >= response.data.length) {
                      setHasMore(false);
                    }
                  }}
                >
                  Load More
                </Button>
              </Box>
            )}
          </Box>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
            <DialogTitle>{selectedRecipe?.name}</DialogTitle>
            <DialogContent dividers>
              <Typography variant="subtitle1" gutterBottom>Description</Typography>
              <Typography variant="body2">{selectedRecipe?.description}</Typography>
              <Typography variant="subtitle1" gutterBottom>Instructions</Typography>
              <Typography variant="body2">{selectedRecipe?.instructions || 'No instructions provided.'}</Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Category</Typography>
              <Typography variant="body2">{selectedRecipe?.foodCategory || 'N/A'}</Typography>
              <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>Cuisine</Typography>
              <Typography variant="body2">{selectedRecipe?.cuisine || 'N/A'}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        </Box>

        <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      </Box>
    </>
  );
};

export default History;
