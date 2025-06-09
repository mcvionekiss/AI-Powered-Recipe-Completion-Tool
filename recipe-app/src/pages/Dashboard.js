import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import RegularSidebar from "../components/RegularSidebar";
import ProfileButton from "../components/ProfileButton";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // for the pie chart
import TipNotification from "../components/TipNotification";
import LogIn from "../pages/LogIn";
import axios from "axios";
import Button from "@mui/material/Button";

const Dashboard = () => {
  const getRandomColor = () =>
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  const [foodCategory, setFoodCategoryRatios] = useState([
    { foodCategory: "N/A", userId: "", count: 100 },
  ]);

  const [cuisineRatios, setCuisineRatios] = useState([
    { cuisine: "N/A", userId: "", count: 100 },
  ]);

  const [totals, setTotals] = useState({
    totalRecipes: 0,
    totalIngredients: 0,
  });

  const [recentRecipe, setRecentRecipe] = useState({
    name: "N/A",
    description: "N/A",
    createdAt: "N/A",
    instructions: "N/A",
    foodCategory: "N/A",
    cuisine: "N/A",
  });

  const [showRecipeDetails, setShowRecipeDetails] = useState(false);

  const fetchFoodRatios = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/ratios`,

        {
          params: { userId: localStorage.getItem("userId") },
          withCredentials: true,
        }
      );
      console.log("Food ratios loaded:", response.data);
      setFoodCategoryRatios(response.data.foodCategory);
      setCuisineRatios(response.data.cuisine);
    } catch (error) {
      console.error("Error loading food ratios:", error);
    }
  }, []);

  const fetchTotalRecipes = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/totalRecipes`,
        {
          params: { userId: localStorage.getItem("userId") },
          withCredentials: true,
        }
      );
      console.log("Total recipes loaded:", response.data);
      setTotals((prevTotals) => ({
        ...prevTotals,
        totalRecipes: response.data.total,
      }));
    } catch (error) {
      console.error("Error loading total recipes:", error);
    }
  }, []);

  const fetchTotalIngredients = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/totalIngredients`,
        {
          params: { userId: localStorage.getItem("userId") },
          withCredentials: true,
        }
      );
      console.log("Total ingredients loaded:", response.data);
      setTotals((prevTotals) => ({
        ...prevTotals,
        totalIngredients: response.data.total,
      }));
    } catch (error) {
      console.error("Error loading total ingredients:", error);
    }
  }, []);

  const fetchRecentRecipe = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_API_URL}/users/recentRecipe`,
        {
          params: { userId: localStorage.getItem("userId") },
          withCredentials: true,
        }
      );
      console.log("Recent recipe loaded:", response.data);
      setRecentRecipe(response.data);
    } catch (error) {
      console.error("Error loading recent recipe:", error);
    }
  }, []);

  useEffect(() => {
    // fetchProfile();
    fetchFoodRatios();
    fetchTotalRecipes();
    fetchTotalIngredients();
    fetchRecentRecipe();
  }, [
    fetchFoodRatios,
    fetchTotalRecipes,
    fetchTotalIngredients,
    fetchRecentRecipe,
  ]);

  // load food ratios from db

  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
      <LogIn open={loginOpen} onClose={() => setLoginOpen(false)} />
      <Box sx={{ display: "flex" }}>
        <RegularSidebar />

        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          {/* Top Title and Profile Button */}
          <TipNotification />
          <ProfileButton onTriggerLogin={() => setLoginOpen(true)} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}>
            <Typography variant="h4">Dashboard</Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Dashboard Content */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { md: "1fr 1fr", xs: "1fr" },
              gap: 4,
            }}>
            {/* Food Ratios */}
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                padding: 4,
                gap: 4,
              }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    mb: 2,
                    textUnderlineOffset: 3,
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}>
                  Your Food Ratios
                </Typography>
              </CardContent>
              {/* Food Category Ratios */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: 2,
                  ":hover": { boxShadow: 4, backgroundColor: "#b2ebf2" },
                  transition:
                    "box-shadow 0.3s ease-in-out , background-color 0.3s ease-in-out",
                  width: "100%",
                }}>
                <Typography
                  variant="h4"
                  sx={{
                    height: "5px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    fontStyle: "italic",
                  }}>
                  Food Categories
                </Typography>
                <PieChart width={400} height={300}>
                  <Pie
                    data={foodCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="foodCategory"
                    label>
                    {foodCategory.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRandomColor()} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </CardContent>

              {/* Cuisine Ratios */}
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: 2,
                  ":hover": { boxShadow: 4, backgroundColor: "#b2ebf2" },
                  transition:
                    "box-shadow 0.3s ease-in-out , background-color 0.3s ease-in-out",
                  width: "100%",
                }}>
                <Typography
                  variant="h4"
                  sx={{
                    height: "5px",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                    fontStyle: "italic",
                  }}>
                  Cuisines
                </Typography>
                <PieChart width={400} height={300}>
                  <Pie
                    data={cuisineRatios}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="cuisine"
                    label>
                    {cuisineRatios.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={getRandomColor()} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </CardContent>
            </Card>

            {/* Totals */}
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                boxShadow: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                padding: 4,
                gap: 4,
              }}>
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    mb: 2,
                    textUnderlineOffset: 3,
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}>
                  User Stats
                </Typography>
              </CardContent>
              {/* Total Recipes Card */}
              <CardContent
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: 2,
                  ":hover": { boxShadow: 4, backgroundColor: "#b2ebf2" },
                  transition:
                    "box-shadow 0.3s ease-in-out , background-color 0.3s ease-in-out",
                }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  }}>
                  Total Recipes:
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "60px",
                    textAlign: "center",
                    color: "white",
                    padding: 1,
                    borderRadius: 10,
                    boxShadow: 2,
                  }}>
                  {totals.totalRecipes}
                </Typography>
              </CardContent>

              {/* Total Ingredients Card */}
              <CardContent
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: 2,
                  ":hover": { boxShadow: 4, backgroundColor: "#b2ebf2" },
                  transition:
                    "box-shadow 0.3s ease-in-out , background-color 0.3s ease-in-out",
                }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  }}>
                  Total Ingedients:
                </Typography>
                <Typography
                  variant="h3"
                  sx={{
                    backgroundColor: "#1976d2",
                    width: "60px",
                    textAlign: "center",
                    color: "white",
                    padding: 1,
                    borderRadius: 10,
                    boxShadow: 2,
                  }}>
                  {totals.totalIngredients}
                </Typography>
              </CardContent>

              {/* Last made recipe */}
              <CardContent
                sx={{
                  mb: 2,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  textAlign: "center",
                  backgroundColor: "#e0f7fa",
                  borderRadius: 2,
                  padding: 2,
                  boxShadow: 2,
                  ":hover": { boxShadow: 4, backgroundColor: "#b2ebf2" },
                  transition:
                    "box-shadow 0.3s ease-in-out , background-color 0.3s ease-in-out",
                }}>
                {!showRecipeDetails ? (
                  <>
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      }}>
                      Most Recent Recipe:
                    </Typography>
                    <Typography variant="h4" sx={{ fontStyle: "italic" }}>
                      ({new Date(recentRecipe.createdAt).toLocaleDateString()})
                    </Typography>

                    <Typography
                      variant="h4"
                      onClick={() => {
                        setShowRecipeDetails(true);
                      }}
                      sx={{
                        backgroundColor: "#1976d2",
                        width: "100%",
                        textAlign: "center",
                        color: "white",
                        padding: 1,
                        borderRadius: 10,
                        boxShadow: 2,
                        fontWeight: "bold",
                        ":hover": {
                          boxShadow: 4,
                          backgroundColor: "#115293",
                          cursor: "pointer",
                        },
                        transition:
                          "box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
                      }}>
                      {recentRecipe.name}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Typography
                      variant="h3"
                      gutterBottom
                      sx={{
                        mb: 2,
                        fontWeight: "bold",
                        textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                      }}>
                      {recentRecipe.name}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        mb: 2,
                        fontStyle: "italic",
                        color: "grey",
                      }}>
                      "{recentRecipe.description}"
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mb: 2,
                        fontStyle: "italic",
                        color: "grey",
                      }}>
                      Instructions: {recentRecipe.instructions}
                    </Typography>
                    <CardContent
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          fontWeight: "bold",
                          color: "grey",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          padding: 1,
                          borderRadius: 2,
                        }}>
                        Food Category -- {recentRecipe.foodCategory}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          mb: 2,
                          fontWeight: "bold",
                          color: "grey",
                          backgroundColor: "rgba(0, 0, 0, 0.1)",
                          padding: 1,
                          borderRadius: 2,
                        }}>
                        Cuisine -- {recentRecipe.cuisine}
                      </Typography>
                    </CardContent>
                    <Button
                      variant="contained"
                      sx={{ width: "100%", marginTop: 2 }}
                      onClick={() => setShowRecipeDetails(false)}>
                      Back
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
