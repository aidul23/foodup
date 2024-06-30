const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { sample_users } = require("../data");
const handler = require("express-async-handler");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const auth = require("../middlewares/auth.mid");

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

router.post(
  "/register",
  handler(async (req, res) => {
    const { name, email, password, address } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      res.status(400).send("User already exists, please login!");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      address,
    });

    if (!result) {
      return res.status(400).send("Username or password is invalid");
    }

    res.send(generateToken(result));
  })
);

router.put(
  "/updateProfile",
  auth,
  handler(async (req, res) => {
    const { name, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, address },
      { new: true }
    );

    res.send(generateToken(user));
  })
);

router.put(
  "/changePassword",
  auth,
  handler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await UserModel.findById(req.user.id);

    if (!user) {
      res.status(BAD_REQUEST).send("Change Password Failed!");
      return;
    }

    const equal = await bcrypt.compare(currentPassword, user.password);

    if (!equal) {
      res.status(BAD_REQUEST).send("Current Password Is Not Correct!");
      return;
    }

    user.password = await bcrypt.hash(newPassword, PASSWORD_HASH_SALT_ROUNDS);
    await user.save();

    res.send();
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
