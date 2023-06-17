const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

function generateToken(user) {
  //modify the secret key according to your needs
  const secretKey = process.env.JWT_SECRET;
  const payload = {
    user: {
      id: user.id,
    },
  };
  const options = {
    expiresIn: "1h", //Adjust the expiration time as desired
  };
  return jwt.sign(payload, secretKey, options);
}
//Login route
router.post("/login", async (req, res) => {
  //perform authentication logic here
  // you can use Jwt here
  const { email, password } = req.body;

  //perform user authentication with Mongodb
  try {
    //check if user exists and password is coreect
    // example with a simple user schema using monggose
    const user = await User.findOne({ email });
    if (!user || !user.comparePassword(password)) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    //Generate and send a token if login is successful
    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ error: "server error" });
  }
});

//signUp route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    //check if a user with the given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    //Create a new user
    const newUser = new User({ email, password });
    await newUser.save();

    //Generate and send a token upon successful sign-up
    const token = generateToken(newUser);
    res.json({ token });
  } catch (error) {
    console.error("Error", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
