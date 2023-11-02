const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;
const SECRET_KEY = "sk3457";
const DEFAULT_EXPIRES_IN = "10d";

app.use(bodyParser.json());

// Connect to your MongoDB database (update the connection URL)
mongoose.connect(
  "mongodb+srv://lumisabiss_gmailcom:lumisabiss@hyperiondev123456.bnwjxx0.mongodb.net/user?retryWrites=true&w=majority"
);

// create user schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// Create a User model
const User = mongoose.model("User", userSchema);

// checking username and password and produce jwt
app.post("/register-user", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Please enter username and password" });
  }

  try {
    // Check if the user with the same username already exists
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({
        error:
          "User with this username already exists. Please choose a different username",
      });
    }

    // Create a salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      _id: newUser.id,
      username: newUser.username,
      token: produceToken(newUser._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register" });
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  console.log(username, password);

  const user = await User.findOne({ username });
  console.log(user);

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: produceToken(user._id),
    });
  } else {
    res.status(400).json({ error: "Invalid password" });
  }
});

// produce token
const produceToken = (userId) => {
  return jwt.sign({ userId }, SECRET_KEY, {
    expiresIn: DEFAULT_EXPIRES_IN,
  });
};

const secureRoute = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // get token from headers
      token = req.headers.authorization.split(" ")[1];

      // verify token

      const decoded = jwt.verify(token, SECRET_KEY);

      // get user from the token

      req.user = await findById(decoded.userId).select("-password");

      next();
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Not authorized" });
    }

    if (!token) {
      res.status(401).json({ error: "Not authorized" });
    }
  }
};

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
