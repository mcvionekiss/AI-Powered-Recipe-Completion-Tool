require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create express app
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000", // allow requests from this domain
  })
);

const ingredients_route = require("./routes/ingredientsService.js");

// middleware that will trigger for every request that comes in\
app.use(express.json()); // if any requests come in, parse json data from request body and attach to request object
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}`); // log the path and method of each request
  next(); // move on to the next middleware
});

// routes
app.use("/ingredients", ingredients_route); // route for ingredients service

// connect to mongodb
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB"); // sanity check

    // listen for requests once we have connected to the database
    app.listen(process.env.PORT, () => {
      console.log("Server is listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
