require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDatabase = require("./config/databaseconnection");
const path = require("path");

const app = express();

//Connnect to database
connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//CORS
app.use(
  cors({
    origin: ["http://localhost:5173", "https://web.postman.co"],
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

//Route Imports
const authRoutes = require("./routes/auth-route");
const userRoutes = require("./routes/user-route");

//Test Route
app.use("/test", (req, res, next) => {
  console.log(req.url);
  return res.send(`<p>${req.method}</p>`);
});

//Auth Route
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//Error throwing middleware
app.use((err, req, res, next) => {
  const code = err.status || 500;
  return res.status(code).json({
    success: false,
    message: err.message || "Something went wrong",
    status: code,
  });
});

const PORT = process.env.PORT;

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});

mongoose.connection.on("error", () => {
  console.log(
    "Probably due to connection with the database server, Server closed"
  );
  process.exit(1);
});
