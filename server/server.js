require("dotenv").config();

const express = require("express");
const https = require('https');
const fs = require('fs');

const cookieParser = require("cookie-parser");
const cors = require("cors");

// create express app
const app = express();

const options = {
  key: fs.readFileSync('/home/ec2-user/certs/key.pem'),
  cert: fs.readFileSync('/home/ec2-user/certs/cert.pem')
};


app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://main.d2xotiz8jub08m.amplifyapp.com",
    ], // allow requests from this domain
    credentials: true,
  })
);

https.createServer(options, app).listen(process.env.EXPRESS_PORT, () => {
  console.log('HTTPS Server running on port', process.env.EXPRESS_PORT);
});

const ingredients_route = require("./routes/ingredientsService.js");
const user_route = require("./routes/userService.js");
const recipe_route = require("./routes/generateRecipe.js");
const recipes_route = require("./routes/recipesService.js");

// middleware that will trigger for every request that comes in\
app.use(express.json()); // if any requests come in, parse json data from request body and attach to request object
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`${req.path}, ${req.method}`); // log the path and method of each request
  next(); // move on to the next middleware
});

// routes
app.use("/ingredients", ingredients_route); // route for ingredients service
app.use("/users", user_route); // route for user service
app.use("/recipe", recipe_route); // route for recipe generation service
app.use("/recipes", recipes_route); // route for recipe service

console.log("Available /users routes:");
user_route.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(
      ` - ${r.route.stack[0].method.toUpperCase()} /users${r.route.path}`
    );
  }
});
