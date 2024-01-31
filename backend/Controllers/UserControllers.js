const User = require("../models/user");
const generateToken = require("../Config/generateToken");
const asyncHandler = require("express-async-handler");

const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Please enter all required fields" });
    return;
  }

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ error: "User already exists" });
      return;
    }

    const user = await User.create({
      name,
      email,
      password,
      pic,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        pic: user.pic,
        token: generateToken(user._id),
      });
    } else {
      res.status(500).json({ error: "User not created" });
    }
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Server error during registration" });
  }
};

const authUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      // User found, now check the password
      // Assuming that you have a 'matchPassword' method in your User model
      const isPasswordMatch = await user.matchPassword(password);

      if (isPasswordMatch) {
        // Password is correct, generate and send a token
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          pic: user.pic,
          token: generateToken(user._id),
        });
      } else {
        // Password does not match
        res.status(401).json({ error: "Invalid email or password" });
      }
    } else {
      // User not found with the given email
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    // Handle other errors
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Server error during authentication" });
  }
};

const allUser = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: 'i' } }, // Case-insensitive search for name
            { email: { $regex: req.query.search, $options: 'i' } }, 
          ],
        }
      : {};
    const users = await User.find(keyword);

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});



module.exports = { registerUser, authUser,allUser };
