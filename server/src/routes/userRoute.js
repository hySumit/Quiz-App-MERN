const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserSchema");

// register

userRouter.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "User Already Exists" });
    } else {
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error while hasing the password" });
        }

        try {
          const newUser = new UserModel({
            username,
            password: hash,
            role,
          });

          await newUser.save();
          return res
            .status(201)
            .json({ message: "User Registred Successfully" });
        } catch (error) {
          return res
            .status(400)
            .json({ message: "Error while registring the user" });
        }
      });
    }
  } catch (error) {
    return res.status(400).json({ message: "Error while finding the user" });
  }
});

// login

userRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({ message: "Wrong Credentials" });
        }

        if (result) {
          const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_TOKEN,
            { expiresIn: "1h" }
          );
          res.status(200).json({
            message: "User Logged in successfully",
            accessToken,
            id: user._id,
          });
        } else {
          res.status(401).json({ message: "Wrong Password" });
        }
      });
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error while logging in", error }); 
  }
});

module.exports = userRouter