const express = require("express");
const user = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  // do your magic!
});

router.post("/:id/posts", (req, res) => {
  // do your magic!
});

router.get("/", (req, res) => {
  user
    .get()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was a problem getting the users" });
    });
});

router.get("/:id", (req, res) => {
  console.log("user here ", req.user.name);
  res.status(200).json(req.user);
});

router.get("/:id/posts", (req, res) => {
  const user_id = req.params.id;
  user
    .getUserPosts(user_id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "there was an error getting the post" });
    });
});
router.delete("/:id", (req, res) => {
  // do your magic!
});

router.put("/:id", (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = router;
