const mongoose = require("mongoose");
require("dotenv").config();

const dbUrl = process.env.DB_URL || "mongodb://localhost/CRUD_DB";
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", () => {
  console.error("Error occured in db connection");
});
db.once("open", () => {
  console.log("Database connected");
});
