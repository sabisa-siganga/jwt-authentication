// importing json web token
const jwt = require("jsonwebtoken");
const { userDetails } = require("../controllers/controllers");

// securing routes
const secureRoute = (req, res, next) => {
  let token = "";

  try {
    // get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if no token is provided in the headers, indicating unauthorized access
    if (!token) {
      return res.status(401).json({ error: "Not authorized no token" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // get user from the token

    req.user = userDetails.find((user) => {
      return user.id === decoded.userId;
    });

    // Continue to the next controller, as the user is authorized
    next();
  } catch (err) {
    // error handling
    console.log(err);
    res.status(401).json({ error: "Not authorized" });
  }
};

// verify if the user is an admin
const isAdmin = (req, res, next) => {
  let token = "";

  try {
    // get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if no token is provided in the headers, indicating unauthorized access
    if (!token) {
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // checking the user's role
    if (decoded.role !== "admin") {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this resource" });
    }

    // get user from the token

    req.user = userDetails.find((user) => {
      return user.id === decoded.userId;
    });

    // Continue to the next controller, as the user is authorized as an admin
    next();
  } catch (err) {
    // error handling
    console.log(err);
    res.status(401).json({ error: "Not authorized" });
  }
};

// verify user permissions for accessing a resource on task 2
const verifyPermissions = async (req, res, next) => {
  let token = "";
  const currentRoute = req.originalUrl;

  try {
    // get token from headers
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if the token is missing
    if (!token) {
      return res
        .status(401)
        .json({ error: "Not authorized: no token provided" });
    }

    // Verify the token using the SECRET_KEY from environment variables
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check if the user's permissions include the required permission for the current route
    const isAuthorized = decoded.permissions.some((permission) =>
      currentRoute.startsWith(permission)
    );

    // If the user is authorized, allow access to the resource
    if (!isAuthorized) {
      return res
        .status(403)
        .json({ error: "You are not authorized to access this route" });
    }

    // Get user information from the token
    req.user = userDetails.find((user) => {
      return user.id === decoded.userId;
    });

    // Continue to the next controller, as the user is authorized
    next();
  } catch (err) {
    // handling error
    console.log(err);
    res.status(401).json({ error: "Not authorized" });
  }
};

module.exports = { secureRoute, isAdmin, verifyPermissions };
