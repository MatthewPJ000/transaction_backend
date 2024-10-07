const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const User = require("../models/User");
const auth = require("../middleware/auth");

// @route    POST api/auth/register
// @desc     Register user
// @access   Public
router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    // check(
    //   "password",
    //   "Please enter a password with 6 or more characters"
    // ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, account } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }

      user = new User({
        name,
        email,
        account,
        password: account,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "jwt_secret", { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    POST api/auth/login
// @desc     Authenticate user & get token
// @access   Public
router.post(
  "/login",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("account", "Account is required").exists(),
  ],
  async (req, res) => {
    console.log('get requests');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, account, balance } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        await user.deleteOne();
      }

      // if (!user) {
      //   return res.status(400).json({ msg: "Invalid Credentials" });
      // }

      user = new User({
        username:name,
        email,
        account,
        walletBalance: balance,
      });

      await user.save();

      // const isMatch = await bcrypt.compare(acount, user.acount);

      // if (!isMatch) {
      //   return res.status(400).json({ msg: "Invalid Credentials" });
      // }

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(payload, "jwt_secret", { expiresIn: "1h" }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
