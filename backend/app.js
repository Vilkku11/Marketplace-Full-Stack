const express = require("express");
const cors = require("cors");

const users = require("./routes/users");
const listings = require("./routes/listings");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json());

app.use("/users", users);
app.use("/listings", listings);

app.get("/health", (req, res) => {
  res.send("OK");
});

module.exports = app;
