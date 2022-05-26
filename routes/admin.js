const express = require("express");
const router = express.Router();
const User = require("../models/user");

let isAuthAdmin = false;
router.get("/", (req, res) => {
  let loginForm = `<form action="admin/login" method="post">
      <h1>Hej är du Admin?</h1>
      <h2>Logga in om du är det!</h2>
      <br />
      <input name="username" type="text" />
      <br />
      <input name="password" type="text" />
      <br />
      <input name="submitButton" type="submit" />
    </form>`;

  res.send(loginForm);
});

router.post("/login", (req, res) => {
  if (req.body.username == "admin" && req.body.password == "admin") {
    isAuthAdmin = true;
    res.redirect("/admin/isAuthAdmin");
  } else {
    res.send("Fel användarnamn eller lösenord");
  }
});

router.get("/isAuthAdmin", async (req, res) => {
  if (isAuthAdmin) {
    try {
      const users = await User.find();
      return res.json(users);
    } catch (error) {
      res.json({
        message: "Finns ingen sparade användare eller så gick något fel: ",
      });
    }
    res.send("inloggad");
  }
});

module.exports = router;
