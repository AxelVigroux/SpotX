const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(express.static(__dirname + "build"));
app.set("views", "./views");
app.set("view engine", "ejs");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("listening port " + `${PORT}` + " all is ok");
});

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://lezardman:" +
      `${process.env.MONGO_PASSWORD}` +
      "@cluster0.8hx3j.mongodb.net/Cluster0?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// ROUTES

const userRoutes = require("./routes/userRoutes");
const spotRoutes = require("./routes/spotRoutes");

app.use("/auth/user", userRoutes);
app.use("/spot", spotRoutes);

module.exports = app;
