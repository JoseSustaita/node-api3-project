const express = require("express");
const post = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  post
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({ errorMessage: "there was an error" });
    });
});

router.get("/:id", (req, res) => {
  res.status(200).json(req.post);
});

router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
