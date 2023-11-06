/**
 * Creating an Express app that has a login route, checking the posted username and password and produces a JWT,
 * also has a resouce route, checking JWT in the auth header and displays message with user name.
 * additionally, it has admin_resource route, which checks JWT and displays a message if the token is verified and the token holder is an admin
 *
 *  More so, for task 2:  this app has been extended to create 3 users with different route access permissions have the following routes:
 *  Mazvita - /a
 *  Meagan - /a and /b
 *  Kabelo - /b and /c
 *
 * Users only have access to access the above routes and the login endpoint
 */

// Import required dependencies for the Express application
const express = require("express");

// import the router for defining routes
const router = require("./routes/routes");

// Load environment variables from a .env file
require("dotenv").config();

const app = express();

// Define the port where the server will listen, defaulting to 8000
const PORT = process.env.PORT || 8000;

app.use(express.json());

// handle routes
app.use(router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
