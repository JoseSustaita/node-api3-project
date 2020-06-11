const express = require("express");
const user = require("./userDb");
const posts = require("../posts/postDb");

const router = express.Router();

//POST

router.post("/", validateUser, (req, res) => {
  user
    .insert(req.body)
    .then((user) => {
      res.status(201).json({ success: "A New User has been created!", user });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error on the database",
        err,
      });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
  posts
    .insert({ ...req.body, user_id: req.params.id })
    .then((newPost) => {
      res.status(201).json(newPost);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "there was an issue adding posts." });
    });
});

//GET
router.get("/", (req, res) => {
  user
    .get()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ err: "No User info " });
    });
});

router.get("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  user
    .getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error on database",
        err,
      });
    });
});

router.get("/:id/posts", validateUserId, (req, res) => {
  const { id } = req.params;

  user
    .getUserPosts(id)
    .then((data) => {
      data ? res.status(200).json(data) : null;
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        err,
      });
    });
});

//DELETE
router.delete("/:id", validateUserId, (req, res) => {
  user
    .remove(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: `User With ID ${req.params.id} has been deleted`,
        });
      } else {
        res.status(404).json({ errorMessage: "No User to Delete" });
      }
    })
    .catch((error) => {
      res.status(500).json({ message: "Something went", error });
    });
});

//PUT
router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;

  user
    .update(id, req.body)

    .then((user) => {
      res.status(200).json({ success: "Info Updated!", info: req.body });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Error on database",
        err,
      });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  user.getById(id).then((user) => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ errorMessage: "invalid id" });
    }
  });
}

function validateUser(req, res, next) {
  if (!Object.keys(req.body).length) {
    res.status(400).json({ errorMessage: "missing user data" });
  } else if (!req.body.name) {
    res.status(400).json({ errorMessage: "missing required name field" });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing post data" });
  } else if (!req.body.text) {
    res.status(400).json({ message: "missing required text field" });
  } else {
    next();
  }
}

module.exports = router;
