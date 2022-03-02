const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const Post = require("../models/Post");

//CREATE POST
router.post("/", async (req, res) => {
  const user = await User.find({ username: req.body.username });

  if (user.length === 0) {
    res.status(401).json("User not found!");
    return;
  } else {
    try {
      const newPost = new Post(req.body);
      const savedPost = await newPost.save();
      res.status(200).json(savedPost);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

});

// GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    // let posts;
    // if (username) {
    //   posts = await Post.find({ username: username });
    // } else if (catName) {
    //   posts = await Post.find({
    //     categories: {
    //       $in: [catName],
    //     },
    //   });
    // }

    let posts = username
      ? await Post.find({ username: username })
      : catName
      ? await Post.find({
          categories: {
            $in: [catName],
          },
        })
      : await Post.find();
    // else {
    //   posts = await Post.find();
    // }

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      res.status(401).json("You are not authorized to perform this action");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successful!");
      } catch (error) {
        return res.status(500).json(error);
      }
    } else {
      res.status(401).json("You are not authorized to perform this action");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
