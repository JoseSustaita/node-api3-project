const express = require("express");
const post = require("./postDb");

const router = express.Router();

//GET
router.get("/", (req, res) => {
  post
    .get()
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        error: "error!",
        err,
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  post
    .getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error, something went wrong!",
        err,
      });
    });
});

//DELETE

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;
  post
    .getById(id)
    .then((post) => {
      post
        ? post.remove(id).then((deleted) => {
            deleted
              ? res
                  .status(200)
                  .json({ success: `Post ${id} was deleted!`, info: post })
              : null;
          })
        : null;
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error, something went wrong!",
        err,
      });
    });
});

//PUT
router.put("/:id", validatePostId, validatePost, (req, res) => {
  const { id } = req.params;

  post
    .update(id, req.body)
    .then((post) => {
      res.status(200).json({ success: "Info Updated!", info: req.body });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error, something went wrong!!",
        err,
      });
    });
});

// custom middleware

function validatePost(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ errorMessage: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ errorMessage: "missing required text field" });
  } else {
    next();
  }
}

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  post
    .getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ errorMessage: "id not found" });
      }
    })
    .catch((err) => {
      res
        .status(400)
        .json({ errorMessage: "there was an error accessing the id" });
    });
}

module.exports = router;
