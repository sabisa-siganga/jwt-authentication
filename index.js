const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8000;

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
      _id: newUser._id,
      username: newUser.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res({
        id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
