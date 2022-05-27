require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bcrypt = require("bcrypt");

const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const adminRouter = require("./routes/admin");

const app = express();

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to database"));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "./public")));

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/admin", adminRouter);

app.listen(PORT, () => {
  console.log("Server running on port: ", PORT);
});

module.exports = app;
