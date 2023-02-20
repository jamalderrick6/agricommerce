const express = require("express");
const Auth = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

//signup
router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//login
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

//logout
router.post("/users/logout", Auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

router.post("/update/user", async (req, res) => {
  console.log("req", req.body);

  const update = {
    name: req.body.Name,
    phone: req.body["Phone Number"],
  };
  const filter = { email: req.body.Email };
  const updatedDocument = await User.findOneAndUpdate(filter, update);

  return res.status(200).send(updatedDocument);
});

module.exports = router;
