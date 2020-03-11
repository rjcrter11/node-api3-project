const express = require("express");

const Users = require("./userDb");
const Posts = require("../posts/postDb");

const router = express.Router();
router.use((res, req, next) => {
  console.log("User Router");
  next();
});
router;

router.post("/", validateUser, (req, res) => {
  const newUser = req.body;

  Users.insert(newUser)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error adding user" });
    });
});

router.post("/:id/posts", validateUserId, validatePost, (req, res) => {
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
  const { id } = req.params;
  Users.getById(id)
    .then((user) => {
      if (user) {
        req.user = user;
        console.log("UserId validated");
        next();
      } else {
        res.status(400).json({ message: "Invalid user ID" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error processing request" });
    });
}

function validateUser(req, res, next) {
  const User = req.body;
  if (User && Object.keys(User).length > 0) {
    console.log("User validated");
    next();
  } else if (!User.name) {
    res.status(400).json({ message: "missing required field" });
  } else {
    res.status(400).json({ message: "missing user data" });
  }
}

function validatePost(req, res, next) {
  const Post = req.body;
  if (Post && Object.keys(Post).length > 0) {
    console.log("Post validated");
    next();
  } else if (!Post.text) {
    res.status(400).json({ message: "missing required field" });
  } else {
    res.status(400).json({ message: "missing post data" });
  }
}

module.exports = router;
