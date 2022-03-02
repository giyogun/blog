const router = require("express").Router();
const Category = require("../models/Category");
const User = require("../models/User");

// NEW CATEGORY
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (error) {
    res.status(500).json(error);
  }
});

// GET CATEGORIES
router.get("/", async (req, res) => {
  const catName = req.query.cat;

  try {
    const cats = catName
      ? await Category.find({ name: catName })
      : await Category.find();

    res.status(200).json(cats);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
