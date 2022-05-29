const express = require("express");
const router = express.Router();
const User = require("../models/user");

let isAuthAdmin = false;
router.get("/", (req, res) => {
  let loginForm = `
  <div><a href="https://joelhagg.github.io/NewsletterSubAppV1-front/"><button>Tillbaka till start</button></a></div>
  <form action="admin/login" method="post">
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
  console.log("inside /isAuthAdmin");
  if (isAuthAdmin) {
    console.log("inside if");
    let logOut = `<a href="/admin" ><button>Logga ut</button></a><br /><br />`;
    let users;
    let allUsers;
    let allUsersEmail;
    try {
      users = await User.find();

      for (let i = 0; i < users.length; i++) {
        let user = `<div>
            <br />
            <br>
            <h3>Användarens namn: ${users[i].name}</h3>
            <h3>Anändarens email: ${users[i].email}</h3>
            <h3>Prenumererar på nyhetsbrevet: ${users[i].subOnNewsletter}</h3>
            <h3>Registrerad: ${users[i].registrationDate}</h3>
            <br />
            <hr>
            <br />
          </div>`;
        allUsers += user;
      }

      for (let i = 0; i < users.length; i++) {
        if (users[i].subOnNewsletter == true) {
          let user = `<div>
              <h3>${users[i].email}</h3>
            </div><br /><hr><br />`;
          allUsersEmail += user;
        }
      }

      let spacingHTML = `
        <h1>Admin</h1>
        <h2>Användares emailadresser som prenumererar på nyhetsbrevet:</h2>
      `;

      let allUserHeading = `<br /><br /><h1>Alla användare</h1>`;

      return res.send(
        spacingHTML + allUsersEmail + allUserHeading + allUsers + logOut
      );
    } catch (error) {
      res.json({
        message: "Finns ingen sparade användare eller så gick något fel: ",
      });
    }
  }
  return res.json("inloggad");
});

module.exports = router;
