const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

// @route POST /api/v2/authen/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.json({ result: "NOK", message: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) =>
              res.json({ result: "OK", message: "Register Sucessful" })
            )
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST /api/v2/authen/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.json({ email: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
          password: user.password,
          email: user.email,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              userid: payload.id,
              email: payload.email,
            });
          }
        );
      } else {
        return res.json({ password: "Password incorrect" });
      }
    });
  });
});

// @route POST /api/v2/authen/changepassword
// @desc Change password by userr
// @access Public
router.post("/changepassword", (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userID = req.body.userid;
  let errors = {};
  //Check required fields
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    errors.field = "Please fill in all fields.";
  }

  //Check passwords match
  if (newPassword !== confirmNewPassword) {
    errors.password = "New passwords do not match.";
  }

  //Check password length
  if (newPassword.length < 6 || confirmNewPassword.length < 6) {
    errors.password = "Password should be at least 6 characters.";
  }

  if (Object.keys(errors).length > 0) {
    return res.json(errors);
  } else {
    User.findOne({ _id: userID }).then((user) => {
      //encrypt newly submitted password
      bcrypt.compare(currentPassword, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          //Update password for user with new password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.save();
            })
          );
          return res.json({ success: "success" });
        } else {
          //Password does not match
          errors.password = "Current password is not a match.";
          return res.json(errors);
        }
      });
    });
  }
});

// @route POST /api/v2/authen/adminchangepassword
// @desc Change password by userr
// @access Public
router.post("/adminchangepassword", (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;
  const userID = req.body.userid;
  let errors = {};
  //Check required fields
  if (!newPassword || !confirmNewPassword) {
    errors.field = "Please fill in all fields.";
  }

  //Check password length
  if (newPassword.length < 6 || confirmNewPassword.length < 6) {
    errors.password = "Password should be at least 6 characters.";
  }

   //Check passwords match
   if (newPassword !== confirmNewPassword) {
    errors.password = "New passwords do not match.";
  }

  if (Object.keys(errors).length > 0) {
    return res.json(errors);
  } else {
    User.findOne({ _id: userID }).then((user) => {
      //Update password for user with new password
      bcrypt.genSalt(10, (err, salt) =>
        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user.save();
        })
      );
      return res.json({ success: "Change Password Successful" });
    });
  }
});
module.exports = router;
