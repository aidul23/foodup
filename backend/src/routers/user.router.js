const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { sample_users } = require("../data");

const router = Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = sample_users.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    res.send(generateToken(user));
    return;
  }

  res.status(400).send("username or password is invalid");
});

const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    "somerandomstring",
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
