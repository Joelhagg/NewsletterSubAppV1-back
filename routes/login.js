const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/", (req, res) => {
  let loginUser;
  User.findOne({ email: req.body.email }, (err, user) => {
    loginUser = user;
    if (loginUser === null) {
      return res.send("Det finns ingen användare");
    } else {
      try {
        bcrypt.compare(
          req.body.password,
          loginUser.password,
          (error, response) => {
            if (error) {
              console.log("Något gick fel ", error);
            }
            if (response) {
              res.json({
                id: loginUser.id,
                subOnNewsletter: loginUser.subOnNewsletter,
              });
            } else {
              res.json("Fel lösenord");
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
