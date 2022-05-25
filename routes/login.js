const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/// Kom ihåg att ta bort //////////////////////////////////////////////////////////
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
  let loginUser;
  User.find({ email: req.body.email }, function (err, user) {
    loginUser = user;
    if (loginUser == null) {
      return res.send("Det finns ingen användare");
    } else {
      try {
        bcrypt.compare(
          req.body.password,
          loginUser[0].password,
          function (error, response) {
            if (error) {
              console.log("Något gick fel ", error);
            }
            if (response) {
              res.json({
                id: loginUser[0].id,
                subOnNewsletter: loginUser[0].subOnNewsletter,
              });
            } else {
              res.send("Fel lösenord");
            }
          }
        );
      } catch (error) {
        console.log("error ", error);
      }
    }
  });
});

module.exports = router;
