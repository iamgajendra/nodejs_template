const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");

// Routes
const authRoute = require("./auth-api"); 
const appRoute = require("./v1");

const app = express();

// Middleware for logs 
// app.use(morgan("short"));

//Middlewares
app.use(express.json());
app.use(cors());
 
// Middlewares for Routes  
app.use("/auth", authRoute); 
app.use("/", appRoute);

module.exports = app;
