const express = require("express");
const router = express.Router();
const user = require("../controller/user");
router.get("/", (req, res, next) => {
  res.send("get req");
});
router.post("/", user.create);
router.get("/user/:username", user.find);
router.put("/updatebyid", user.updateById);
router.put("/update", user.update);
router.delete("/delete", user.delete);

module.exports = router;
