const express = require("express");
// create router
const router = express.Router();
// This is an example of a GET request handler
// Parameter 1 -> if retrieving all, then we use / | if retrieving a specific dataset, then we use /:id
// Parameter 2 -> an asynchronous function taking in the request and response objects
router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  // Parses the request object which is in a JSON format.
  // Each variable after const represents a key from the request body
  // The request object derives from our Model
  const { title, load, reps } = req.body;

  try {
    // Creating a new workout object based on a WorkoutModel
    const workout = await WorkoutModel.create({ title, load, reps });
    // if response is 200 (OK) → then we can send the contents of our new workout object to indicate that it has been successfully added
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
