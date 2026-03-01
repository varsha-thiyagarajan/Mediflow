require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const patientRoutes = require("./routes/patientRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("MediFlow Backend Running");
});
app.use("/patients", patientRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});