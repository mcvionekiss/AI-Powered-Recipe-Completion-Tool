const mongoose = require("mongoose"); // allows us to create schemas and models for our data

const Schema = mongoose.Schema; // create a shorthand for the mongoose schema constructor

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: Number,
      required: true,
    },
    username: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // timestamps will automatically add createdAt and updatedAt fields to our documents
