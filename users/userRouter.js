const express = require("express");

const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();

router.post("/", (req, res) => {
  const newUser = req.body;

  if (!newUser.name) {
    res
      .status(400)
      .json({ errorMessage: "Please provide a name for the user" });
  } else {
    Users.insert(newUser)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: "Error adding user" });
      });
  }
});

router.post("/:id/posts", (req, res) => {
  const postInfo = { ...req.body, user_id: req.params.id };
  Posts.insert(postInfo)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error adding post for the user" });
    });
});

router.get("/", (req, res) => {
  Users.get(req.query)
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving users"
      });
    });
});

router.get("/:id", (req, res) => {
  Users.getById(req.params.id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving user" });
    });
});

router.get("/:id/posts", (req, res) => {
  const id = req.params.id;
  Users.getUserPosts(id)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving user's posts" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then((user) => {
      if (user) {
        res.status(200).json({ message: "User has been removed" });
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error removing the user" });
    });
});

router.put("/:id", (req, res) => {
  const id = req.params.id;
  const editUser = req.body;
  Users.update(id, editUser)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error updating user" });
    });
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
