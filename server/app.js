const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();
const dbConnect = require("./db/dbConnect");
const User = require("./db/userModel");

dbConnect();

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body; // Check if the email is already in use
    let userExists = await User.findOne({ email });
    if (userExists) {
      res.status(401).json({ message: "Email is already in use." });
      return;
    } // Define salt rounds
    const saltRounds = 10; // Hash password
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) throw new Error("Internal Server Error"); // Create a new user
      let user = new User({
        email,
        password: hash,
        username,
      }); // Save user to database
      user.save().then(() => {
        res.json({ message: "User created successfully", user });
      });
    });
  } catch (err) {
    return res.status(401).send(err.message);
  }
});

app.post("/login", (request, response) => {
  // check if email exists
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordCheck) => {
          if (!passwordCheck) {
            return response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }

          const token = jwt.sign(
            {
              userId: user._id,
              userEmail: user.email,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );

          //   return success response
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        });
    })
    .catch((e) => {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    });
});

app.get("/users", function (req, res) {
  User.find({}, function (err, users) {
    res.send(users);
  });
});

module.exports = app;
