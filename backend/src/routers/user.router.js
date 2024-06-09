const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { sample_users } = require("../data");
const handler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const router = Router();

router.post(
  "/login",
  handler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send("Username or password is invalid");
    }

    const passMatch = await bcrypt.compare(password, user.password);

    if (user && passMatch) {
      res.send(generateToken(user));
      return;
    }

    res.status(400).send("username or password is invalid");
  })
);

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token,
  };
};

module.exports = router;
