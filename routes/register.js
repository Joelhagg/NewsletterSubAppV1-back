const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");

router.post("/", async (req, res) => {
  let registerUserEmail = "";
  await User.findOne({ email: req.body.email }).then((result) => {
    registerUserEmail = result;
    return registerUserEmail;
  });
  if (registerUserEmail) {
    console.log("användaren är redan registread");
    return res.json({ message: "Användaren är redan registrerad" });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        subOnNewsletter: req.body.subOnNewsletter,
      });
      console.log("Användaer fanns inte, lägger till i databasen...");

      try {
        const newUser = await user.save();
        res.json({ message: "Användaren är registrerad!" });
      } catch (error) {
        res.status(400).json({ message: error.message });
        console.log("error 400");
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log("error 500");
    }
  }
});

router.put("/", async (req, res) => {
  let user = { _id: req.body._id };
  let userForUpdate = req.body;
  await User.findOneAndUpdate(user, userForUpdate, {
    new: true,
  });

  res.json({ message: "användaren uppdaterades" });
});

module.exports = router;
