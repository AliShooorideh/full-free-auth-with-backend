const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const dotenv = require("dotenv");

const app = express();

//load env
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect to Mongodb
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`server runnung on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
  });

//Use the authentication routes
app.use("/api", authRoutes);

//Other routes can be added here
