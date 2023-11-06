// Import the produceToken utility function
const produceToken = require("../utils/utils");

// Users for task 1 and 2
const userDetails = [
  {
    id: 1,
    username: "sabisa@gmail.com",
    password: "sabisa@gmail.com",
    role: "admin",
  },
  {
    id: 2,
    username: "jonny@gmail.com",
    password: "jonny@gmail.com",
    role: "general",
  },
  {
    id: 3,
    username: "Mazvita",
    password: "Mazvita",
    permissions: ["/a"],
  },
  {
    id: 4,
    username: "Meagan",
    password: "Meagan",
    permissions: ["/a", "/b"],
  },
  {
    id: 5,
    username: "Kabelo",
    password: "Kabelo",
    permissions: ["/b", "/c"],
  },
];

// handle user login
function login(req, res) {
  // Destructure username and password from the request body
  const { username, password } = req.body;

  // finding a user with the provided username in the database
  const user = userDetails.find((user) => {
    return user.username === username;
  });
  // checking if the user exists
  if (!user) {
    return res.json({ error: "No user found" });
  }

  // Check if a user with the provided username exists and the password is valid
  if (user.password == password) {
    // Return a successful response with user details and a token
    res.json({
      _id: user.id,
      username: user.username,
      token: produceToken(user.id, user.role, user.permissions),
      role: user.role,
    });
  } else {
    // Return an error response for invalid password
    res.status(400).json({ error: "Invalid password" });
  }
}

// retrieve a protected resource
const getResource = (req, res) => {
  // get the username of the authenticated user from the request
  const username = req.user.username;

  // Return a successful response with a message and the user indicating the resource is secure
  res
    .status(200)
    .json({ message: `Hey there ${username}, this resource is secure` });
};

module.exports = {
  login,
  getResource,
  userDetails,
};
