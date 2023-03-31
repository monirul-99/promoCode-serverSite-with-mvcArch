const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const promoCodeRoute = require("./routes/v1/promoCode.route");
const findOut = require("./routes/v1/search.route");

const errorHandler = require("./middleware/errorHandler");
const { connectToServer } = require("./utils/dbConnect");

//middle Ware
app.use(cors());
app.use(express.json());

connectToServer((err) => {
  if (!err) {
    app.listen(5000, () => console.log("Promo Code Server Running"));
  } else {
    console.log(err);
  }
});

// routes
app.use("/api/v1/promoCode", promoCodeRoute);
app.use("/api/v1/searchCode", findOut);

app.get("/", (req, res) => {
  res.send("Active PromoCode Server");
});

app.all("*", (req, res) => {
  res.send("No Route Found");
});

app.use(errorHandler);

process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1);
  });
});
