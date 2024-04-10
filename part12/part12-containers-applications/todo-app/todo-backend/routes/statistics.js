const express = require("express");
const { getAsync, setAsync } = require("../redis");
const router = express.Router();

router.get("/", async (req, res) => {
  let result = await getAsync("added_todos");
  if (!result) {
    result = await setAsync("added_todos", 0);
  }

  res.send({ added_todos: result });
});

module.exports = router;
