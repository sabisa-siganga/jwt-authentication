const express = require("express");

// importing router
const router = express.Router();

// importing middlewares
const secureRoute = require("../middlewares/middlewares");

// importing controllers

const userControllers = require("../controllers/controllers");

// routes

// login route
router.post("/login", userControllers.login);

// both general and admin have access to this route
router.get("/resource", secureRoute.secureRoute, userControllers.getResource);

// admin_resource route, only an admin can access this resource
router.get("/admin_resource", secureRoute.isAdmin, (req, res) => {
  res.json({ message: "You have access to the admin resource" });
});

// Only Mazvita and Meagan have access to this route
router.get("/a", secureRoute.verifyPermissions, (req, res) => {
  res.json({ message: "You have access to route /a" });
});

// Only Meagan and Kabelo have access to this route
router.get("/b", secureRoute.verifyPermissions, (req, res) => {
  res.json({ message: "You have access to route /b" });
});

// Only Kabelo has access to this route
router.get("/c", secureRoute.verifyPermissions, (req, res) => {
  res.json({ message: "You have access to route /c" });
});

module.exports = router;
