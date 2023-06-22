const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const cors = require("cors");
const dbConnection = require("./libs/knex");
const petsRoute = require("./routes/petsRoutes");
const usersRoute = require("./routes/usersRoutes");

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://pet-adoption-client.vercel.app"],
    credentials: true,
  })
);
app.use("/pets", petsRoute);
app.use("/users", usersRoute);

app.use("*", (req, res) => {
  res.status(404).send({ message: "Oops page not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status).send(err.message);
});

dbConnection.migrate
  .latest()
  .then((migration) => {
    if (migration) {
      console.log("Connected to DB", migration);
      app.listen(PORT, () => {
        console.log(`Listening on ${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
