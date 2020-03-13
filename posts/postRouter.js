const express = require("express");
const Posts = require("./postDb");

const router = express.Router();
router.use((req, res, next) => {
  console.log("Post Router");
  next();
});

//router.use(validatePostId);

router.get("/", (req, res) => {
  Posts.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving posts" });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Post not found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error retrieving post" });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then((post) => {
      if (post) {
        res.status(200).json({ message: "Post has been removed" });
      } else {
        res.status(404).json({ message: "Post could not be found" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error deleting post" });
    });
});

router.put("/:id", validatePostId, (req, res) => {
  const id = req.params.id;
  const edits = req.body;
  const updatedPost = { ...edits, id };
  Posts.update(id, edits)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error editing post" });
    });
});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then((post) => {
      if (post) {
        req.post = post;
        console.log("PostId validated");
        next();
      } else {
        res.status(400).json({ message: "Invalid post ID" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: "Error processing request" });
    });
}

module.exports = router;
