const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.get("/", async (req, res) => {
  console.log("req", req);
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", (req, res) => {
  try {
    if (req.body.email) {
      const user = User.find(email);

      req.body.password;
      //brcyty
      const userPAss = bcrupt(req.body.password);

      if (user.password == userPAss) {
      }
    }

    if (req.body.email == User.find(email)) {
    }
  } catch (error) {}

  rescape.json({
    userId: user.id,
    subOnNewsletter: user.subOnNewsletter,
  });

  res.json({ userId: User.find(id) });
});

module.exports = router;
