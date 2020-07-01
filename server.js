const express = require("express");
const app = express();
require("./config/connection");

const usersRouter = require("./routes/users");
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", usersRouter);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
